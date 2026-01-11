<?php

namespace App\Filament\Resources\BeritaVids\Pages;

use App\Filament\Resources\BeritaVids\BeritaVidResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBeritaVid extends EditRecord
{
    protected static string $resource = BeritaVidResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
