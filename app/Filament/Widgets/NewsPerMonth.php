<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\BeritaRed;
use Carbon\Carbon;

class NewsPerMonth extends ChartWidget
{
    protected ?string $heading = 'Berita Per Bulan';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $months = collect(range(0, 11))
            ->map(fn($i) => now()->subMonths(11 - $i));

        $labels = $months->map(fn($date) => $date->format('M Y'));

        $data = $months->map(function ($date) {
            return BeritaRed::whereYear('tgl', $date->year)
                ->whereMonth('tgl', $date->month)
                ->count();
        });

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Berita',
                    'data' => $data,
                    'fill' => 'start',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
