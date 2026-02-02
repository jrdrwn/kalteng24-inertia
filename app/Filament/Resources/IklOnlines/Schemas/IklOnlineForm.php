<?php

namespace App\Filament\Resources\IklOnlines\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Date;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Components\Utilities\Get;
use App\Models\User;

class IklOnlineForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Flex::make([
                    Section::make([
                        TextInput::make('title_ikl')
                            ->label('Judul Iklan')
                            ->required(),
                        TextInput::make('link')
                            ->required()
                            ->columnSpanFull(),
                        Select::make('ktg_ikl')
                            ->label('Kategori')
                            ->native(false)
                            ->options([
                                'UTAMA' => 'UTAMA',
                                'BERITA' => 'BERITA',
                                'HEADLINE' => 'HEADLINE',
                                'INSIDENTAL' => 'INSIDENTAL',
                                'FOOTER' => 'FOOTER',
                            ])
                            ->reactive()
                            ->required(),
                        Select::make('posisi')
                            ->label('Posisi')
                            ->native(false)
                            ->required()
                            ->options(function (Get $get) {
                                return match ($get('ktg_ikl')) {
                                    'UTAMA', 'HEADLINE' => [
                                        'UTAMA & HEADLINE - 3:1' => 'UTAMA & HEADLINE - 3:1',
                                    ],

                                    'BERITA' => [
                                        'KIRI BERITA - 1:3' => 'KIRI BERITA - 1:3',
                                        'KANAN BERITA - 16:9' => 'KANAN BERITA - 16:9',
                                        'DIBAWAH BERITA - 3:1' => 'DIBAWAH BERITA - 3:1',
                                    ],

                                    'INSIDENTAL' => [
                                        'INSIDENTAL - 16:9' => 'INSIDENTAL - 16:9',
                                    ],

                                    'FOOTER' => [
                                        'FOOTER - 3:1' => 'FOOTER - 3:1',
                                    ],

                                    default => [],
                                };
                            })
                            ->disabled(fn(Get $get) => blank($get('ktg_ikl')))
                            ->reactive()
                            ->required(),
                        Select::make('admin')
                            ->label('User')
                            ->options(User::query()->pluck('nama', 'nama'))
                            ->native(false)
                            ->searchable()
                            ->required(),
                        TextInput::make('pemasang')
                            ->required(),
                        Hidden::make('tgl')
                            ->default(Date::now()),
                        DateTimePicker::make('exp_tgl')
                            ->label('Tanggal Expired')
                            ->required(),
                    ]),
                    Group::make([
                        Section::make('Foto Iklan')->schema([
                            FileUpload::make('img_ikl')
                                ->hiddenLabel()
                                ->imageEditor()
                                ->image()
                                ->disk('public')
                                ->maxSize(5024)
                                ->visibility('public')
                                ->directory('ikl_online')
                                ->imageEditorAspectRatios([
                                    '3:1',
                                    '16:9',
                                    '1:3',
                                ])
                                ->required(),
                        ])->description('Gunakan Rasio yang Sesuai dengan Posisi Iklan'),
                        Textarea::make('ket')
                            ->label('Keterangan Iklan')
                            ->required()
                            ->columnSpanFull(),
                    ]),
                ])->columnSpanFull()->from('md'),
            ]);
    }
}
