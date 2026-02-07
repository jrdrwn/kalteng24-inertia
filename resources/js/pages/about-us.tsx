import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import SponsorFooter from '@/components/sponsor/footer';
import SponsorUtama from '@/components/sponsor/utama';
import { Card } from '@/components/ui/card';
import { BeritaRed, Config, IklOnline } from '@/types/entities';

interface PageProps {
    popular_news: BeritaRed[];
    metadata: Config;
    sponsors?: {
        utama: IklOnline[];
        footer: IklOnline[];
    };
}
export default function AboutUs({
    popular_news,
    metadata,
    sponsors,
}: PageProps) {
    return (
        <>
            <SponsorUtama data={sponsors?.utama || []} />
            <Header metadata={metadata} />
            <section className="px-2 py-10 md:px-4">
                <div className="container mx-auto">
                    <Card className="mx-auto prose max-w-6xl gap-0 px-4 dark:prose-invert">
                        <h2>TENTANG KAMI</h2>
                        <p>
                            <b>KALTENG24.COM</b> merupakan portal berita yang
                            lahir dan berdiri di tengah era arus informasi yang
                            begitu pesat di bawah naungan{' '}
                            <b>PT. Kalteng Dua Empat Medianet</b> yang telah
                            disahkan oleh <b>Kemenkumham RI</b> dengan nomor
                            Keputusan:{' '}
                            <b>NOMOR AHU-0264681.AH.01.11.TAHUN 2022 </b>{' '}
                            berkantor pusat di <b>{metadata.alamat}</b>
                        </p>
                        <p>
                            <b>Our Team</b>
                            <br />
                            <b>Direktur</b> : Resto Hariano
                            <br />
                            <b>Pimpinan Redaksi</b> : Pahit S. Narottama, S.Hut
                            <br />
                            <b>Editor</b> : Rommy, SE
                            <br />
                            <b>Redaksi</b> : Donni, S.Pd., Andre, S.Pd.
                            <br />
                            <b>Desain Grafis &amp; IT</b> : Riski
                            <br />
                            <br />
                            KONSULTAN HUKUM
                            <br />
                            Kariswan Pratama, SH, SHI.
                            <br />
                            <br />
                            PERWAKILAN DAN BIRO DAERAH
                            <br />
                            Kotawaringin Timur - Seruyan - Kotawaringin Barat -
                            Lamandau - Sukamara - Katingan - Pulang Pisau -
                            Kapuas - Gunung Mas - Barito Utara - Barito Selatan
                            - Barito Timur - Murung Raya
                            <br />
                            Jakarta - IKN - Kaltim - Kaltara - Kalsel - Kalbar
                            <br />
                            <br />
                            BAGIAN UMUM
                            <br />
                            <b>Administrasi dan Keuangan</b> : Rina
                            <br />
                            <b>Iklan dan Pemasaran</b> : Mahaputra
                            <br />
                            <br />
                            Rekening Giro
                            <br />
                            <b>BANK KALTENG</b>
                            <br />
                            No. 1180103000090
                            <br />
                            An. PT. Kalteng Dua Empat Medianet
                        </p>
                    </Card>
                </div>
            </section>
            <SponsorFooter data={sponsors?.footer || []} />
            <Footer popular_news={popular_news} metadata={metadata} />
        </>
    );
}
