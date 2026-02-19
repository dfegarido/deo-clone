import { NavItem, Project, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
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
    title: 'PAID MEDIA',
    description: 'We scale brands through data-driven paid social and search campaigns that deliver high ROAS.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'EMAIL & SMS',
    description: 'Retention marketing strategies that turn one-time buyers into loyal lifetime customers.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'CREATIVE STUDIO',
    description: 'High-converting video and static assets designed to stop the scroll and drive action.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'WEB DEVELOPMENT',
    description: 'Blazing fast, SEO-optimized e-commerce experiences built for conversion.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop'
  },
];