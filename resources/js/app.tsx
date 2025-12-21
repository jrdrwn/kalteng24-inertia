import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ChevronUp } from 'lucide-react';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/custom/theme-provider';
import { Button } from './components/ui/button';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            onClick={scrollToTop}
            className={`fixed right-6 bottom-6 z-50 cursor-pointer rounded-full shadow-lg transition-opacity ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
            aria-label="Scroll to top"
            size={'icon'}
        >
            <ChevronUp />
        </Button>
    );
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <>
                        <App {...props} />
                        <ScrollToTopButton />
                    </>
                </ThemeProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: 'var(--primary)',
        includeCSS: true,
        showSpinner: true,
    },
});
