import { SharedData } from '@/types';
import { IklOnline } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';

interface SponsorInsidentalStackProps {
    data: IklOnline[];
}
export default function SponsorInsidentalStack({
    data,
}: SponsorInsidentalStackProps) {
    const { imageUrl } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Carousel
                orientation="vertical"
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="mt-8 w-full"
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                        jump: false,
                    }),
                ]}
                onClick={() => setOpen(true)}
            >
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="lg:basis-1/3">
                            <Link
                                as={'div'}
                                href={item.link}
                                className="group w-full cursor-pointer p-1"
                            >
                                <img
                                    src={`${imageUrl}/${item.img_ikl}`}
                                    alt={item.title_ikl}
                                    className="mx-auto aspect-[3/1] w-full object-cover"
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sponsor Insidental</DialogTitle>
                        <DialogDescription>
                            Klik gambar untuk mengunjungi tautan sponsor
                        </DialogDescription>
                    </DialogHeader>
                    {data.map((item, index) => (
                        <div key={index} className="mb-4">
                            <Link
                                as={'div'}
                                href={item.link}
                                className="group w-full cursor-pointer p-1"
                            >
                                <img
                                    src={`${imageUrl}/${item.img_ikl}`}
                                    alt={item.title_ikl}
                                    className="mx-auto aspect-[3/1] w-full object-cover"
                                    onError={(e) => {
                                        (
                                            e.currentTarget as HTMLImageElement
                                        ).src = '/no-image.png';
                                    }}
                                />
                            </Link>
                        </div>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    );
}
