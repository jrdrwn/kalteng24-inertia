import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function ScrollToTopButton() {
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
