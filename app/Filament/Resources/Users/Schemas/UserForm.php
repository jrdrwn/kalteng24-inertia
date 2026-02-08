<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Date;
use App\Models\KategoriRubrik;
use App\Models\User;
use Filament\Forms\Components\Field;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make([
                    Section::make()->schema([
                        Fieldset::make('Nama User')->schema([
                            TextInput::make('nama')
                                ->label('Nama Depan')
                                ->required(),
                            TextInput::make('nm_blg')
                                ->label('Nama Belakang')
                                ->required(),
                        ])->columns(2),
                        Group::make([
                            TextInput::make('username')
                                ->disabled(fn(string $operation): bool => $operation === 'edit')
                                ->required(),
                            Select::make('role')
                                ->options([
                                    'Administrator' => 'Administrator',
                                    'Wartawan' => 'Wartawan',
                                ])
                                ->required(),
                        ])->columns(2),
                        Group::make()->schema([
                            TextInput::make('email')
                                ->label('Email address')
                                ->email(),
                            TextInput::make('nohp')
                                ->label('No. HP'),
                        ])->columns(2),
                        TextArea::make('alamat'),
                    ])->columns(1)->columnSpan(2),
                    Group::make([
                        FileUpload::make('foto_user')
                            ->label('Foto User')
                            ->image()
                            ->imageEditor()
                            ->circleCropper()
                            ->disk('public')
                            ->visibility('public')
                            ->imageCropAspectRatio('1:1')
                            ->directory('avatar')
                            ->maxSize(2048)
                            ->helperText('Maksimal ukuran file 2 MB.'),
                        Section::make(fn($livewire) => $livewire instanceof \App\Filament\Resources\Users\Pages\EditUser ? 'Ubah Password' : 'Password')->schema([
                            TextInput::make('password')
                                ->password()
                                ->required(fn($livewire) => $livewire instanceof \App\Filament\Resources\Users\Pages\CreateUser)
                                ->columnSpanFull()
                                ->revealable(),
                            TextInput::make('konfirmasi_password')
                                ->password()
                                ->required(fn($livewire) => $livewire instanceof \App\Filament\Resources\Users\Pages\CreateUser)
                                ->columnSpanFull()
                                ->revealable(),
                        ])->columns(1)->collapsed(fn($livewire) => $livewire instanceof \App\Filament\Resources\Users\Pages\EditUser),
                    ])->columnSpan(1),
                ])->columns(3)->columnSpanFull(),
            ]);
    }
}
