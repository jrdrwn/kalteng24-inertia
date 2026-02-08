import { SharedData } from '@/types';
import { IklOnline } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface SponsorHeadlineProps {
    data: IklOnline[];
}
export default function SponsorHeadline({ data }: SponsorHeadlineProps) {
    const { imageUrl } = usePage<SharedData>().props;
    return (
        <div>
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="mb-4 w-full"
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                        jump: false,
                    }),
                ]}
            >
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index}>
                            <Link
                                as={'div'}
                                href={item.link}
                                className="group w-full cursor-pointer p-1"
                            >
                                <img
                                    src={`${imageUrl}/${item.img_ikl}`}
                                    alt={item.title_ikl}
                                    className="mx-auto aspect-[5/1] h-24 w-full object-cover md:h-28 lg:h-32 xl:h-40 2xl:h-48"
                                    onError={(e) => {
                                        (
                                            e.currentTarget as HTMLImageElement
                                        ).src = '/no-image.png';
                                    }}
                                />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
