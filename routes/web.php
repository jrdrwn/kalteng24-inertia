<?php

use App\Models\BeritaRed;
use App\Models\BeritaVid;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return Inertia::render('home', [
        'hero_berita' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('tgl', 'desc')->take(4)->get(),
        'breaking_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('tgl', 'desc')->take(16)->offset(4)->get(),
        'latest_news_single' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('tgl', 'desc')->take(1)->get(),
        'latest_news' => Inertia::scroll(
            fn() =>
            BeritaRed::whereNot('id_ber', '=', 69)->orderBy('tgl', 'desc')->paginate(8)
        ),
        'latest_news_video' => BeritaVid::orderBy('tgl', 'desc')->take(5)->get(),
        'perspektif' => BeritaRed::where('id_ber', '=', 69)->get(),
        'popular_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('hits', 'desc')->take(5)->get(),
    ]);
})->name('home');

Route::get('/search', function () {
    return Inertia::render('search');
})->name('search');

Route::get('/read-news', function () {
    return Inertia::render('read-news');
})->name('read-news');

Route::get('/about-us', function () {
    return Inertia::render('about-us');
})->name('about-us');

Route::get('/pedoman-media-siber', function () {
    return Inertia::render('pedoman-media-siber');
})->name('pedoman-media-siber');

Route::get('/disclaimer', function () {
    return Inertia::render('disclaimer');
})->name('disclaimer');
