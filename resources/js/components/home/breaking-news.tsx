import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

export default function BreakingNews() {
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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/4">
                                <div className="flex flex-row items-center gap-4 p-4">
                                    <div className="size-26 rounded-md bg-primary/40"></div>
                                    <div className="flex flex-1 flex-col gap-2">
                                        <p className="text-sm text-muted-foreground">
                                            14 Juni 2024
                                        </p>
                                        <p className="line-clamp-2 font-medium">
                                            Gubernur Pastikan Kalteng Makin Maju
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
