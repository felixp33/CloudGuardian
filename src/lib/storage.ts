export const STORAGE_KEY = 'userProjects';

import { Project } from '@/types';

export function loadUserProjects(): Project[] {
        if (typeof window === 'undefined') return [];
        try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? (JSON.parse(data) as Project[]) : [];
        } catch {
                return [];
        }
}

export function saveUserProjects(projects: Project[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}
