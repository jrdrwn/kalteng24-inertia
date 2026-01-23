<?php

namespace App\Filament\Resources\Configs\Pages;

use App\Filament\Resources\Configs\ConfigResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions\CreateAction;
use App\Models\Config;

class ListConfigs extends ListRecords
{
    protected static string $resource = ConfigResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function mount(): void
    {
        parent::mount();

        $record = Config::first();

        if ($record) {
            $this->redirect(ConfigResource::getUrl('edit', ['record' => $record]));
        }
    }
}
