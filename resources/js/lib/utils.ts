import { BeritaRed } from '@/types/entities';
import { type ClassValue, clsx } from 'clsx';
import parse from 'html-react-parser';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRubrikOrKategori(
    data: BeritaRed,
    replaceUnderscore = false,
): string | null {
    let result: string | null = 'UNKNOWN';
    if (data.kategori) {
        result = data.kategori;
    } else if (data.jenis_rubrik) {
        result = data.jenis_rubrik;
    }
    if (result && replaceUnderscore) {
        return result.replace(/_/g, ' ');
    }
    return result;
}

export function createSlug(id: string | number, title: string): string {
    return `${id}_${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`;
}

export function parseHtmlToReact(html: string) {
    const matches = html.match(/<p[\s\S]*?<\/p>/i);
    if (matches && matches[0]) {
        return parse(matches[0]);
    }
    return null;
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
