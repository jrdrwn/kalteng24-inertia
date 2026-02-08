import { SharedData } from '@/types';
import { IklOnline } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface SponsorUtamaProps {
    data: IklOnline[];
}
export default function SponsorUtama({ data }: SponsorUtamaProps) {
    const { imageUrl } = usePage<SharedData>().props;
    return (
        <div>
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
                                    className="mx-auto aspect-[5/1] h-32 object-contain md:h-40 lg:h-48 xl:h-56 2xl:h-64"
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
