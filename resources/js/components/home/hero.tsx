import { getRubrikOrKategori } from '@/lib/utils';
import { BeritaRed } from '@/types/entities';
import parse from 'html-react-parser';
import { UserCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ComponentProps {
    hero_berita: BeritaRed[];
}

export default function Hero({ hero_berita }: ComponentProps) {
    return (
        <section className="px-4 py-2">
            <div className="container mx-auto grid h-[400px] grid-cols-4 grid-rows-2 items-center justify-items-center gap-6 [&>div]:flex [&>div]:flex-col [&>div]:items-start [&>div]:justify-end [&>div]:gap-y-2 [&>div]:rounded-2xl [&>div]:p-4 [&>div]:text-white">
                <div className="relative col-span-2 row-span-2 h-full w-full bg-primary/80">
                    <img
                        src={`/foto_berita/${hero_berita[0].foto_berita}`}
                        alt={hero_berita[0].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center brightness-75"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[0], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold">
                        {hero_berita[0].judul}
                    </h1>
                    <div className="z-1 line-clamp-2 text-sm">
                        {parse(hero_berita[0].isi_berita)}
                    </div>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[0].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>
                            {new Date(hero_berita[0].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                            <span> jam </span>
                            {new Date(hero_berita[0].jam).toLocaleTimeString(
                                'id-ID',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short',
                                },
                            )}
                        </span>
                    </div>
                </div>
                <div className="relative col-span-2 row-span-1 h-full w-full bg-primary/70">
                    <img
                        src={`/foto_berita/${hero_berita[1].foto_berita}`}
                        alt={hero_berita[1].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center brightness-75"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[1], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold">
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
                </div>
                <div className="relative col-span-1 row-span-1 h-full w-full bg-primary/50">
                    <img
                        src={`/foto_berita/${hero_berita[2].foto_berita}`}
                        alt={hero_berita[2].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center brightness-75"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[2], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold">
                        {hero_berita[2].judul}
                    </h1>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[2].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>
                            {new Date(hero_berita[2].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                        </span>
                    </div>
                </div>
                <div className="relative col-span-1 row-span-1 h-full w-full bg-primary/30">
                    <img
                        src={`/foto_berita/${hero_berita[3].foto_berita}`}
                        alt={hero_berita[3].judul}
                        className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center brightness-75"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-900"></div>
                    <Badge
                        variant={'secondary'}
                        className="z-1 text-primary uppercase"
                    >
                        {getRubrikOrKategori(hero_berita[3], true)}
                    </Badge>
                    <h1 className="z-1 line-clamp-2 text-2xl font-semibold">
                        {hero_berita[3].judul}
                    </h1>
                    <div className="z-1 flex flex-row items-center gap-1 text-sm">
                        <UserCircle className="inline-block size-4" />
                        <span>{hero_berita[3].user}</span>
                        <span className="size-1.5 rounded-full bg-white"></span>
                        <span>
                            {new Date(hero_berita[3].tgl).toLocaleDateString(
                                'id-ID',
                                {
                                    dateStyle: 'full',
                                },
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
