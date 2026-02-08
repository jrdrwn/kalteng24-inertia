import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { IklOnline } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';

export enum Posisi {
    KIRI_BERITA = 'KIRI BERITA - 1:3',
    KANAN_BERITA = 'KANAN BERITA - 16:9',
    DIBAWAH_BERITA = 'DIBAWAH BERITA - 3:1',
}
interface SponsorBeritaProps {
    data: IklOnline[];
    posisi?: Posisi;
}
export default function SponsorBerita({ data, posisi }: SponsorBeritaProps) {
    const { imageUrl } = usePage<SharedData>().props;
    console.log(posisi);
    return (
        <div>
            {data.map((item, index) => (
                <Link
                    key={index}
                    as={'div'}
                    href={item.link}
                    className="group w-full cursor-pointer p-1"
                >
                    <img
                        src={`${imageUrl}/${item.img_ikl}`}
                        alt={item.title_ikl}
                        className={cn('mx-auto', {
                            ['aspect-[1/3] w-full object-cover']:
                                posisi === Posisi.KIRI_BERITA,
                            ['aspect-[16/9] object-contain']:
                                posisi === Posisi.KANAN_BERITA,
                            ['aspect-[3/1] h-24 object-cover sm:h-28 md:h-32 lg:h-36 xl:h-40 2xl:h-48']:
                                posisi === Posisi.DIBAWAH_BERITA,
                        })}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                '/no-image.png';
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
