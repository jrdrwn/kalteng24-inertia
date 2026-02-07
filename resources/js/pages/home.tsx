import BreakingNews from '@/components/home/breaking-news';
import Hero from '@/components/home/hero';
import News from '@/components/home/news';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import SponsorFooter from '@/components/sponsor/footer';
import SponsorUtama from '@/components/sponsor/utama';
import { BeritaRed, BeritaVid, Config, IklOnline } from '@/types/entities';

interface PageProps {
    hero_berita: BeritaRed[];
    breaking_news: BeritaRed[];
    latest_news_single: BeritaRed[];
    latest_news: {
        data: BeritaRed[];
    };
    latest_news_video: BeritaVid[];
    perspektif: BeritaRed[];
    popular_news: BeritaRed[];

    sponsors?: {
        utama: IklOnline[];
        headline: IklOnline[];
        insidental: IklOnline[];
        footer: IklOnline[];
    };
    metadata: Config;
}

export default function Home({
    hero_berita,
    breaking_news,
    latest_news_single,
    latest_news,
    latest_news_video,
    perspektif,
    popular_news,
    sponsors,
    metadata,
}: PageProps) {
    return (
        <>
            <SponsorUtama data={sponsors?.utama || []} />
            <Header metadata={metadata} />
            <Hero hero_berita={hero_berita} />
            <BreakingNews breaking_news={breaking_news} />
            <News
                latest_news_single={latest_news_single}
                latest_news={latest_news}
                latest_news_video={latest_news_video}
                perspektif={perspektif}
                popular_news={popular_news}
                sponsors={sponsors}
            />
            <SponsorFooter data={sponsors?.footer || []} />
            <Footer popular_news={popular_news} metadata={metadata} />
        </>
    );
}
