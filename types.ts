export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}