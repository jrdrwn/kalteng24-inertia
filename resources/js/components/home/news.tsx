import { Eye, LucideTriangle, UserCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { Separator } from '../ui/separator';

export default function News() {
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
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                                    <Eye className="inline-block size-4 text-white" />
                                    <span className="text-xs text-white">
                                        1.2K
                                    </span>
                                </div>
                            </div>
                            <Badge className="absolute top-2 left-2">
                                Nasional
                            </Badge>
                            <div className="w-1/3 overflow-hidden rounded-xl p-2">
                                <h1 className="text-xl leading-relaxed font-semibold tracking-wide">
                                    Traveling Makes You More Inteligent and More
                                    Energietic
                                </h1>
                                <div className="mb-4 flex flex-row items-center gap-1.5 pt-2 text-sm">
                                    <UserCircle className="inline-block size-4" />
                                    <span>Admin</span>
                                    <span className="size-1.5 rounded-full bg-foreground"></span>
                                    <span>12 Juni 2024</span>
                                </div>
                                <p className="line-clamp-5 leading-relaxed tracking-wide text-muted-foreground">
                                    You can customize the view Blog post with
                                    author simple mouse click and immediately
                                    see the result of your changes. You can
                                    customize the view Blog post with author
                                    simple mouse click and immediately see the
                                    result of your changes.
                                </p>
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
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-1/3"
                                    >
                                        <div className="relative flex h-40 flex-col justify-end rounded-lg bg-primary/35 p-2">
                                            <div className="absolute inset-x-0 top-1/2 mx-auto mb-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-secondary p-2">
                                                <LucideTriangle className="inline-block size-5 rotate-90 text-primary" />
                                            </div>
                                            <p className="font-medium tracking-wide">
                                                Messi Mau Lengserkan Joan
                                                Laporta dari Barcelona?
                                            </p>
                                        </div>
                                    </CarouselItem>
                                ))}
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
                                            SEKETIKA - menengadah ke langit, ia
                                            serupa pendoa yang berucap pinta
                                            kepada Khalik-nya. Sebuah filosofi
                                            alam yang tak jarang
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            <div className="w-2/3 overflow-hidden rounded-xl p-2">
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
                                    SEKETIKA - menengadah ke langit, ia serupa
                                    pendoa yang berucap pinta kepada Khalik-nya.
                                    Sebuah filosofi alam yang tak jarang
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
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-4"
                                >
                                    <div className="size-24 rounded-md bg-primary/40"></div>
                                    <div className="flex flex-1 flex-col gap-2">
                                        <Badge>Nasional</Badge>
                                        <p className="text-sm text-muted-foreground">
                                            14 Juni 2024
                                        </p>
                                        <p className="line-clamp-2 font-medium">
                                            Gubernur Pastikan Kalteng Makin Maju
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
