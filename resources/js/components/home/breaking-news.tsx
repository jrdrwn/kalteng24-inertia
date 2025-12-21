import { createSlug } from '@/lib/utils';
import { SharedData } from '@/types';
import { BeritaRed } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface ComponentProps {
    breaking_news: BeritaRed[];
}

export default function BreakingNews({ breaking_news }: ComponentProps) {
    const { imageUrl } = usePage<SharedData>().props;
    return (
        <section className="px-4 py-2">
            <div className="container">
                <div className="w-max rounded-t-xl bg-primary px-4 py-1 text-primary-foreground">
                    Breaking News
                </div>
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                            jump: false,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {breaking_news.map((item, index) => (
                            <CarouselItem key={index} className="basis-1/4">
                                <Link
                                    as={'div'}
                                    href={`/read-news/${createSlug(item.id_ber, item.judul)}`}
                                    className="group flex cursor-pointer flex-row items-center gap-4 p-4"
                                >
                                    <img
                                        src={`${imageUrl}/${item.foto_berita}`}
                                        alt={item.judul}
                                        className="size-26 rounded-md bg-primary/40 object-cover shadow-md"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src = '/no-image.png';
                                        }}
                                    />
                                    <div className="flex flex-1 flex-col gap-2">
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                item.tgl,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'full',
                                            })}
                                        </p>
                                        <p className="line-clamp-2 font-medium group-hover:underline">
                                            {item.judul}
                                        </p>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
