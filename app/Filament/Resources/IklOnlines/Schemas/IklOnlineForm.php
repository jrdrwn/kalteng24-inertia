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
use Filament\Forms\Components\DatePicker;
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
                                'INDEX' => 'INDEX',
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
                                        'UTAMA & HEADLINE - LANDSCAPE' => 'UTAMA & HEADLINE - LANDSCAPE',
                                    ],

                                    'BERITA' => [
                                        'KIRI BERITA - VERTIKAL' => 'KIRI BERITA - VERTIKAL',
                                        'KANAN BERITA - LANDSCAPE' => 'KANAN BERITA - LANDSCAPE',
                                        'KANAN BERITA - VERTIKAL' => 'KANAN BERITA - VERTIKAL',
                                    ],

                                    'INDEX' => [
                                        'INDEX KIRI - VERTIKAL' => 'INDEX KIRI - VERTIKAL',
                                        'INDEX KANAN - VERTIKAL' => 'INDEX KANAN - VERTIKAL',
                                        'INDEX KANAN - LANDSCAPE' => 'INDEX KANAN - LANDSCAPE',
                                    ],

                                    'FOOTER' => [
                                        'FOOTER' => 'FOOTER',
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
                        Hidden::make('jam')
                            ->default(Date::now())
                            ->hidden(true)
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
                                    '9:16',
                                    '1:3',
                                ])
                                ->required(),
                        ])->description('Jika iklan potrait gunakan ratio 1:3 atau 9:16, jika landscape gunakan ratio 3:1. Untuk hasil terbaik gunakan gambar resolusi minimal 600px x 200px.'),
                        Textarea::make('ket')
                            ->label('Keterangan Iklan')
                            ->required()
                            ->columnSpanFull(),
                    ]),
                ])->columnSpanFull()->from('md'),
            ]);
    }
}
