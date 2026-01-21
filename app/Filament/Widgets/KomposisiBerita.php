<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\BeritaRed;
use App\Models\KategoriRubrik;

class KomposisiBerita extends ChartWidget
{
    protected ?string $heading = 'Komposisi Berita';

    protected static ?int $sort = 4;

    protected function getData(): array
    {
        // 1. Get all distinct categories
        $categories = KategoriRubrik::query()
            ->select('kategori')
            ->distinct()
            ->pluck('kategori')
            ->filter() // remove null / empty
            ->values();

        // 2. Count berita per category (mixed columns)
        $data = $categories->map(function ($category) {
            return BeritaRed::where(function ($query) use ($category) {
                $query->where('kategori', $category)
                    ->orWhere('jenis_rubrik', $category);
            })->count();
        });

        return [
            'datasets' => [
                [
                    'label' => 'Komposisi Berita',
                    'data' => $data,
                ],
            ],
            'labels' => $categories,
        ];
    }

    protected function getType(): string
    {
        return 'polarArea';
    }
}
