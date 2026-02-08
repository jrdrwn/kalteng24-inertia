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
use App\Models\IklOnline;
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
                            ->reactive()
                            ->afterStateUpdated(function (callable $set) {
                                $set('posisi', null);
                            })
                            ->required()
                            ->options(function (?IklOnline $record) {

                                $spaces = [
                                    'UTAMA'      => env('SPACE_TOP', 5),
                                    'BERITA'     => env('SPACE_BERITA', 3),
                                    'HEADLINE'   => env('SPACE_HEADLINE', 5),
                                    'INSIDENTAL' => env('SPACE_INDEX', 30),
                                    'FOOTER'     => env('SPACE_FOOTER', 5),
                                ];

                                // 🔥 Single query
                                $counts = IklOnline::where('exp_tgl', '>=', now())
                                    ->selectRaw('ktg_ikl, COUNT(*) as total')
                                    ->groupBy('ktg_ikl')
                                    ->pluck('total', 'ktg_ikl')
                                    ->toArray();

                                $available = [];

                                foreach ($spaces as $kategori => $limit) {
                                    $current = $counts[$kategori] ?? 0;

                                    // 🔥 If editing and this is the current category, allow it
                                    if ($record && $record->ktg_ikl === $kategori) {
                                        $available[$kategori] = $kategori;
                                        continue;
                                    }

                                    if ($current < $limit) {
                                        $available[$kategori] = $kategori;
                                    }
                                }

                                return $available;
                            }),

                        Select::make('posisi')
                            ->label('Posisi')
                            ->native(false)
                            ->required()
                            ->disabled(fn(Get $get) => !$get('ktg_ikl'))
                            ->options(function (Get $get,  ?IklOnline $record) {
                                if ($get('ktg_ikl') !== 'BERITA') {
                                    return match ($get('ktg_ikl')) {
                                        'UTAMA' => [
                                            'UTAMA - 5:1' => 'UTAMA - 5:1',
                                        ],
                                        'HEADLINE' => [
                                            'HEADLINE - 5:1' => 'HEADLINE - 5:1',
                                        ],
                                        'INSIDENTAL' => [
                                            'INSIDENTAL - 16:9' => 'INSIDENTAL - 16:9',
                                        ],
                                        'FOOTER' => [
                                            'FOOTER - 5:1' => 'FOOTER - 5:1',
                                        ],
                                        default => [],
                                    };
                                }

                                $positions = [
                                    'KIRI BERITA - 1:3',
                                    'KANAN BERITA - 16:9',
                                    'DIBAWAH BERITA - 3:1',
                                ];

                                // 🔥 Single query for berita positions
                                $counts = IklOnline::where('ktg_ikl', 'BERITA')
                                    ->where('exp_tgl', '>=', now())
                                    ->selectRaw('posisi, COUNT(*) as total')
                                    ->groupBy('posisi')
                                    ->pluck('total', 'posisi')
                                    ->toArray();

                                $available = [];

                                foreach ($positions as $posisi) {
                                    $current = $counts[$posisi] ?? 0;

                                    // 🔥 Allow if this is the current record position
                                    if ($record && $record->posisi === $posisi) {
                                        $available[$posisi] = $posisi;
                                        continue;
                                    }

                                    if ($current < 1) {
                                        $available[$posisi] = $posisi;
                                    }
                                }

                                return $available;
                            }),
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
                                    '5:1',
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
