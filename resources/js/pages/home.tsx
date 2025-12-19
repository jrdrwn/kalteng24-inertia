import BreakingNews from '@/components/home/breaking-news';
import Hero from '@/components/home/hero';
import News from '@/components/home/news';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <BreakingNews />
            <News />
            <Footer />
        </>
    );
}
