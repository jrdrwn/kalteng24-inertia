import { createSlug, getRubrikOrKategori } from '@/lib/utils';
import { SharedData } from '@/types';
import { BeritaRed, BeritaVid, IklOnline } from '@/types/entities';
import { InfiniteScroll, Link, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Eye, LucideTriangle, UserCircle } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Spinner } from '../ui/spinner';

interface ComponentProps {
    latest_news_single: BeritaRed[];
    latest_news: {
        data: BeritaRed[];
    };
    latest_news_video: BeritaVid[];
    perspektif: BeritaRed[];
    popular_news: BeritaRed[];
    sponsors?: {
        utama: IklOnline[];
    };
}

export default function News({
    latest_news_single,
    latest_news,
    latest_news_video,
    perspektif,
    popular_news,
    sponsors,
}: ComponentProps) {
    const { imageUrl } = usePage<SharedData>().props;
    return (
        <section className="px-2 py-2 md:px-4">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                <div className="order-2 col-span-3 lg:order-1 lg:col-span-2">
                    <div className="w-max pb-4">
                        <h1 className="text-xl font-semibold">Latest News</h1>
                        <div className="flex gap-1">
                            <span className="h-[3px] w-1/2 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/6 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/12 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <Card className="p-4">
                        <Link
                            as={'div'}
                            href={`/read-news/${createSlug(latest_news_single[0].id_ber, latest_news_single[0].judul)}`}
                            className="group relative flex cursor-pointer flex-col gap-4 rounded-xl bg-muted lg:h-70 lg:flex-row xl:h-80"
                        >
                            <div className="relative h-32 w-full rounded-xl bg-primary/40 lg:h-auto lg:w-2/3 lg:rounded-l-xl lg:rounded-r-none">
                                <img
                                    src={`${imageUrl}/${latest_news_single[0].foto_berita}`}
                                    alt={latest_news_single[0].judul}
                                    className="absolute inset-0 h-full w-full rounded-xl object-cover object-center brightness-75 lg:rounded-l-xl lg:rounded-r-none"
                                    onError={(e) => {
                                        (
                                            e.currentTarget as HTMLImageElement
                                        ).src = '/no-image.png';
                                    }}
                                />
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                    <Eye className="inline-block size-4 text-white" />
                                    <span className="text-xs text-white">
                                        {latest_news_single[0].hits || 0}
                                    </span>
                                </div>
                            </div>
                            <Badge className="absolute top-2 left-2 uppercase">
                                {getRubrikOrKategori(
                                    latest_news_single[0],
                                    true,
                                )}
                            </Badge>
                            <div className="overflow-hidden rounded-xl p-2 lg:w-1/2">
                                <h1 className="line-clamp-3 text-xl leading-relaxed font-semibold tracking-wide group-hover:underline group-active:underline">
                                    {latest_news_single[0].judul}
                                </h1>
                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm">
                                    <UserCircle className="inline-block size-4" />
                                    <span>{latest_news_single[0].user}</span>
                                    <span className="size-1.5 rounded-full bg-foreground"></span>
                                    <span className="hidden gap-2 xl:flex">
                                        {new Date(
                                            latest_news_single[0].tgl,
                                        ).toLocaleDateString('id-ID', {
                                            dateStyle: 'full',
                                        })}{' '}
                                        <span className="hidden 2xl:block">
                                            {new Date(
                                                latest_news_single[0].jam,
                                            ).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                timeZoneName: 'short',
                                            })}
                                        </span>
                                    </span>
                                    <span className="block xl:hidden">
                                        {new Date(
                                            latest_news_single[0].tgl,
                                        ).toLocaleDateString('id-ID', {
                                            dateStyle: 'medium',
                                        })}
                                    </span>
                                </div>
                                <div className="line-clamp-4 leading-relaxed tracking-wide text-muted-foreground xl:line-clamp-5">
                                    {parse(latest_news_single[0].isi_berita)}
                                </div>
                            </div>
                        </Link>
                        <Carousel
                            opts={{
                                loop: true,
                            }}
                        >
                            <div className="flex flex-row items-center justify-between gap-4">
                                <h1 className="font-semibold">Featured News</h1>
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
                                                <div className="group relative flex h-40 cursor-pointer flex-col justify-end overflow-hidden rounded-lg bg-primary/35 p-2">
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
                                                    <p className="z-1 line-clamp-2 text-sm font-medium tracking-wide text-white group-hover:underline group-active:underline lg:text-base">
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
                                                            variant={'outline'}
                                                            className="mr-2"
                                                        >
                                                            {item.kategori}
                                                        </Badge>
                                                        Video oleh {item.admin}
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
                                                            aspectRatio: '16/9',
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
                                <Link
                                    as={'div'}
                                    href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                    key={index}
                                    className="group relative col-span-2 flex cursor-pointer flex-col gap-4 rounded-xl md:col-span-1"
                                >
                                    <div className="relative h-50 w-full rounded-xl bg-primary/40 xl:h-60">
                                        <img
                                            src={`${imageUrl}/${item.foto_berita}`}
                                            alt={item.judul}
                                            className="absolute inset-0 h-full w-full rounded-xl object-cover object-center brightness-75"
                                            onError={(e) => {
                                                (
                                                    e.currentTarget as HTMLImageElement
                                                ).src = '/no-image.png';
                                            }}
                                        />
                                        <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                            <Eye className="inline-block size-4 text-white" />
                                            <span className="text-xs text-white">
                                                {item.hits || 0}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge className="absolute top-2 left-2 uppercase">
                                        {getRubrikOrKategori(item, true)}
                                    </Badge>
                                    <div className="overflow-hidden rounded-xl p-2">
                                        <h1 className="line-clamp-2 text-lg leading-relaxed font-semibold tracking-wide group-hover:underline group-active:underline md:text-xl xl:line-clamp-3">
                                            {item.judul}
                                        </h1>
                                        <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                            <UserCircle className="inline-block size-4" />
                                            <span>{item.user}</span>
                                            <span className="size-1.5 rounded-full bg-primary"></span>
                                            <span className="hidden gap-2 2xl:flex">
                                                {new Date(
                                                    item.tgl,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'full',
                                                })}
                                                <span className="hidden 2xl:block">
                                                    <span> jam </span>
                                                    {new Date(
                                                        item.jam,
                                                    ).toLocaleTimeString(
                                                        'id-ID',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            timeZoneName:
                                                                'short',
                                                        },
                                                    )}
                                                </span>
                                            </span>
                                            <span className="block 2xl:hidden">
                                                {new Date(
                                                    item.tgl,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'medium',
                                                })}
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
                <div className="order-1 col-span-3 lg:order-2 lg:col-span-1">
                    <div className="w-max pb-4">
                        <h1 className="text-xl font-semibold">Perspektif</h1>
                        <div className="flex gap-1">
                            <span className="h-[3px] w-1/2 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/6 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/12 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <Card className="p-4">
                        <Link
                            as={'div'}
                            href={`/read-news/${createSlug(perspektif[0].id_ber, perspektif[0].judul)}`}
                            className="group relative flex cursor-pointer gap-4 rounded-xl lg:flex-col md:xl:h-60 md:xl:flex-row"
                        >
                            <div className="relative w-full rounded-xl bg-primary/40 lg:h-80 md:xl:h-auto md:xl:w-2/3">
                                <img
                                    src={`${imageUrl}/${perspektif[0].foto_berita}`}
                                    alt={perspektif[0].judul}
                                    className="absolute inset-0 size-full rounded-xl object-cover brightness-75"
                                    onError={(e) => {
                                        (
                                            e.currentTarget as HTMLImageElement
                                        ).src = '/no-image.png';
                                    }}
                                />
                                <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                    <Eye className="inline-block size-4 text-white" />
                                    <span className="text-xs text-white">
                                        {perspektif[0].hits || 0}
                                    </span>
                                </div>
                                <Badge className="absolute top-2 right-2 uppercase">
                                    {getRubrikOrKategori(perspektif[0], true)}
                                </Badge>
                            </div>
                            <div className="w-full overflow-hidden rounded-xl p-2 md:xl:w-2/3">
                                <h1 className="text-xl leading-relaxed font-semibold tracking-wide group-hover:underline group-active:underline">
                                    {perspektif[0].judul}
                                </h1>
                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                    <UserCircle className="inline-block size-4" />
                                    <span>{perspektif[0].user}</span>
                                </div>
                                <div className="line-clamp-4 leading-relaxed tracking-wide text-muted-foreground">
                                    {parse(perspektif[0].isi_berita)}
                                </div>
                            </div>
                        </Link>
                    </Card>
                    <div className="sticky top-0 py-4">
                        <div className="relative pb-1">
                            <h1 className="font-semibold">Berita Populer</h1>
                            <div className="absolute -bottom-[3px] left-0 h-1 w-16 rounded-full bg-primary"></div>
                        </div>
                        <Separator className="mb-4" />
                        <div className="flex flex-col gap-6">
                            {popular_news.map((item, index) => (
                                <Link
                                    as={'div'}
                                    href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                    key={index}
                                    className="group flex cursor-pointer flex-row items-center gap-4"
                                >
                                    <img
                                        src={`${imageUrl}/${item.foto_berita}`}
                                        alt={item.judul}
                                        className="size-24 rounded-md bg-primary/40 object-cover"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src = '/no-image.png';
                                        }}
                                    />
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Badge className="uppercase">
                                            {getRubrikOrKategori(item, true)}
                                        </Badge>
                                        <p className="flex gap-2 text-sm text-muted-foreground">
                                            {new Date(
                                                item.tgl,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'full',
                                            })}
                                            <span className="hidden xl:block">
                                                <span> jam </span>
                                                {new Date(
                                                    item.jam,
                                                ).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    timeZoneName: 'short',
                                                })}
                                            </span>
                                        </p>
                                        <p className="line-clamp-2 font-medium group-hover:underline group-active:underline">
                                            {item.judul}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 mb-2 h-30 w-full rounded-lg">
                            {sponsors && sponsors.utama.length > 0 ? (
                                <Link
                                    href={sponsors.utama[0].link}
                                >
                                    <img
                                        src={`${imageUrl}/${sponsors.utama[0].img_ikl}`}
                                        alt="Iklan Utama"
                                        className="h-30 w-full rounded-lg object-cover"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src = '/no-image.png';
                                        }}
                                    />
                                </Link>
                            ) : (
                                <div className="flex h-30 w-full items-center justify-center rounded-lg bg-muted">
                                    <p className="text-center text-sm text-muted-foreground">
                                        Space Iklan Utama
                                    </p>
                                </div>
                            )}
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            {sponsors && sponsors.utama.length > 0
                                ? sponsors.utama[0].title_ikl
                                : 'Pasang Iklan Anda di sini'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
