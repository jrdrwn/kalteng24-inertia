import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import SponsorBerita, { Posisi } from '@/components/sponsor/berita';
import SponsorFooter from '@/components/sponsor/footer';
import SponsorUtama from '@/components/sponsor/utama';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useStickyScroll } from '@/hooks/use-sticky-scroll';
import { createSlug, getRubrikOrKategori } from '@/lib/utils';
import { SharedData } from '@/types';
import { BeritaRed, BeritaVid, Config, IklOnline } from '@/types/entities';
import { InfiniteScroll, Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import parse from 'html-react-parser';
import {
    Accessibility,
    Eye,
    LucideTriangle,
    Timer,
    User,
    UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
    FaFacebookSquare,
    FaLinkedin,
    FaTelegram,
    FaTwitterSquare,
    FaWhatsapp,
} from 'react-icons/fa';
import ReactPlayer from 'react-player';

interface PageProps {
    news: BeritaRed;
    popular_news: BeritaRed[];
    trending_news: BeritaRed[];
    latest_news_video: BeritaVid[];
    latest_news: {
        data: BeritaRed[];
    };
    sponsors?: {
        utama: IklOnline[];
        berita_kiri: IklOnline[];
        berita_kanan: IklOnline[];
        berita_bawah: IklOnline[];
        footer: IklOnline[];
    };
    metadata: Config;
}

export default function ReadNews({
    news,
    popular_news,
    trending_news,
    latest_news_video,
    latest_news,
    sponsors,
    metadata,
}: PageProps) {
    const { imageUrl } = usePage<SharedData>().props;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = news?.judul || '';
    const stickyRef = useStickyScroll();
    console.log(news);

    // Accessibility states

    const [fontSize, setFontSize] = useState(1); // em unit

    function handleFontSize(change: number) {
        setFontSize((prev) => Math.max(0.8, Math.min(2, prev + change)));
    }

    function handleShare(platform: string) {
        const url = encodeURIComponent(shareUrl);
        const text = encodeURIComponent(shareText);
        let shareLink = '';
        switch (platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'telegram':
                shareLink = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            default:
                shareLink = url;
        }
        window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
    return (
        <>
            <SponsorUtama data={sponsors?.utama || []} />
            <Header metadata={metadata} />
            {/* Accessibility Toolbar: Font Size Only, Popover */}
            <div className="fixed right-6 bottom-16 z-50 flex flex-col items-end gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            aria-label="Tampilkan pengaturan font"
                            variant="outline"
                            size="icon"
                            className="mb-1 rounded-full"
                        >
                            <span className="font-bold">
                                <Accessibility />
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="end"
                        className="flex w-36 flex-col gap-2 p-3"
                    >
                        <span className="mb-1 text-xs text-muted-foreground">
                            Ukuran Font
                        </span>
                        <Button
                            aria-label="Perbesar font"
                            variant="outline"
                            className="font-bold"
                            onClick={() => handleFontSize(0.1)}
                        >
                            A+
                        </Button>
                        <Button
                            aria-label="Perkecil font"
                            variant="outline"
                            className="font-bold"
                            onClick={() => handleFontSize(-0.1)}
                        >
                            A-
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
            <section className="px-2 pt-4 pb-2 md:px-4">
                <div className="container mx-auto">
                    <Carousel
                        opts={{
                            align: 'end',
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: false,
                                jump: false,
                            }),
                        ]}
                        className="flex gap-4"
                    >
                        <div className="flex w-full justify-between gap-4 overflow-hidden rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
                            <p className="hidden whitespace-nowrap md:inline-block">
                                Trending
                            </p>
                            <CarouselContent className=" ">
                                {trending_news.map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="line-clamp-1 text-end"
                                    >
                                        <Link
                                            href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                            className="hover:underline"
                                        >
                                            {item.judul}
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                        <div className="relative flex gap-2">
                            <CarouselPrevious className="static top-auto size-10 -translate-0 bg-primary text-primary-foreground" />
                            <CarouselNext className="static top-auto size-10 -translate-0 bg-primary text-primary-foreground" />
                        </div>
                    </Carousel>
                </div>
            </section>
            <section className="px-2 py-4 md:px-4">
                <div className="container mx-auto grid grid-cols-6 gap-4">
                    <div className="sticky top-4 col-span-1 hidden self-start xl:block">
                        <SponsorBerita
                            data={sponsors?.berita_kiri || []}
                            posisi={Posisi.KIRI_BERITA}
                        />
                    </div>
                    <div
                        className={`col-span-6 mx-auto prose prose-sm w-full gap-2 md:col-span-4 lg:prose-base xl:col-span-3 dark:prose-invert prose-h1:mt-4 prose-h1:mb-0 prose-h1:text-center prose-h1:text-2xl prose-h1:leading-relaxed sm:prose-h1:text-left lg:prose-h1:text-3xl prose-p:text-justify`}
                    >
                        <div className="not-prose mb-4 aspect-video w-full rounded-2xl bg-muted">
                            <img
                                src={`${imageUrl}/${news.foto_berita}`}
                                alt={news.judul}
                                className="h-full w-full rounded-2xl object-cover"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        '/no-image.png';
                                }}
                            />
                            <p className="py-1 text-center text-xs text-muted-foreground italic">
                                {news.text_foto}
                            </p>
                        </div>

                        <Card className="mb-4 gap-0 p-4">
                            <div className="not-prose flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                                <span>
                                    <User className="mr-2 inline-block size-4" />
                                    {news.user}
                                </span>
                                <span>
                                    <Eye className="mr-2 inline-block size-4" />
                                    {news.hits} Views
                                </span>
                                <span>
                                    <Timer className="mr-2 inline-block size-4" />
                                    {new Date(news.tgl).toLocaleDateString(
                                        'id-ID',
                                        {
                                            dateStyle: 'full',
                                        },
                                    )}
                                    <span> jam </span>
                                    {new Date(news.jam).toLocaleTimeString(
                                        'id-ID',
                                        {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZoneName: 'short',
                                        },
                                    )}
                                </span>
                            </div>
                            {news.sub_up && (
                                <p className="!mb-0 text-muted-foreground">
                                    {news.sub_up}
                                </p>
                            )}
                            <h1 className="mt-4 mb-2">{news.judul}</h1>
                            {news.sub_judul && (
                                <p className="!mb-0 text-muted-foreground">
                                    {news.sub_judul}
                                </p>
                            )}
                            <div style={{ fontSize: fontSize + 'em' }}>
                                {parse(news.isi_berita)}
                            </div>
                        </Card>
                        <div></div>
                        <SponsorBerita
                            data={sponsors?.berita_kanan || []}
                            posisi={Posisi.DIBAWAH_BERITA}
                        />
                        <div className="not-prose mb-8 block md:hidden">
                            <div className="flex items-center justify-between rounded-md bg-muted px-2 py-2">
                                <p className="font-bold">Share</p>
                                <div className="flex gap-2">
                                    <FaFacebookSquare
                                        onClick={() => handleShare('facebook')}
                                        className="size-6 text-blue-600"
                                    />
                                    <FaWhatsapp
                                        onClick={() => handleShare('whatsapp')}
                                        className="size-6 text-green-500"
                                    />
                                    <FaTwitterSquare
                                        onClick={() => handleShare('twitter')}
                                        className="size-6 text-blue-400"
                                    />
                                    <FaTelegram
                                        onClick={() => handleShare('telegram')}
                                        className="size-6 text-blue-500"
                                    />
                                    <FaLinkedin
                                        onClick={() => handleShare('linkedin')}
                                        className="size-6 text-blue-700"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-col gap-2">
                                    {popular_news.map((item, index) => (
                                        <Link
                                            as={'div'}
                                            href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                            key={index}
                                            className="group cursor-pointer p-2"
                                        >
                                            <div className="flex gap-2">
                                                <div className="aspect-square w-20 rounded-md bg-primary/40">
                                                    <img
                                                        src={`${imageUrl}/${item.foto_berita}`}
                                                        alt={item.judul}
                                                        className="h-full w-full rounded-md object-cover"
                                                        onError={(e) => {
                                                            (
                                                                e.currentTarget as HTMLImageElement
                                                            ).src =
                                                                '/no-image.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col justify-center gap-0.5">
                                                    <Badge className="uppercase">
                                                        {getRubrikOrKategori(
                                                            item,
                                                            true,
                                                        )}
                                                    </Badge>
                                                    <p className="line-clamp-1 font-medium group-hover:underline group-active:underline">
                                                        {item.judul}
                                                    </p>
                                                    <span className="text-sm">
                                                        {new Date(
                                                            news.tgl,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'full',
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="relative pb-1">
                                    <h1 className="font-semibold">Tags</h1>
                                    <div className="absolute -bottom-[3px] left-0 h-1 w-16 rounded-full bg-primary"></div>
                                </div>
                                <Separator className="mb-4" />
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Kalteng',
                                        'Palangka Raya',
                                        'Berita',
                                        'Nasional',
                                        'Olahraga',
                                        'Teknologi',
                                        'Health',
                                    ].map((tag, index) => (
                                        <Link
                                            href={'/search?q=' + tag}
                                            key={index}
                                        >
                                            <Badge
                                                key={tag}
                                                className="cursor-pointer px-3 py-1"
                                            >
                                                {tag}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <SponsorBerita
                                data={sponsors?.berita_kanan || []}
                                posisi={Posisi.KANAN_BERITA}
                            />
                        </div>
                        <Card className="not-prose p-4">
                            <Carousel
                                opts={{
                                    loop: true,
                                }}
                            >
                                <div className="flex flex-row items-center justify-between gap-4">
                                    <h1 className="font-semibold">
                                        Featured News
                                    </h1>
                                    <Separator
                                        orientation="horizontal"
                                        className="flex-1 rounded-full bg-primary p-[2px]"
                                    />
                                    <div className="relative flex gap-2">
                                        <CarouselPrevious className="static top-auto -translate-0 bg-primary text-primary-foreground" />
                                        <CarouselNext className="static top-auto -translate-0 bg-primary text-primary-foreground" />
                                    </div>
                                </div>
                                <CarouselContent className="pt-4">
                                    {latest_news_video.map((item, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-1/3"
                                        >
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="group relative flex h-28 cursor-pointer flex-col justify-end rounded-lg bg-primary/35 p-2">
                                                        <div className="absolute inset-0 z-1"></div>
                                                        <ReactPlayer
                                                            src={
                                                                'https://www.youtube.com/watch?v=' +
                                                                item.link
                                                            }
                                                            width="100%"
                                                            height="100%"
                                                            className="absolute inset-0 z-0 rounded-lg"
                                                            light={true}
                                                            playIcon={<></>}
                                                        />

                                                        <div className="absolute inset-x-0 top-1/2 z-1 mx-auto mb-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-secondary p-2">
                                                            <LucideTriangle className="inline-block size-5 rotate-90 text-primary" />
                                                        </div>
                                                        <p className="z-1 line-clamp-2 text-xs font-medium tracking-wide text-white group-hover:underline group-active:underline">
                                                            {item.judul_vid}
                                                        </p>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            {item.judul_vid}
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <Badge
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className="mr-2"
                                                            >
                                                                {item.kategori}
                                                            </Badge>
                                                            Video oleh{' '}
                                                            {item.admin}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="overflow-hidden rounded-2xl">
                                                        <ReactPlayer
                                                            src={
                                                                'https://www.youtube.com/watch?v=' +
                                                                item.link
                                                            }
                                                            width="100%"
                                                            height="100%"
                                                            playing={true}
                                                            controls={true}
                                                            style={{
                                                                aspectRatio:
                                                                    '16/9',
                                                            }}
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                            <InfiniteScroll
                                data={'latest_news'}
                                loading={<Spinner className="mx-auto" />}
                                className="grid grid-cols-2 gap-8 pt-4 [&+div]:mx-auto"
                                onlyNext
                                manual
                                previous={({ loading, fetch, hasMore }) =>
                                    hasMore && (
                                        <Button
                                            onClick={fetch}
                                            disabled={loading}
                                            className="mx-auto"
                                        >
                                            {loading ? (
                                                <Spinner />
                                            ) : (
                                                'Load previous'
                                            )}
                                        </Button>
                                    )
                                }
                                next={({ loading, fetch, hasMore }) =>
                                    hasMore && (
                                        <Button
                                            onClick={fetch}
                                            disabled={loading}
                                            className="mx-auto"
                                        >
                                            {loading ? (
                                                <Spinner />
                                            ) : (
                                                'Load more'
                                            )}
                                        </Button>
                                    )
                                }
                            >
                                {latest_news.data.map((item, index) => (
                                    <Link
                                        as={'div'}
                                        href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                        key={index}
                                        className="group relative col-span-2 flex cursor-pointer flex-col gap-4 rounded-xl md:col-span-1"
                                    >
                                        <div className="relative h-40 w-full rounded-xl bg-primary/40 lg:h-60">
                                            <img
                                                src={`${imageUrl}/${item.foto_berita}`}
                                                alt={item.judul}
                                                className="h-full w-full rounded-xl object-cover"
                                                onError={(e) => {
                                                    (
                                                        e.currentTarget as HTMLImageElement
                                                    ).src = '/no-image.png';
                                                }}
                                            />
                                            <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                                <Eye className="inline-block size-4 text-white" />
                                                <span className="text-xs text-white">
                                                    {item.hits}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className="absolute top-2 left-2 uppercase">
                                            {getRubrikOrKategori(item, true)}
                                        </Badge>
                                        <div className="overflow-hidden rounded-xl p-2">
                                            <h1 className="line-clamp-2 text-lg leading-relaxed font-semibold tracking-wide group-hover:underline group-active:underline md:text-xl">
                                                {item.judul}
                                            </h1>
                                            <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                                <UserCircle className="inline-block size-4" />
                                                <span>{item.user}</span>
                                                <span className="size-1.5 rounded-full bg-primary"></span>
                                                <span>
                                                    {new Date(
                                                        item.tgl,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            dateStyle: 'medium',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                            <div className="line-clamp-3 leading-relaxed tracking-wide text-muted-foreground">
                                                {parse(item.isi_berita)}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </InfiniteScroll>
                        </Card>
                    </div>
                    <div
                        ref={stickyRef}
                        className="no-scrollbar sticky top-4 col-span-6 hidden max-h-screen space-y-4 self-start overflow-y-auto md:col-span-2 md:block"
                    >
                        <div className="flex justify-between rounded-md bg-muted px-2 py-2">
                            <p className="font-bold">Share</p>
                            <div className="flex gap-2">
                                <FaFacebookSquare
                                    onClick={() => handleShare('facebook')}
                                    className="size-6 text-blue-600"
                                />
                                <FaWhatsapp
                                    onClick={() => handleShare('whatsapp')}
                                    className="size-6 text-green-500"
                                />
                                <FaTwitterSquare
                                    onClick={() => handleShare('twitter')}
                                    className="size-6 text-blue-400"
                                />
                                <FaTelegram
                                    onClick={() => handleShare('telegram')}
                                    className="size-6 text-blue-500"
                                />
                                <FaLinkedin
                                    onClick={() => handleShare('linkedin')}
                                    className="size-6 text-blue-700"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col gap-2">
                                {popular_news.map((item, index) => (
                                    <Link
                                        as={'div'}
                                        href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                        key={index}
                                        className="group cursor-pointer p-2"
                                    >
                                        <div className="flex gap-2">
                                            <div className="hidden aspect-square w-20 rounded-md bg-primary/40 lg:block">
                                                <img
                                                    src={`${imageUrl}/${item.foto_berita}`}
                                                    alt={item.judul}
                                                    className="h-full w-full rounded-md object-cover"
                                                    onError={(e) => {
                                                        (
                                                            e.currentTarget as HTMLImageElement
                                                        ).src = '/no-image.png';
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center gap-0.5">
                                                <Badge className="uppercase">
                                                    {getRubrikOrKategori(
                                                        item,
                                                        true,
                                                    )}
                                                </Badge>
                                                <p className="line-clamp-1 font-medium group-hover:underline group-active:underline">
                                                    {item.judul}
                                                </p>
                                                <span className="text-sm">
                                                    {new Date(
                                                        news.tgl,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            dateStyle: 'full',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="relative pb-1">
                                <h1 className="font-semibold">Tags</h1>
                                <div className="absolute -bottom-[3px] left-0 h-1 w-16 rounded-full bg-primary"></div>
                            </div>
                            <Separator className="mb-4" />
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Kalteng',
                                    'Palangka Raya',
                                    'Berita',
                                    'Nasional',
                                    'Olahraga',
                                    'Teknologi',
                                    'Health',
                                ].map((tag, index) => (
                                    <Link href={'/search?q=' + tag} key={index}>
                                        <Badge
                                            key={tag}
                                            className="cursor-pointer px-3 py-1"
                                        >
                                            {tag}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <SponsorBerita
                            data={sponsors?.berita_kanan || []}
                            posisi={Posisi.KANAN_BERITA}
                        />
                    </div>
                </div>
            </section>
            <SponsorFooter data={sponsors?.footer || []} />
            <Footer popular_news={popular_news} metadata={metadata} />
        </>
    );
}
