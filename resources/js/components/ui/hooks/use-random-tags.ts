import { useEffect, useState } from 'react';

/**
 * Hook untuk mengambil random tags dari API
 *
 * @param url - URL endpoint API (default: '/api/tags/random-tags')
 * @returns Array of tags
 *
 * @example
 * ```tsx
 * const tags = useRandomTags();
 *
 * return (
 *   <div>
 *     {tags.map((tag) => (
 *       <Badge key={tag}>{tag}</Badge>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useRandomTags(url: string = '/api/tags/random-tags') {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setTags(data);
            })
            .catch((error) => {
                console.error('Error fetching random tags:', error);
            });
    }, [url]);

    return tags;
}
