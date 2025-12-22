<?php

use App\Models\BeritaRed;
use App\Models\BeritaVid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

Route::get('/home', function () {
    return redirect()->route('home');
});

Route::get('/search', function (Request $request) {
    $order_by = $request->input('sort', 'latest');

    $kategori = $request->input('kategori', null);
    $jenis_rubrik = $request->input('jenis_rubrik', null);


    $search_query = $request->input('q', '');
    $search_results = BeritaRed::when($search_query, function ($query, $search_query) {
        $query->where(function ($q) use ($search_query) {
            $q->where('judul', 'like', '%' . $search_query . '%')
                ->orWhere('isi_berita', 'like', '%' . $search_query . '%');
        });
    })
        ->when($kategori, function ($query, $kategori) {
            if ($kategori === 'null' || $kategori === 'unknown') {
                $kategori = '';
            }
            $query->where('kategori', 'like',  $kategori);
        })
        ->when($jenis_rubrik, function ($query, $jenis_rubrik) {
            if ($jenis_rubrik === 'null' || $jenis_rubrik === 'unknown') {
                $jenis_rubrik = '';
            }
            $query->where('jenis_rubrik', $jenis_rubrik);
        })
        ->when($order_by === 'latest', function ($query) {
            $query->orderBy('tgl', 'desc');
        })
        ->when($order_by === 'popular', function ($query) {
            $query->orderBy('hits', 'desc');
        })
        ->when($order_by === 'oldest', function ($query) {
            $query->orderBy('tgl', 'asc');
        })
        ->paginate(10)
        ->withQueryString();
    return Inertia::render('search', [
        'popular_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('hits', 'desc')->take(5)->get(),
        'kategori_list' => BeritaRed::select('kategori')->distinct()->get(),
        'jenis_rubrik_list' => BeritaRed::select('jenis_rubrik')->distinct()->get(),
        'search_results' => $search_results,
        'search_query' => $search_query,
    ]);
})->name('search');

Route::get('/read-news/{slug}', function (Request $request, $slug) {
    // slug: id_judul-with-dashes
    $parts = explode('_', $slug, 2);
    $id_ber = $parts[0];
    $news = BeritaRed::findOr($id_ber, function () {
        abort(404);
    });


    // Check IP for increment with manual max size cache
    $ip = $request->ip();
    $ipListKey = "news_hit_iplist_{$id_ber}";
    $cacheKey = "news_hit_{$id_ber}_{$ip}";
    $maxIp = 100;

    $ipList = cache()->get($ipListKey, []);

    if (!in_array($ip, $ipList)) {
        $news->increment('hits');
        array_unshift($ipList, $ip);
        if (count($ipList) > $maxIp) {
            $ipList = array_slice($ipList, 0, $maxIp);
        }
        cache()->put($ipListKey, $ipList, now()->addMinutes(30));
        cache()->put($cacheKey, true, now()->addMinutes(30));
    }


    return Inertia::render('read-news', [
        'news' => $news,
        'popular_news' => BeritaRed::whereNot('id_ber', '=', $id_ber)->orderBy('hits', 'desc')->take(5)->get(),
        'trending_news' => BeritaRed::whereNot('id_ber', '=', $id_ber)->orderBy('hits', 'desc')->take(10)->get(),
        'latest_news_video' => BeritaVid::orderBy('tgl', 'desc')->take(5)->get(),
        'latest_news' => Inertia::scroll(
            fn() => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('tgl', 'desc')->paginate(8)
        ),
    ]);
})->name('read-news');

Route::get('/about-us', function () {
    return Inertia::render('about-us', [
        'popular_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('hits', 'desc')->take(5)->get(),
    ]);
})->name('about-us');

Route::get('/pedoman-media-siber', function () {
    return Inertia::render('pedoman-media-siber', [
        'popular_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('hits', 'desc')->take(5)->get(),
    ]);
})->name('pedoman-media-siber');

Route::get('/disclaimer', function () {
    return Inertia::render('disclaimer', [
        'popular_news' => BeritaRed::whereNot('id_ber', '=', 69)->orderBy('hits', 'desc')->take(5)->get(),
    ]);
})->name('disclaimer');
