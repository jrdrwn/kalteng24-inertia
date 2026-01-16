<?php

namespace App\Filament\Resources\Profils\Pages;

use App\Filament\Resources\Profils\ProfilResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class EditProfil extends EditRecord
{
    protected static string $resource = ProfilResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // If password not filled, remove both fields
        if (empty($data['password'])) {
            unset($data['password'], $data['konfirmasi_password']);
        }

        return $data;
    }

    protected function beforeSave(): void
    {
        $data = $this->data;

        if ($data['password'] && $data['password'] !== $data['konfirmasi_password']) {
            Notification::make()
                ->title('Konfirmasi password tidak sesuai.')
                ->danger()
                ->send();

            $this->halt();
        }

        if ($data['password']) {
            // Remove confirmation field before save
            unset($data['konfirmasi_password']);

            //Hash new password
            $data['password'] = Hash::make($data['password']);
        }

        $userId = Auth::user()->id_user;
        $userEmail = $data['email'];

        $existingEmail = User::query()->where('email', $userEmail)->first();

        if ($existingEmail && $existingEmail->id_user !== $userId) {
            Notification::make()
                ->title('Email sudah terdaftar.')
                ->danger()
                ->send();

            $this->halt();
        }
    }
}
