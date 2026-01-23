<?php

namespace App\Filament\Resources\IklOnlines\Pages;

use App\Filament\Resources\IklOnlines\IklOnlineResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIklOnline extends EditRecord
{
    protected static string $resource = IklOnlineResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
