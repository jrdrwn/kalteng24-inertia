<?php

namespace App\Filament\Resources\BeritaVids\Pages;

use App\Filament\Resources\BeritaVids\BeritaVidResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBeritaVids extends ListRecords
{
    protected static string $resource = BeritaVidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
