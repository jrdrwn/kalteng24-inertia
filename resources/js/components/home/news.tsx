import { getRubrikOrKategori } from '@/lib/utils';
import { BeritaRed, BeritaVid } from '@/types/entities';
import { InfiniteScroll } from '@inertiajs/react';
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
}

export default function News({
    latest_news_single,
    latest_news,
    latest_news_video,
    perspektif,
    popular_news,
}: ComponentProps) {
    return (
        <section className="px-4 py-2">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="w-max pb-4">
                        <h1 className="text-xl font-semibold">Latest News</h1>
                        <div className="flex gap-1">
                            <span className="h-[3px] w-1/2 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/6 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/12 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <Card className="p-4">
                        <div className="relative flex h-80 gap-4 rounded-xl bg-muted">
                            <div className="relative w-2/3 rounded-l-xl bg-primary/40">
                                <img
                                    src={`/foto_berita/${latest_news_single[0].foto_berita}`}
                                    alt={latest_news_single[0].judul}
                                    className="absolute inset-0 h-full w-full rounded-l-xl object-cover object-center brightness-75"
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
                            <div className="w-1/2 overflow-hidden rounded-xl p-2">
                                <h1 className="line-clamp-3 text-xl leading-relaxed font-semibold tracking-wide">
                                    {latest_news_single[0].judul}
                                </h1>
                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm">
                                    <UserCircle className="inline-block size-4" />
                                    <span>{latest_news_single[0].user}</span>
                                    <span className="size-1.5 rounded-full bg-foreground"></span>
                                    <span>
                                        {new Date(
                                            latest_news_single[0].tgl,
                                        ).toLocaleDateString('id-ID', {
                                            dateStyle: 'full',
                                        })}{' '}
                                        {new Date(
                                            latest_news_single[0].jam,
                                        ).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZoneName: 'short',
                                        })}
                                    </span>
                                </div>
                                <div className="line-clamp-5 leading-relaxed tracking-wide text-muted-foreground">
                                    {parse(latest_news_single[0].isi_berita)}
                                </div>
                            </div>
                        </div>
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
                                                <div className="relative flex h-40 flex-col justify-end rounded-lg bg-primary/35 p-2">
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
                                                    <p className="z-1 line-clamp-2 font-medium tracking-wide text-white">
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
                                <div
                                    key={index}
                                    className="relative flex flex-col gap-4 rounded-xl"
                                >
                                    <div className="relative h-60 w-full rounded-xl bg-primary/40">
                                        <img
                                            src={`/foto_berita/${item.foto_berita}`}
                                            alt={item.judul}
                                            className="absolute inset-0 h-full w-full rounded-xl object-cover object-center brightness-75"
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
                                        <h1 className="text-xl leading-relaxed font-semibold tracking-wide">
                                            {item.judul}
                                        </h1>
                                        <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                            <UserCircle className="inline-block size-4" />
                                            <span>{item.user}</span>
                                            <span className="size-1.5 rounded-full bg-primary"></span>
                                            <span>
                                                {new Date(
                                                    item.tgl,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'full',
                                                })}
                                                <span> jam </span>
                                                {new Date(
                                                    item.jam,
                                                ).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    timeZoneName: 'short',
                                                })}
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
                <div>
                    <div className="w-max pb-4">
                        <h1 className="text-xl font-semibold">Perspektif</h1>
                        <div className="flex gap-1">
                            <span className="h-[3px] w-1/2 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/6 rounded-full bg-primary"></span>
                            <span className="h-[3px] w-1/12 rounded-full bg-primary"></span>
                        </div>
                    </div>
                    <Card className="p-4">
                        <div className="relative flex h-60 gap-4 rounded-xl">
                            <div className="relative w-2/3 rounded-xl bg-primary/40">
                                <img
                                    src={`/foto_berita/${perspektif[0].foto_berita}`}
                                    alt={perspektif[0].judul}
                                    className="absolute inset-0 h-full w-full rounded-xl object-cover object-top brightness-75"
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
                            <div className="w-2/3 overflow-hidden rounded-xl p-2">
                                <h1 className="text-xl leading-relaxed font-semibold tracking-wide">
                                    {perspektif[0].judul}
                                </h1>
                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                    <UserCircle className="inline-block size-4" />
                                    <span>{perspektif[0].user}</span>
                                </div>
                                <p className="line-clamp-4 leading-relaxed tracking-wide text-muted-foreground">
                                    {parse(perspektif[0].isi_berita)}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <div className="sticky top-0 py-4">
                        <div className="relative pb-1">
                            <h1 className="font-semibold">Berita Populer</h1>
                            <div className="absolute -bottom-[3px] left-0 h-1 w-16 rounded-full bg-primary"></div>
                        </div>
                        <Separator className="mb-4" />
                        <div className="flex flex-col gap-6">
                            {popular_news.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-4"
                                >
                                    <img
                                        src={`/foto_berita/${item.foto_berita}`}
                                        alt={item.judul}
                                        className="size-24 rounded-md bg-primary/40 object-cover"
                                    />
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Badge>
                                            {getRubrikOrKategori(item, true)}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                item.tgl,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'full',
                                            })}
                                            <span> jam </span>
                                            {new Date(
                                                item.jam,
                                            ).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                timeZoneName: 'short',
                                            })}
                                        </p>
                                        <p className="line-clamp-2 font-medium">
                                            {item.judul}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
