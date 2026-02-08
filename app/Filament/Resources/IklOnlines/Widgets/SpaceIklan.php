<?php

namespace App\Filament\Resources\IklOnlines\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\IklOnline;

class SpaceIklan extends StatsOverviewWidget
{


    protected function getStats(): array
    {
        $berita = IklOnline::where('ktg_ikl', 'BERITA')->where('exp_tgl', '>=', now())->count() . '/' . env('SPACE_BERITA', 0);
        $top = IklOnline::where('ktg_ikl', 'UTAMA')->where('exp_tgl', '>=', now())->count() . '/' . env('SPACE_TOP', 0);
        $headline = IklOnline::where('ktg_ikl', 'HEADLINE')->where('exp_tgl', '>=', now())->count() . '/' . env('SPACE_HEADLINE', 0);
        $insidental = IklOnline::where('ktg_ikl', 'INSIDENTAL')->where('exp_tgl', '>=', now())->count() . '/' . env('SPACE_INDEX', 0);
        $footer = IklOnline::where('ktg_ikl', 'FOOTER')->where('exp_tgl', '>=', now())->count() . '/' . env('SPACE_FOOTER', 0);
        return [
            
            Stat::make('Space Iklan Utama', $top)->chart([10, 5, 9, 3, 8, 4, 8])->color('warning'),
            Stat::make('Space Iklan Headline', $headline)->chart([5, 10, 6, 8, 4, 12, 7])->color('primary'),
            Stat::make('Space Iklan Berita', $berita)->chart([7, 2, 10, 3, 15, 4, 17])->color('success'),
            Stat::make('Space Iklan Insidental', $insidental)->chart([3, 7, 9, 11, 14,16, 5])->color('danger'),
            Stat::make('Space Iklan Footer', $footer)->chart([10, 5, 6, 3, 10, 4, 10])->color('')->columnSpan(2),
        ];
    }
}
