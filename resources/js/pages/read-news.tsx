import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { getRubrikOrKategori } from '@/lib/utils';
import { BeritaRed, BeritaVid } from '@/types/entities';
import { InfiniteScroll } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Eye, LucideTriangle, Timer, User, UserCircle } from 'lucide-react';
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaLinkedin,
    FaTwitterSquare,
    FaYoutubeSquare,
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
}

export default function ReadNews({
    news,
    popular_news,
    trending_news,
    latest_news_video,
    latest_news,
}: PageProps) {
    return (
        <>
            <Header />
            <section className="p-4">
                <div className="container mx-auto">
                    <Carousel
                        opts={{
                            align: 'end',
                            loop: true,
                        }}
                        className="flex gap-4"
                    >
                        <div className="flex items-center justify-between gap-4 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
                            <p className="whitespace-nowrap">Trending Topics</p>
                            <CarouselContent>
                                {trending_news.map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="line-clamp-1 text-end"
                                    >
                                        {item.judul}
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
            <section className="p-4">
                <div className="container mx-auto grid grid-cols-6 gap-4">
                    <div className="col-span-1">iklan</div>
                    <div className="col-span-3 prose gap-2 prose-h1:mb-0">
                        <div className="not-prose mb-4 aspect-video w-full rounded-2xl bg-muted">
                            <img
                                src={`/foto_berita/${news.foto_berita}`}
                                alt={news.judul}
                                className="h-full w-full rounded-2xl object-cover"
                            />
                            <p className="py-1 text-center text-xs text-muted-foreground italic">
                                {news.text_foto}
                            </p>
                        </div>
                        <Card className="mb-4 gap-0 p-4">
                            <div className="not-prose flex items-center gap-2 text-sm text-muted-foreground">
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
                            <h1 className="mt-4 mb-2">{news.judul}</h1>
                            <div>{parse(news.isi_berita)}</div>
                        </Card>
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
                                                    <div className="relative flex h-28 flex-col justify-end rounded-lg bg-primary/35 p-2">
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
                                                        <p className="z-1 line-clamp-2 text-xs font-medium tracking-wide text-white">
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
                                className="grid grid-cols-2 gap-8 pt-4"
                                onlyNext
                            >
                                {latest_news.data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative flex flex-col gap-4 rounded-xl"
                                    >
                                        <div className="relative h-60 w-full rounded-xl bg-primary/40">
                                            <img
                                                src={`/foto_berita/${item.foto_berita}`}
                                                alt={item.judul}
                                                className="h-full w-full rounded-xl object-cover"
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
                                            <h1 className="line-clamp-2 text-xl leading-relaxed font-semibold tracking-wide">
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
                                    </div>
                                ))}
                            </InfiniteScroll>
                        </Card>
                    </div>
                    <div className="sticky top-4 col-span-2 space-y-4 self-start">
                        <div className="flex justify-between rounded-md bg-muted px-2 py-2">
                            <p className="font-bold">Share</p>
                            <div className="flex gap-2">
                                <FaFacebookSquare className="size-6 text-blue-600" />
                                <FaInstagramSquare className="size-6 text-pink-600" />
                                <FaTwitterSquare className="size-6 text-blue-400" />
                                <FaYoutubeSquare className="size-6 text-red-600" />
                                <FaLinkedin className="size-6 text-blue-700" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col gap-2">
                                {popular_news.map((item, index) => (
                                    <div key={index} className="p-2">
                                        <div className="flex gap-2">
                                            <div className="aspect-square w-20 rounded-md bg-primary/40">
                                                <img
                                                    src={`/foto_berita/${item.foto_berita}`}
                                                    alt={item.judul}
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center gap-0.5">
                                                <Badge className="uppercase">
                                                    {getRubrikOrKategori(
                                                        item,
                                                        true,
                                                    )}
                                                </Badge>
                                                <p className="line-clamp-1 font-medium">
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
                                    </div>
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
                                    'Lifestyle',
                                ].map((tag) => (
                                    <Badge
                                        key={tag}
                                        className="cursor-pointer px-3 py-1"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
