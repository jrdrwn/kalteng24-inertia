// resources/js/types/entities.ts

// ===== berita_red =====
export interface BeritaRed {
    id_ber: number;
    judul: string;
    sub_up: string;
    sub_judul: string;
    tema: string;
    text_foto: string;
    isi_berita: string;
    foto_berita: string;
    uk: number;
    tp: string;
    kategori: string;
    jenis_rubrik: string;
    rate_view: string;
    like_view: number;
    unlike_viuew: number; // typo di DB, ikutkan supaya match data
    status: string;
    hits: number;
    user: string;
    hari: string;
    tgl: string; // date
    jam: string; // time
}

// ===== berita_vid =====
export interface BeritaVid {
    id_vid: number;
    judul_vid: string;
    link: string;
    text_vid: string;
    kategori: string;
    status: string;
    tgl: string; // di DB varchar(15)
    jam: string; // di DB varchar(10)
    admin: string;
}

// ===== cache =====
export interface Cache {
    key: string;
    value: string;
    expiration: number;
}

// ===== cache_locks =====
export interface CacheLock {
    key: string;
    owner: string;
    expiration: number;
}

// ===== config =====
export interface Config {
    id_con: number;
    title: string;
    coppyright: string;
    link_coppy: string;
    motho: string;
    wasupport: string;
    email: string;
    alamat: string;
    ico: string;
    logo: string;
    fb: string;
    tw: string;
    ig: string;
    yt: string;
}

// ===== counter =====
export interface Counter {
    id: number;
    tanggal: string; // date
    ip: string;
    hits: string; // di DB varchar(50)
    online: string; // di DB varchar(20)
}

// ===== failed_jobs =====
export interface FailedJob {
    id: number; // bigint unsigned
    uuid: string;
    connection: string;
    queue: string;
    payload: string;
    exception: string;
    failed_at: string; // timestamp
}

// ===== foto_berita =====
export interface FotoBerita {
    id_foto: number;
    judul: string;
    foto: string;
    tgl: string; // date
    admin: string;
    status: number; // int(2)
}

// ===== ikl_online =====
export interface IklOnline {
    id_ikl: number;
    title_ikl: string;
    link: string;
    img_ikl: string;
    ktg_ikl: string;
    posisi: string;
    status: string;
    admin: string;
    pemasang: string;
    tgl: string; // date
    jam: string; // time
    ket: string;
}

// ===== jobs =====
export interface Job {
    id: number; // bigint unsigned
    queue: string;
    payload: string;
    attempts: number; // tinyint unsigned
    reserved_at: number | null; // int unsigned DEFAULT NULL
    available_at: number; // int unsigned
}

// ===== job_batches =====
export interface JobBatch {
    id: string;
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    failed_job_ids: string;
    options: string | null; // mediumtext DEFAULT NULL
    cancelled_at: number | null; // int DEFAULT NULL
    finished_at: number | null; // int DEFAULT NULL
}

// ===== migrations =====
export interface Migration {
    id: number; // int unsigned
    migration: string;
    batch: number;
}

// ===== password_reset_tokens =====
export interface PasswordResetToken {
    email: string;
    token: string;
}

// ===== sessions =====
export interface Session {
    id: string;
    user_id: number | null; // bigint unsigned NULL
    ip_address: string | null; // varchar(45) NULL
    user_agent: string | null; // text NULL
    payload: string;
    last_activity: number; // int
}

// ===== tanya_jawab =====
export interface TanyaJawab {
    id_tanya: number;
    tanya: string;
    jawab: string;
    hari: string;
    tgl: string; // date
    jam: string; // time
    status: string;
    admin: string;
}

// ===== users (custom) =====
export interface UserCustom {
    id_user: number;
    nama: string;
    nm_blg: string;
    kode_plg: string;
    email: string;
    nohp: string;
    alamat: string;
    pendaftaran: string;
    username: string;
    password: string;
    level: string;
    admin_type: string;
    foto_user: string;
    status: 'aktif' | 'nonaktif';
}

// ===== users_laravel (default laravel users) =====
export interface UserLaravel {
    id: number; // bigint unsigned
    name: string;
    email: string;
    email_verified_at: string | null; // timestamp NULL
    password: string;
    remember_token: string | null; // varchar(100) NULL
}
