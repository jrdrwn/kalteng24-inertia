<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Filament\Notifications\Notification;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Remove confirmation field before save
        unset($data['konfirmasi_password']);

        //Hash new password
        $data['password'] = Hash::make($data['password']);

        return $data;
    }

    protected function beforeCreate(): void
    {
        $data = $this->data;

        // Validate confirmation
        if ($data['password'] !== $data['konfirmasi_password']) {
            Notification::make()
                ->title('Konfirmasi password tidak sesuai.')
                ->danger()
                ->send();

            $this->halt();
        }

        $existingUsers = User::where('email', $data['email'])->first();

        if ($existingUsers) {
            Notification::make()
                ->title('Email sudah terdaftar.')
                ->danger()
                ->send();

            $this->halt();
        }
    }
}
