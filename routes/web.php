<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/home', function () {
    return Inertia::render('home', [
        'nama' => 'Kalteng24 Inertia',
    ]);
})->name('home');

Route::get('/search', function () {
    return Inertia::render('search');
})->name('search');

Route::get('/read-news', function () {
    return Inertia::render('read-news');
})->name('read-news');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
