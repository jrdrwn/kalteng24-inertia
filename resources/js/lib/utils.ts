import { BeritaRed } from '@/types/entities';
import { type ClassValue, clsx } from 'clsx';
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
