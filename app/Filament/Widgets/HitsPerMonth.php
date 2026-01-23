<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\BeritaRed;

class HitsPerMonth extends ChartWidget
{
    protected ?string $heading = 'Views Per Bulan';

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $months = collect(range(0, 11))
            ->map(fn($i) => now()->subMonths(11 - $i));

        $labels = $months->map(fn($date) => $date->format('M Y'));

        $data = $months->map(function ($date) {
            return BeritaRed::whereYear('tgl', $date->year)
                ->whereMonth('tgl', $date->month)
                ->sum('hits');
        });

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Views',
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
