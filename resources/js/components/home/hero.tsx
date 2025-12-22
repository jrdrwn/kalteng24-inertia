import { createSlug, getRubrikOrKategori } from '@/lib/utils';
import { SharedData } from '@/types';
import { BeritaRed } from '@/types/entities';
import { Link, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { UserCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ComponentProps {
    hero_berita: BeritaRed[];
}

export default function Hero({ hero_berita }: ComponentProps) {
    const { imageUrl } = usePage<SharedData>().props;

    return (
        <section className="px-2 py-2 md:px-4">
            <div className="container mx-auto grid h-[400px] grid-cols-4 grid-rows-2 items-center justify-items-center gap-6 [&>div]:flex [&>div]:flex-col [&>div]:items-start [&>div]:justify-end [&>div]:gap-y-2 [&>div]:rounded-2xl [&>div]:p-4 [&>div]:text-white">
                <Link
                    href={`/read-news/${createSlug(hero_berita[0].id_ber, hero_berita[0].judul)}`}
                    as={'div'}
                    className="group relative col-span-4 row-span-2 h-full w-full cursor-pointer bg-primary/80 lg:col-span-2"
                >
                    <img
                        src={`${imageUrl}/${hero_berita[0].foto_berita}`}
                        alt={hero_berita[0].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center blur-[0px] brightness-75 transition-all group-hover:blur"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                '/no-image.png';
                        }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[0], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-lg font-semibold group-hover:underline md:text-2xl">
                        {hero_berita[0].judul}
                    </h1>
                    <div className="z-1 line-clamp-2 text-sm">
                        {parse(hero_berita[0].isi_berita)}
                    </div>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[0].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span className="flex gap-2">
                            {new Date(hero_berita[0].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                            <span className="hidden sm:block">
                                <span> jam </span>
                                {new Date(
                                    hero_berita[0].jam,
                                ).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short',
                                })}
                            </span>
                        </span>
                    </div>
                </Link>
                <Link
                    as={'div'}
                    href={`/read-news/${createSlug(hero_berita[1].id_ber, hero_berita[1].judul)}`}
                    className="group relative col-span-2 row-span-1 !hidden h-full w-full cursor-pointer bg-primary/70 lg:!flex"
                >
                    <img
                        src={`${imageUrl}/${hero_berita[1].foto_berita}`}
                        alt={hero_berita[1].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center blur-[0px] brightness-75 transition-all group-hover:blur"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                '/no-image.png';
                        }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[1], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 font-semibold group-hover:underline lg:text-xl 2xl:text-2xl">
                        {hero_berita[1].judul}
                    </h1>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[1].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>
                            {new Date(hero_berita[1].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                            <span> jam </span>
                            {new Date(hero_berita[1].jam).toLocaleTimeString(
                                'id-ID',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short',
                                },
                            )}
                        </span>
                    </div>
                </Link>
                <Link
                    as={'div'}
                    href={`/read-news/${createSlug(hero_berita[2].id_ber, hero_berita[2].judul)}`}
                    className="group relative col-span-1 row-span-1 !hidden h-full w-full cursor-pointer bg-primary/50 lg:!flex"
                >
                    <img
                        src={`${imageUrl}/${hero_berita[2].foto_berita}`}
                        alt={hero_berita[2].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center blur-[0px] brightness-75 transition-all group-hover:blur"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                '/no-image.png';
                        }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[2], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold group-hover:underline lg:text-lg">
                        {hero_berita[2].judul}
                    </h1>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[2].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span className="hidden 2xl:block">
                            {new Date(hero_berita[2].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                        </span>
                        <span className="2xl:hidden">
                            {new Date(hero_berita[2].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'medium',
                                },
                            )}
                        </span>
                    </div>
                </Link>
                <Link
                    as={'div'}
                    href={`/read-news/${createSlug(hero_berita[3].id_ber, hero_berita[3].judul)}`}
                    className="group relative col-span-1 row-span-1 !hidden h-full w-full cursor-pointer bg-primary/30 lg:!flex"
                >
                    <img
                        src={`${imageUrl}/${hero_berita[3].foto_berita}`}
                        alt={hero_berita[3].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center blur-[0px] brightness-75 transition-all group-hover:blur"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                                '/no-image.png';
                        }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[3], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold group-hover:underline lg:text-lg">
                        {hero_berita[3].judul}
                    </h1>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[3].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span className="hidden xl:block">
                            {new Date(hero_berita[2].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                        </span>
                        <span className="xl:hidden">
                            {new Date(hero_berita[2].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'medium',
                                },
                            )}
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
