<?php

namespace App\Filament\Resources\Profils\Pages;

use App\Filament\Resources\Profils\ProfilResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rules\Email;

class ListProfils extends ListRecords
{
    protected static string $resource = ProfilResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function mount(): void
    {
        parent::mount();

        $email = Auth::user()->email;

        $user = User::query()->where('email', $email)->first();

        if ($user) {
            $this->redirect(ProfilResource::getUrl('edit', ['record' => $user]));
        }

    }
}
