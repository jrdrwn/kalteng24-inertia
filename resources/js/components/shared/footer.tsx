import { createSlug, getRubrikOrKategori } from '@/lib/utils';
import { BeritaRed } from '@/types/entities';
import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaLinkedin,
    FaTwitterSquare,
    FaYoutubeSquare,
} from 'react-icons/fa';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface FooterProps {
    popular_news: BeritaRed[];
}

export default function Footer({ popular_news }: FooterProps) {
    return (
        <footer className="mt-10 border-t bg-muted/20 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-8 pt-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="col-span-1">
                        <h1 className="mb-6 text-2xl font-bold uppercase">
                            official support
                        </h1>
                        <div className="flex flex-col gap-4">
                            <span className="flex items-start">
                                <MapPin className="mr-2 size-6" />
                                <p className="flex-1">
                                    Jl. Sapan II A No. 36, Lantai III Palangka
                                    Raya, Kalimantan Tengah
                                </p>
                            </span>
                            <span className="flex items-start">
                                <Phone className="mr-2 size-6" />
                                <p className="flex-1">+62 813-4921-9926</p>
                            </span>
                            <span className="flex items-start">
                                <Mail className="mr-2 size-6" />
                                <p className="flex-1">
                                    kaltengduaempat@gmail.com
                                </p>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h1 className="mb-6 text-2xl font-bold uppercase">
                            popular news
                        </h1>
                        <div className="flex flex-col gap-4">
                            {popular_news.slice(0, 3).map((item, index) => (
                                <Link
                                    as={'div'}
                                    href={`
                            /read-news/${createSlug(item.id_ber, item.judul)}
                            `}
                                    key={index}
                                    className="group cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <Badge className="uppercase">
                                            {getRubrikOrKategori(item, true)}
                                        </Badge>
                                        <span className="text-sm">
                                            {new Date(
                                                item.tgl,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'medium',
                                            })}
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-1 text-sm font-medium group-hover:underline">
                                        {item.judul}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h1 className="mb-6 text-2xl font-bold uppercase">
                            kategori
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Kalteng',
                                'Palangka Raya',
                                'Berita',
                                'Nasional',
                                'Olahraga',
                                'Teknologi',
                                'Health',
                            ].map((tag, index) => (
                                <Link href={'/search?q=' + tag} key={index}>
                                    <Badge
                                        key={tag}
                                        variant={'secondary'}
                                        className="cursor-pointer"
                                    >
                                        {tag}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h1 className="mb-6 text-2xl font-bold uppercase">
                            follow us
                        </h1>
                        <div className="flex flex-wrap gap-4">
                            <FaFacebookSquare className="size-8 text-blue-600" />
                            <FaInstagramSquare className="size-8 text-pink-600" />
                            <FaTwitterSquare className="size-8 text-blue-400" />
                            <FaYoutubeSquare className="size-8 text-red-600" />
                            <FaLinkedin className="size-8 text-blue-700" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse items-center justify-between gap-4 border-t py-2 text-center lg:flex-row">
                    <p className="text-sm">
                        Copyright © 2020 Berita Kalteng 24. All rights
                        reserved.
                    </p>
                    <div>
                        <Link href="/about-us">
                            <Button variant="link">Tentang Kami</Button>
                        </Link>
                        <Link href="/pedoman-media-siber">
                            <Button variant="link">Pedoman Media Siber</Button>
                        </Link>
                        <Link href="/disclaimer">
                            <Button variant="link">Disclaimer</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
