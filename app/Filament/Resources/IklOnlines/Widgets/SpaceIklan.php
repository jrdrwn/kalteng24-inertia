<?php

namespace App\Filament\Resources\IklOnlines\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\IklOnline;

class SpaceIklan extends StatsOverviewWidget
{


    protected function getStats(): array
    {
        $berita = IklOnline::where('ktg_ikl', 'BERITA')->count() . '/' . env('SPACE_BERITA', 0);
        $top = IklOnline::where('ktg_ikl', 'UTAMA')->count() . '/' . env('SPACE_TOP', 0);
        $index = IklOnline::where('ktg_ikl', 'INDEX')->count() . '/' . env('SPACE_INDEX', 0);
        $footer = IklOnline::where('ktg_ikl', 'FOOTER')->count() . '/' . env('SPACE_FOOTER', 0);

        return [
            Stat::make('Space Iklan Berita', $berita)->chart([7, 2, 10, 3, 15, 4, 17])->color('success'),
            Stat::make('Space Iklan Utama', $top)->chart([10, 5, 9, 3, 8, 4, 8])->color('warning'),
            Stat::make('Space Iklan Index', $index)->chart([3, 7, 9, 11, 14,16, 5])->color('danger'),
            Stat::make('Space Iklan Footer', $footer)->chart([10, 5, 6, 3, 10, 4, 10])->color(''),
        ];
    }
}
