import { ProfileData } from './types';
import defaultProfileData from '../../data/example-profile.json';

export function loadDefaultProfile(): ProfileData {
  return defaultProfileData as ProfileData;
}

export function getDefaultTheme(): string {
  return 'pixel';
}

export function saveThemeToStorage(themeId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('game-life-theme', themeId);
  }
}

export function loadThemeFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('game-life-theme');
  }
  return null;
}

export function applyTheme(themeId: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', themeId);
  }
}

export function exportProfileAsJSON(profile: ProfileData): void {
  const json = JSON.stringify(profile, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `game-life-profile-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseProfileJSON(jsonString: string): ProfileData {
  const data = JSON.parse(jsonString);
  if (!data.character?.basic || !data.attributes || !data.skills) {
    throw new Error('无效的个人资料格式：缺少必要字段 (character.basic / attributes / skills)');
  }
  return data as ProfileData;
}
