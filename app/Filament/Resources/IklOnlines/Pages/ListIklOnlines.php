<?php

namespace App\Filament\Resources\IklOnlines\Pages;

use App\Filament\Resources\IklOnlines\IklOnlineResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use App\Filament\Resources\IklOnlines\Widgets\SpaceIklan;
use Illuminate\Database\Eloquent\Builder;

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
        return [
            'Semua' => Tab::make(),
            'UTAMA' => Tab::make()->query(fn(Builder $query) => $query->where('ktg_ikl', 'UTAMA')),
            'BERITA' => Tab::make()->query(fn(Builder $query) => $query->where('ktg_ikl', 'BERITA')),
            'INDEX' => Tab::make()->query(fn(Builder $query) => $query->where('ktg_ikl', 'INDEX')),
            'FOOTER' => Tab::make()->query(fn(Builder $query) => $query->where('ktg_ikl', 'FOOTER')),
        ];
    }
}
