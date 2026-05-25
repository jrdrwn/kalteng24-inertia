<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $config = DB::table('config')->orderBy('id_con')->first();

        if (! $config) {
            return;
        }

        $alamat = $config->alamat ?? '';

        $aboutUsContent = <<<'HTML'
<h2>TENTANG KAMI</h2>
    <p><b>KALTENG24.COM</b> merupakan portal berita yang lahir dan berdiri di tengah era arus informasi yang begitu pesat di bawah naungan <b>PT. Kalteng Dua Empat Medianet</b> yang telah disahkan oleh <b>Kemenkumham RI</b> dengan nomor Keputusan: <b>NOMOR AHU-0264681.AH.01.11.TAHUN 2022</b> berkantor pusat di <b>{{ALAMAT_PLACEHOLDER}}</b></p>
<p><b>Our Team</b><br /><b>Direktur</b> : Resto Hariano<br /><b>Pimpinan Redaksi</b> : Pahit S. Narottama, S.Hut<br /><b>Editor</b> : Rommy, SE<br /><b>Redaksi</b> : Donni, S.Pd., Andre, S.Pd.<br /><b>Desain Grafis &amp; IT</b> : Riski<br /><br />KONSULTAN HUKUM<br />Kariswan Pratama, SH, SHI.<br /><br />PERWAKILAN DAN BIRO DAERAH<br />Kotawaringin Timur - Seruyan - Kotawaringin Barat - Lamandau - Sukamara - Katingan - Pulang Pisau - Kapuas - Gunung Mas - Barito Utara - Barito Selatan - Barito Timur - Murung Raya<br />Jakarta - IKN - Kaltim - Kaltara - Kalsel - Kalbar<br /><br />BAGIAN UMUM<br /><b>Administrasi dan Keuangan</b> : Rina<br /><b>Iklan dan Pemasaran</b> : Mahaputra<br /><br />Rekening Giro<br /><b>BANK KALTENG</b><br />No. 1180103000090<br />An. PT. Kalteng Dua Empat Medianet</p>
HTML;

        $aboutUsContent = str_replace('{{ALAMAT_PLACEHOLDER}}', e($alamat), $aboutUsContent);

        $disclaimerContent = <<<'HTML'
<h2>DISCLAIMER</h2>
<p>Seluruh layanan dalam situs ini mengikuti aturan yang berlaku dan ditetapkan <b>KALTENG24.COM</b>.<br />Semua isi berupa teks, gambar, suara dan segala bentuk grafis di situs ini hanya sebagai informasi, dan tidak diharapkan untuk tujuan perdagangan saham dan/atau transaksi lainnya.</p>
<p>Kami berupaya keras menampilkan isi seakurat mungkin, tetapi <b>KALTENG24.COM</b> dan semua mitra penyedia isi, termasuk pengelola konsultasi dan pengembang isi dari pihak lain di situs ini, tidak bertanggungjawab atas segala kesalahan dan keterlambatan memperbarui data atau informasi, atau segala kerugian yang timbul karena tindakan berkaitan penggunaan informasi yang disajikan.</p>
<p><b>KALTENG24.COM</b> tidak bertanggung jawab atas akibat langsung ataupun tidak langsung dari semua teks, gambar, suara dan segala bentuk grafis yang dihasilkan dan disampaikan pembaca atau pengguna di berbagai rubrik maupun bagian-bagian dalam situs ini.</p>
<p>Namun demikian, <b>KALTENG24.COM</b> berhak mengatur dan menyunting isi dari pembaca atau pengguna agar tidak merugikan orang lain, lembaga, ataupun badan tertentu serta menjauhi isi berbau pornografi atau menyinggung sentimen suku, agama dan ras.</p>
<p>Segala isi baik berupa teks, gambar, suara dan segala bentuk grafis yang disampaikan pembaca ataupun pengguna adalah tanggung jawab setiap individu, dan bukan tanggungjawab <b>KALTENG24.COM</b>.</p>
<p>Semua hasil karya yang dimuat di <b>KALTENG24.COM</b> baik berupa teks, gambar dan suara serta segala bentuk grafis adalah menjadi hak cipta <b>KALTENG24.COM</b>.</p>
HTML;

        $pedomanMediaSiberContent = <<<'HTML'
<h2>PEDOMAN PEMBERITAAN MEDIA SIBER</h2>
<p>Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers. Media siber memiliki karakter khusus sehingga memerlukan pedoman agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik. Untuk itu Dewan Pers bersama organisasi pers, pengelola media siber, dan masyarakat menyusun Pedoman Pemberitaan Media Siber sebagai berikut:</p>
<ol>
    <li>Ruang Lingkup</li>
    <ol type="a">
        <li>Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers.</li>
        <li>Isi Buatan Pengguna (User Generated Content) adalah segala isi yang dibuat dan atau dipublikasikan oleh pengguna media siber, antara lain, artikel, gambar, komentar, suara, video dan berbagai bentuk unggahan yang melekat pada media siber, seperti blog, forum, komentar pembaca atau pemirsa, dan bentuk lain.</li>
    </ol>
    <li>Verifikasi dan keberimbangan berita</li>
    <ol type="a">
        <li>Pada prinsipnya setiap berita harus melalui verifikasi.</li>
        <li>Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.</li>
        <li>Ketentuan dalam butir (a) di atas dikecualikan, dengan syarat:
            <ol>
                <li>Berita benar-benar mengandung kepentingan publik yang bersifat mendesak;</li>
                <li>Sumber berita yang pertama adalah sumber yang jelas disebutkan identitasnya, kredibel dan kompeten;</li>
                <li>Subyek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan atau tidak dapat diwawancarai;</li>
                <li>Media memberikan penjelasan kepada pembaca bahwa berita tersebut masih memerlukan verifikasi lebih lanjut yang diupayakan dalam waktu secepatnya. Penjelasan dimuat pada bagian akhir dari berita yang d. sama, di dalam kurung dan menggunakan huruf miring.</li>
                <li>Setelah memuat berita sesuai dengan butir (c), media wajib meneruskan upaya verifikasi, dan setelah verifikasi didapatkan, hasil verifikasi dicantumkan pada berita pemutakhiran (update) dengan tautan pada berita yang belum terverifikasi.</li>
            </ol>
        </li>
    </ol>
    <li>Isi Buatan Pengguna (User Generated Content)</li>
    <ol type="a">
        <li>Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan Undang-Undang No. 40 tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang ditempatkan secara terang dan jelas.</li>
        <li>Media siber mewajibkan setiap pengguna untuk melakukan registrasi keanggotaan dan melakukan proses log-in terlebih dahulu untuk dapat mempublikasikan semua bentuk Isi Buatan Pengguna. Ketentuan mengenai log-in akan diatur lebih lanjut.</li>
        <li>Dalam registrasi tersebut, media siber mewajibkan pengguna memberi persetujuan tertulis bahwa Isi Buatan Pengguna yang dipublikasikan:
            <ol type="1">
                <li>Tidak memuat isi bohong, fitnah, sadis dan cabul;</li>
                <li>Tidak memuat isi yang mengandung prasangka dan kebencian terkait dengan suku, agama, ras, dan antargolongan (SARA), serta menganjurkan tindakan kekerasan;</li>
                <li>Tidak memuat isi diskriminatif atas dasar perbedaan jenis kelamin dan bahasa, serta tidak merendahkan martabat orang lemah, miskin, sakit, cacat jiwa, atau cacat jasmani.</li>
            </ol>
        </li>
        <li>Media siber memiliki kewenangan mutlak untuk mengedit atau menghapus Isi Buatan Pengguna yang bertentangan dengan butir (c).</li>
        <li>Media siber wajib menyediakan mekanisme pengaduan Isi Buatan Pengguna yang dinilai melanggar ketentuan pada butir (c). Mekanisme tersebut harus disediakan di tempat yang dengan mudah dapat diakses pengguna.</li>
        <li>Media siber wajib menyunting, menghapus, dan melakukan tindakan koreksi setiap Isi Buatan Pengguna yang dilaporkan dan melanggar ketentuan butir (c), sesegera mungkin secara proporsional selambat-lambatnya 2 x 24 jam setelah pengaduan diterima.</li>
        <li>Media siber yang telah memenuhi ketentuan pada butir (a), (b), (c), dan (f) tidak dibebani tanggung jawab atas masalah yang ditimbulkan akibat pemuatan isi yang melanggar ketentuan pada butir (c).</li>
        <li>Media siber bertanggung jawab atas Isi Buatan Pengguna yang dilaporkan bila tidak mengambil tindakan koreksi setelah batas waktu sebagaimana tersebut pada butir (f).</li>
    </ol>
    <li>Ralat, Koreksi, dan Hak Jawab</li>
    <ol type="a">
        <li>Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers.</li>
        <li>Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab.</li>
        <li>Di setiap berita ralat, koreksi, dan hak jawab wajib dicantumkan waktu pemuatan ralat, koreksi, dan atau hak jawab tersebut.</li>
        <li>Bila suatu berita media siber tertentu disebarluaskan media siber lain, maka:
            <ol>
                <li>Tanggung jawab media siber pembuat berita terbatas pada berita yang dipublikasikan di media siber tersebut atau media siber yang berada di bawah otoritas teknisnya;</li>
                <li>Koreksi berita yang dilakukan oleh sebuah media siber, juga harus dilakukan oleh media siber lain yang mengutip berita dari media siber yang dikoreksi itu;</li>
                <li>Media yang menyebarluaskan berita dari sebuah media siber dan tidak melakukan koreksi atas berita sesuai yang dilakukan oleh media siber pemilik dan atau pembuat berita tersebut, bertanggung jawab penuh atas semua akibat hukum dari berita yang tidak dikoreksinya itu.</li>
            </ol>
        </li>
        <li>Sesuai dengan Undang-Undang Pers, media siber yang tidak melayani hak jawab dapat dijatuhi sanksi hukum pidana denda paling banyak Rp500.000.000 (Lima ratus juta rupiah).</li>
    </ol>
    <li>Pencabutan Berita</li>
    <ol type="a">
        <li>Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik korban atau berdasarkan pertimbangan khusus lain yang ditetapkan Dewan Pers.</li>
        <li>Media siber lain wajib mengikuti pencabutan kutipan berita dari media asal yang telah dicabut.</li>
        <li>Pencabutan berita wajib disertai dengan alasan pencabutan dan diumumkan kepada publik.</li>
    </ol>
    <li>Iklan</li>
    <ol type="a">
        <li>Media siber wajib membedakan dengan tegas antara produk berita dan iklan.</li>
        <li>Setiap berita/artikel/isi yang merupakan iklan dan atau isi berbayar wajib mencantumkan keterangan 'advertorial', 'iklan', 'ads', 'sponsored', atau kata lain yang menjelaskan bahwa berita/artikel/isi tersebut adalah iklan.</li>
    </ol>
    <li>Hak Cipta Media siber wajib menghormati hak cipta sebagaimana diatur dalam peraturan perundang-undangan yang berlaku.</li>
    <li>Pencantuman Pedoman Media siber wajib mencantumkan Pedoman Pemberitaan Media Siber ini di medianya secara terang dan jelas.</li>
    <li>Sengketa Penilaian akhir atas sengketa mengenai pelaksanaan Pedoman Pemberitaan Media Siber ini diselesaikan oleh Dewan Pers.</li>
</ol>
<br />
Jakarta, 3 Februari 2012<br />
(Pedoman ini ditandatangani oleh Dewan Pers dan komunitas pers di Jakarta, 3 Februari 2012)<br /><br />
Mengetahui,<br />Ttd<br /><br /><br />Bagir Manan<br />Ketua Dewan Pers<br />
HTML;

        DB::table('config')
            ->where('id_con', $config->id_con)
            ->update([
                'about_us_content' => $aboutUsContent,
                'disclaimer_content' => $disclaimerContent,
                'pedoman_media_siber_content' => $pedomanMediaSiberContent,
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('config')
            ->update([
                'about_us_content' => null,
                'disclaimer_content' => null,
                'pedoman_media_siber_content' => null,
            ]);
    }
};
