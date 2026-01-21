<?php

namespace App\Filament\Resources\Profils\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Date;
use App\Models\KategoriRubrik;
use App\Models\User;
use Filament\Forms\Components\Field;

class ProfilForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make([
                    'sm' => 3,
                    'xl' => 6,
                    '2xl' => 8,
                ])->schema([
                    FileUpload::make('foto_user')
                        ->label('Foto User')
                        ->required()
                        ->image()
                        ->imageEditor()
                        ->circleCropper()
                        ->disk('public')
                        ->columnStart([
                            'sm' => 2,
                            'xl' => 3,
                            '2xl' => 4,
                        ])
                        ->columnSpan([
                            'sm' => 1,
                            'xl' => 2,
                            '2xl' => 2,
                        ])
                        ->visibility('public')
                        ->imageCropAspectRatio('1:1')
                        ->directory('avatar')
                        ->maxSize(2048)
                        ->helperText('Maksimal ukuran file 2 MB.'),
                ])->columnSpanFull(),
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
                                ->required()
                                ->email(),
                            TextInput::make('nohp')
                                ->required()
                                ->label('No. HP'),
                        ])->columns(2),
                        TextArea::make('alamat')
                            ->required(),
                    ])->columns(1)->columnSpan(2),
                    Group::make([
                        Section::make('Password')->schema([
                            TextInput::make('password')
                                ->password()
                                ->columnSpanFull()
                                ->revealable(),
                            TextInput::make('konfirmasi_password')
                                ->password()
                                ->columnSpanFull()
                                ->revealable(),
                        ])->columns(1)->collapsed(),
                    ])->columnSpan(1),
                ])->columns(3)->columnSpanFull(),
            ]);
    }
}
