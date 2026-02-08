<?php

namespace App\Filament\Resources\KategoriRubriks\Pages;

use App\Filament\Resources\KategoriRubriks\KategoriRubrikResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageKategoriRubriks extends ManageRecords
{
    protected static string $resource = KategoriRubrikResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
