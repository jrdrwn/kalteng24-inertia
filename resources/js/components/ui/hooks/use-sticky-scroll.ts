import { useEffect, useRef } from 'react';

/**
 * Hook untuk membuat elemen sticky yang ikut scroll otomatis
 * saat halaman discroll, sehingga semua konten dalam elemen sticky terlihat.
 *
 * @returns ref yang harus di-attach ke elemen sticky
 *
 * @example
 * ```tsx
 * const stickyRef = useStickyScroll();
 *
 * return (
 *   <div ref={stickyRef} className="sticky top-0 max-h-screen overflow-y-auto">
 *     {content}
 *   </div>
 * );
 * ```
 */
export function useStickyScroll<T extends HTMLElement = HTMLDivElement>() {
    const stickyRef = useRef<T>(null);

    useEffect(() => {
        function handleScroll() {
            const sticky = stickyRef.current;
            if (!sticky) return;

            const rect = sticky.getBoundingClientRect();
            const isSticky = rect.top <= 0;

            if (isSticky) {
                const maxScroll = sticky.scrollHeight - sticky.clientHeight;
                const scrollProgress =
                    Math.abs(rect.top) /
                    (sticky.scrollHeight - window.innerHeight);
                sticky.scrollTop = Math.min(
                    scrollProgress * maxScroll,
                    maxScroll,
                );
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return stickyRef;
}
