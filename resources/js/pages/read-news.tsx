import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
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
import { Separator } from '@/components/ui/separator';
import {
    Eye,
    LucideTriangle,
    Timer,
    Triangle,
    User,
    UserCircle,
} from 'lucide-react';
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaLinkedin,
    FaTwitterSquare,
    FaYoutubeSquare,
} from 'react-icons/fa';

export default function ReadNews() {
    return (
        <>
            <Header />
            <section className="p-4">
                <div className="container mx-auto">
                    <div className="flex gap-4">
                        <div className="flex w-full items-center justify-between rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
                            <p>Trending Topics</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button size={'icon'} className="rounded-full">
                                <Triangle className="-rotate-90" />
                            </Button>
                            <Button size={'icon'} className="rounded-full">
                                <Triangle className="rotate-90" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-4">
                <div className="container mx-auto grid grid-cols-6 gap-4">
                    <div className="col-span-1">iklan</div>
                    <div className="col-span-3 prose gap-2 prose-h1:mb-0">
                        <div className="mb-4 aspect-video w-full rounded-2xl bg-primary/40">
                            {/* TODO: tambahkan text foto / caption/license */}
                        </div>
                        <Card className="mb-4 gap-0 p-4">
                            <div className="not-prose flex items-center gap-2 text-sm text-muted-foreground">
                                <span>
                                    <User className="mr-2 inline-block size-4" />
                                    Redaksi
                                </span>
                                <span>
                                    <Eye className="mr-2 inline-block size-4" />
                                    1.2K Views
                                </span>
                                <span>
                                    <Timer className="mr-2 inline-block size-4" />
                                    21 Jan 2024, 14:30 WIB
                                </span>
                            </div>
                            <h1 className="mt-4 mb-2">
                                Judul Berita Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                            </h1>
                            <p className="">
                                <span className="font-bold">PALANGKA RAYA</span>{' '}
                                - There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing hidden in the middle of
                                text. All the Lorem Ipsum generators on the
                                Internet tend to repeat predefined chunks as
                                necessary, making this the first true generator
                                on the Internet. It uses a dictionary of over
                                200 Latin words, combined with a handful.
                            </p>
                            <p className="">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing hidden in the middle of
                                text. All the Lorem Ipsum generators on the
                                Internet tend to repeat predefined chunks as
                                necessary, making this the first true generator
                                on the Internet. It uses a dictionary of over
                                200 Latin words, combined with a handful.
                            </p>
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
                                    {Array.from({ length: 6 }).map(
                                        (_, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="basis-1/3"
                                            >
                                                <div className="relative flex h-35 flex-col justify-end rounded-lg bg-primary/35 p-2">
                                                    <div className="absolute inset-x-0 top-1/2 mx-auto mb-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-secondary p-2">
                                                        <LucideTriangle className="inline-block size-5 rotate-90 text-primary" />
                                                    </div>
                                                    <p className="text-sm font-medium tracking-wide">
                                                        Messi Mau Lengserkan
                                                        Joan Laporta dari
                                                        Barcelona?
                                                    </p>
                                                </div>
                                            </CarouselItem>
                                        ),
                                    )}
                                </CarouselContent>
                            </Carousel>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="relative flex flex-col gap-4 rounded-xl"
                                    >
                                        <div className="relative h-60 w-full rounded-xl bg-primary/40">
                                            <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                                <Eye className="inline-block size-4 text-white" />
                                                <span className="text-xs text-white">
                                                    1.2K
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className="absolute top-2 left-2">
                                            Nasional
                                        </Badge>
                                        <div className="overflow-hidden rounded-xl p-2">
                                            <h1 className="text-xl leading-relaxed font-semibold tracking-wide">
                                                Tengadah Sang Tingang
                                            </h1>
                                            <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm text-primary">
                                                <UserCircle className="inline-block size-4" />
                                                <span>Admin</span>
                                                <span className="size-1.5 rounded-full bg-primary"></span>
                                                <span>12 Juni 2024</span>
                                            </div>
                                            <p className="line-clamp-3 leading-relaxed tracking-wide text-muted-foreground">
                                                SEKETIKA - menengadah ke langit,
                                                ia serupa pendoa yang berucap
                                                pinta kepada Khalik-nya. Sebuah
                                                filosofi alam yang tak jarang
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="p-2">
                                        <div className="flex gap-2">
                                            <div className="aspect-square w-20 rounded-md bg-primary/40"></div>
                                            <div className="flex flex-1 flex-col justify-center gap-0.5">
                                                <Badge>Nasional</Badge>
                                                <p className="line-clamp-1 font-medium">
                                                    Judul Berita Popular Lorem
                                                    ipsum dolor sit amet
                                                </p>
                                                <span className="text-sm">
                                                    21 Jan 2024
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
