import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  IdCard,
  Network,
  Mail,
  Phone,
  Droplet,
  HeartPulse,
  Linkedin,
  MapPin,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import {
  fetchEmployee,
  fallback,
  stripCountryCode,
  ProfileError,
} from '../services/employeeApi';
import type { EmployeeUser } from '../types/employee';
import './EmployeeProfile.css';

interface EmployeeProfileProps {
  /** The employee_id to load (e.g. "EV_037"). If omitted, read from ?id=. */
  employeeId?: string;
  onBack?: () => void;
}

/**
 * Employee profile deck — direct React port of the original /emp/info.php
 * "Corporate Showdeck" layout. The visual structure, CSS tokens and
 * geometric header pattern are preserved 1:1; only the data source
 * switched from inline PHP to a JSON fetch from the same PHP endpoint.
 */
export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employeeId, onBack }) => {
  const [targetId, setTargetId] = useState<string>(() => {
    if (employeeId) return employeeId;
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('id')?.trim() ?? '';
  });
  const [user, setUser] = useState<EmployeeUser | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (employeeId) setTargetId(employeeId);
  }, [employeeId]);

  useEffect(() => {
    if (!targetId) {
      setStatus('error');
      setErrorMsg('No valid Employee Identifier specified in request parameters.');
      return;
    }

    const ctrl = new AbortController();
    setStatus('loading');
    setUser(null);
    setErrorMsg('');

    fetchEmployee(targetId, ctrl.signal)
      .then((u) => {
        setUser(u);
        setStatus('idle');
      })
      .catch((e: unknown) => {
        if ((e as Error).name === 'AbortError') return;
        const msg =
          e instanceof ProfileError
            ? e.message
            : 'Profile Engine Error: Connection down.';
        setErrorMsg(msg);
        setStatus('error');
      });

    return () => ctrl.abort();
  }, [targetId]);

  // Derive all display values up-front so JSX stays declarative.
  const view = useMemo(() => {
    if (!user) return null;
    const first = fallback(user.first_name);
    const last = fallback(user.last_name);
    const fullName = `${first} ${last}`.trim() || '—';
    const empId = fallback(user.employee_id);
    const designation = fallback(user.designation);
    const blood = fallback(user.blood_group);
    const email = fallback(user.email);
    const team = fallback(user.team_id ?? 'Core Operations');
    const address = fallback(user.address);
    const linkedin = fallback(user.linkedin);
    const contact = stripCountryCode(user.contact) || '—';
    const emergency = stripCountryCode(user.emergency_contact) || '—';
    const initials = (first[0] ?? '') + (last[0] ?? '');
    const initialsDisplay = initials.toUpperCase() || '??';
    return {
      fullName,
      empId,
      designation,
      blood,
      email,
      team,
      address,
      linkedin,
      contact,
      emergency,
      initialsDisplay,
      photoUrl: user.photo_url ?? `/profileImg/${empId}.jpg`,
    };
  }, [user]);

  if (status === 'loading') {
    return (
      <section className="emp-deck-page">
        <div className="emp-deck-empty">
          <div className="emp-deck-spinner" />
          <p>Loading profile…</p>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    const isMissingId = !targetId;
    return (
      <section className="emp-deck-page">
        <div className="emp-deck-empty">
          <AlertTriangle size={36} color="#dc2626" />
          <h3>{isMissingId ? 'Operational Error' : 'Access Error'}</h3>
          <p>{errorMsg}</p>
          {onBack && (
            <button className="emp-deck-back" onClick={onBack} type="button">
              <ArrowLeft size={16} /> Go back
            </button>
          )}
        </div>
      </section>
    );
  }

  if (!view) return null;

  return (
    <section className="emp-deck-page">
      {onBack && (
        <button className="emp-deck-floating-back" onClick={onBack} type="button">
          <ArrowLeft size={16} /> Back
        </button>
      )}

      <motion.div
        className="showcase-deck"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* ─── HEADER GRAPHICS ─────────────────────────────────────── */}
        <div className="deck-header-graphics">
          <div className="pattern-center-stripe" />
          <div className="pattern-wing-left-outer" />
          <div className="pattern-wing-left-inner" />
          <div className="pattern-wing-left-gold-trim" />
          <div className="pattern-wing-right-outer" />
          <div className="pattern-wing-right-inner" />
          <div className="pattern-wing-right-gold-trim" />

          <div className="brand-shield-deck">
            <div className="logo-spherical-icon">e</div>
            <div className="logo-brand-headline">
              <span className="token-evo">evo</span>
              <span className="token-lutra">lutra</span>
            </div>
          </div>
        </div>

        {/* ─── AVATAR (overlaps header) ────────────────────────────── */}
        <div className="profile-avatar-anchor">
          <div className="portrait-circle-ring">
            <ProfileImage
              src={view.photoUrl}
              alt={view.fullName}
              fallback={<div className="portrait-initials-asset">{view.initialsDisplay}</div>}
            />
          </div>
        </div>

        {/* ─── BODY ────────────────────────────────────────────────── */}
        <div className="deck-body">
          <h1 className="user-full-name">{view.fullName}</h1>

          <div className="pill-title-container">
            <div className="pill-title-text">{view.designation}</div>
          </div>

          <div className="section-headline">Corporate Identity</div>
          <div className="details-grid">
            <Cell icon={<IdCard size={16} />} label="Employee ID">
              <span className="value-empid">{view.empId}</span>
            </Cell>
            <Cell icon={<Network size={16} />} label="Department Team">
              {view.team}
            </Cell>
            <Cell
              icon={<Mail size={16} />}
              label="Email Address"
              href={view.email === '—' ? undefined : `mailto:${view.email}`}
              title={view.email}
            >
              {view.email}
            </Cell>
            <Cell
              icon={<Phone size={16} />}
              label="Contact Phone"
              href={view.contact === '—' ? undefined : `tel:${view.contact}`}
            >
              +91 {view.contact}
            </Cell>
          </div>

          <div className="section-headline">Logistics &amp; Safety Dynamics</div>
          <div className="details-grid">
            <Cell
              icon={<Droplet size={16} color="#dc2626" />}
              label="Blood Group"
              iconStyle={{ color: '#dc2626' }}
            >
              <span className="value-blood">{view.blood}</span>
            </Cell>
            <Cell
              icon={<HeartPulse size={16} color="#f43f5e" />}
              label="Emergency Line"
              href={view.emergency === '—' ? undefined : `tel:${view.emergency}`}
              valueStyle={{ fontWeight: 600 }}
            >
              +91 {view.emergency}
            </Cell>
            <Cell
              icon={<Linkedin size={16} color="#0284c7" />}
              label="LinkedIn Connect"
              iconStyle={{ color: '#0284c7' }}
            >
              {view.linkedin === '—' ? (
                <span className="cell-value">—</span>
              ) : (
                <a
                  href={view.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="cell-value"
                  style={{ color: '#0284c7', fontWeight: 600 }}
                >
                  View Profile Link
                </a>
              )}
            </Cell>
            <Cell
              icon={<MapPin size={16} />}
              label="Registered Node Address"
              title={view.address}
            >
              {view.address}
            </Cell>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ─── helpers ──────────────────────────────────────────────────────── */

interface CellProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
  title?: string;
  iconStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}

const Cell: React.FC<CellProps> = ({ icon, label, children, href, title, iconStyle, valueStyle }) => {
  const valueClass = 'cell-value';
  const valueEl = href ? (
    <a
      href={href}
      className={valueClass}
      title={title}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      style={valueStyle}
    >
      {children}
    </a>
  ) : (
    <div className={valueClass} title={title} style={valueStyle}>
      {children}
    </div>
  );

  return (
    <div className="info-cell">
      <div className="icon-box" style={iconStyle}>
        {icon}
      </div>
      <div className="cell-content">
        <div className="cell-label">{label}</div>
        {valueEl}
      </div>
    </div>
  );
};

interface ProfileImageProps {
  src: string;
  alt: string;
  fallback: React.ReactNode;
}

/** Image that swaps to a fallback node if the URL 404s. */
const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, fallback }) => {
  const [errored, setErrored] = useState(false);
  if (errored) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className="portrait-image-asset"
      onError={() => setErrored(true)}
    />
  );
};

export default EmployeeProfile;
