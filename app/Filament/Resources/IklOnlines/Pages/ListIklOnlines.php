<?php

namespace App\Filament\Resources\IklOnlines\Pages;

use App\Filament\Resources\IklOnlines\IklOnlineResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Tabs;
use App\Filament\Resources\IklOnlines\Widgets\SpaceIklan;
use Illuminate\Database\Eloquent\Builder;
use App\Models\IklOnline;

class ListIklOnlines extends ListRecords
{
    protected static string $resource = IklOnlineResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            SpaceIklan::class,
        ];
    }

    public function getTabs(): array
    {
        $now = now();
        $threeDays = $now->copy()->addDays(3);

        $counts = IklOnline::selectRaw("
            SUM(CASE WHEN exp_tgl >= ? THEN 1 ELSE 0 END) as aktif,
            SUM(CASE WHEN exp_tgl BETWEEN ? AND ? THEN 1 ELSE 0 END) as sisa3,
            SUM(CASE WHEN exp_tgl < ? THEN 1 ELSE 0 END) as expired
        ", [$now, $now, $threeDays, $now,])->first();

        return [

            'Aktif' => Tab::make()
                ->query(
                    fn(Builder $query) => $query->where('exp_tgl', '>=', $now)
                )
                ->default(true)
                ->badge($counts->aktif ?? 0),

            'Sisa ≤3 Hari' => Tab::make()
                ->query(
                    fn(Builder $query) => $query->whereBetween('exp_tgl', [$now, $threeDays])
                )
                ->badgeColor(
                    function () use ($counts) {
                        if ($counts->sisa3 == 0) return 'gray';

                        return 'warning';
                    }
                )
                ->badge($counts->sisa3 ?? 0),

            'Expired' => Tab::make()
                ->query(
                    fn(Builder $query) => $query->where('exp_tgl', '<', $now)
                )
                ->badgeColor(function () use ($counts) {
                    if ($counts->expired == 0) return 'gray';

                    return 'danger  ';
                })
                ->badge($counts->expired ?? 0),
        ];
    }
}
