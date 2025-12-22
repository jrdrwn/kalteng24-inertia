import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Card } from '@/components/ui/card';
import { BeritaRed } from '@/types/entities';

interface PageProps {
    popular_news: BeritaRed[];
}
export default function Disclaimer({ popular_news }: PageProps) {
    return (
        <>
            <Header />
            <section className="px-2 py-10 md:px-4">
                <div className="container mx-auto">
                    <Card className="mx-auto prose max-w-6xl gap-0 px-4">
                        <h2>DISCLAIMER</h2>
                        <p>
                            Seluruh layanan dalam situs ini mengikuti aturan
                            yang berlaku dan ditetapkan <b>KALTENG24.ID</b>.
                            <br />
                            Semua isi berupa teks, gambar, suara dan segala
                            bentuk grafis di situs ini hanya sebagai informasi,
                            dan tidak diharapkan untuk tujuan perdagangan saham
                            dan/atau transaksi lainnya.
                        </p>
                        <p>
                            Kami berupaya keras menampilkan isi seakurat
                            mungkin, tetapi <b>KALTENG24.ID</b> dan semua mitra
                            penyedia isi, termasuk pengelola konsultasi dan
                            pengembang isi dari pihak lain di situs ini, tidak
                            bertanggungjawab atas segala kesalahan dan
                            keterlambatan memperbarui data atau informasi, atau
                            segala kerugian yang timbul karena tindakan
                            berkaitan penggunaan informasi yang disajikan.
                        </p>
                        <p>
                            <b>KALTENG24.ID</b> tidak bertanggung jawab atas
                            akibat langsung ataupun tidak langsung dari semua
                            teks, gambar, suara dan segala bentuk grafis yang
                            dihasilkan dan disampaikan pembaca atau pengguna di
                            berbagai rubrik maupun bagian-bagian dalam situs
                            ini.
                        </p>
                        <p>
                            Namun demikian, <b>KALTENG24.ID</b> berhak mengatur
                            dan menyunting isi dari pembaca atau pengguna agar
                            tidak merugikan orang lain, lembaga, ataupun badan
                            tertentu serta menjauhi isi berbau pornografi atau
                            menyinggung sentimen suku, agama dan ras.
                        </p>
                        <p>
                            Segala isi baik berupa teks, gambar, suara dan
                            segala bentuk grafis yang disampaikan pembaca
                            ataupun pengguna adalah tanggung jawab setiap
                            individu, dan bukan tanggungjawab{' '}
                            <b>KALTENG24.ID</b>.
                        </p>
                        <p>
                            Semua hasil karya yang dimuat di <b>KALTENG24.ID</b>{' '}
                            baik berupa teks, gambar dan suara serta segala
                            bentuk grafis adalah menjadi hak cipta{' '}
                            <b>KALTENG24.ID</b>.
                        </p>
                    </Card>
                </div>
            </section>
            <Footer popular_news={popular_news} />
        </>
    );
}
