<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\BeritaRed;
use App\Models\BeritaVid;
use Carbon\Carbon;

class DashboardStatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $beritaRed = BeritaRed::count();
        $beritaVid = BeritaVid::count();
        $totalBerita = $beritaRed + $beritaVid;

        $beritaThisMonth = BeritaRed::whereMonth('tgl', Carbon::now()->month)
            ->whereYear('tgl', Carbon::now()->year)
            ->count();

        $beritaLastMonth = BeritaRed::whereMonth('tgl', Carbon::now()->subMonth()->month)
            ->whereYear('tgl', Carbon::now()->subMonth()->year)
            ->count();

        $uploadGap = $beritaThisMonth - $beritaLastMonth;
        $uploadGapPercent = $beritaLastMonth > 0 ? ($uploadGap / $beritaLastMonth) * 100 : 0;

        $hitsThisMonth = BeritaRed::whereMonth('tgl', Carbon::now()->month)
            ->whereYear('tgl', Carbon::now()->year)
            ->sum('hits');

        $hitsLastMonth = BeritaRed::whereMonth('tgl', Carbon::now()->subMonth()->month)
            ->whereYear('tgl', Carbon::now()->subMonth()->year)
            ->sum('hits');

        $hitsGap = $hitsThisMonth - $hitsLastMonth;
        $hitsGapPercent = $hitsLastMonth > 0 ? ($hitsGap / $hitsLastMonth) * 100 : 0;

        $totalViews = BeritaRed::sum('hits');
        $hitsThisMonthOnTotalPercent = $totalViews > 0 ? ($hitsThisMonth / $totalViews) * 100 : 0;


        return [
            Stat::make('Berita Terbit Bulan Ini', BeritaRed::whereMonth('tgl', Carbon::now()->month)
                ->whereYear('tgl', Carbon::now()->year)
                ->count())
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->descriptionIcon($uploadGap >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->description(
                    number_format(abs($uploadGapPercent), 2) . '% ' .
                        ($uploadGap >= 0 ? 'increase' : 'decrease')
                )
                ->color($uploadGap >= 0 ? 'success' : 'warning'),
            Stat::make('Penonton Berita Bulan Ini', number_format(BeritaRed::whereMonth('tgl', Carbon::now()->month)
                ->whereYear('tgl', Carbon::now()->year)
                ->sum('hits')))
                ->descriptionIcon($hitsGap >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->description(
                    number_format(abs($hitsGapPercent), 2) . '% ' .
                        ($hitsGap >= 0 ? 'increase' : 'decrease')
                )
                ->chart([10, 5, 9, 3, 8, 4, 8])
                ->color($hitsGap >= 0 ? 'success' : 'danger'),
            Stat::make('Total Views', number_format(BeritaRed::sum('hits')))
                ->description(number_format($hitsThisMonthOnTotalPercent, 2) . '% up this month')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([3, 7, 9, 11, 14, 16, 5])
        ];
    }
}
