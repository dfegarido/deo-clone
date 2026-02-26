import { NavItem, Project, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Get in Touch', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NEON HORIZONS',
    category: 'Digital Strategy',
    image: 'https://picsum.photos/id/12/1200/800',
  },
  {
    id: 2,
    title: 'URBAN PULSE',
    category: 'Content Creation',
    image: 'https://picsum.photos/id/28/1200/800',
  },
  {
    id: 3,
    title: 'AERO DYNAMICS',
    category: 'Media Buying',
    image: 'https://picsum.photos/id/34/1200/800',
  },
  {
    id: 4,
    title: 'SILENT WAVES',
    category: 'Brand Identity',
    image: 'https://picsum.photos/id/48/1200/800',
  },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'HIGH-VOLUME EMAIL DISTRIBUTION',
    description: 'Access massive reach through owned and curated partner data. Over 1 billion emails deployed monthly across high-performing verticals.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'ADVANCED SEGMENTATION & INTENT MODELING',
    description: 'We leverage behavioral data, tagging systems, and real-time signals to match the right audience with the right offer.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'CREATIVE & CAMPAIGN EXECUTION',
    description: 'Full-page creative. Dedicated deployments. Optimized journeys. Built to capture attention and convert.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'DATA MONETIZATION & RETARGETING',
    description: 'Turn dormant databases into revenue streams. We help brands re-engage, retarget, and unlock hidden value in their first-party data.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'AI-POWERED FOLLOW-UP',
    description: 'AI calling and SMS qualification that increases speed-to-lead and lowers acquisition costs.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop'
  },
];