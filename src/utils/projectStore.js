import { defaultProjects } from '../data/projectsData';

const STORAGE_KEY = 'kravan_projects_v1';

export function getProjects() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProjects;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function resetProjects() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getProjectById(id) {
  return getProjects().find((project) => String(project.id) === String(id));
}

export function cleanYoutubeId(value = '') {
  if (!value) return '';
  if (!value.includes('http')) return value.split('?')[0].trim();

  try {
    const url = new URL(value);
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '').trim();
    return url.searchParams.get('v') || '';
  } catch {
    return value;
  }
}
