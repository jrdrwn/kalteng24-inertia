<?php

namespace App\Filament\Resources\BeritaVids\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use App\Filament\Forms\Components\YoutubePlayer;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Date;
use App\Models\User;

class BeritaVidForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Flex::make([
                    Section::make([
                        TextInput::make('judul_vid')
                            ->label('Judul Video')
                            ->required()
                            ->maxLength(255),
                        Select::make('kategori')
                            ->label('Kategori')
                            ->options([
                                'Berita' => 'Berita',
                                'Olahraga' => 'Olahraga',
                                'Hiburan' => 'Hiburan',
                                'Teknologi' => 'Teknologi',
                                'Lifestyle' => 'Lifestyle',
                            ])
                            ->native(false)
                            ->searchable()
                            ->required(),
                        DatePicker::make('tgl')
                            ->label('Tanggal Publikasi')
                            ->default(Date::now())
                            ->required(),
                        TimePicker::make('jam')
                            ->label('Jam Publikasi')
                            ->default(date('H:i:s'))
                            ->required(),
                        Select::make('admin')
                            ->label('Penulis')
                            ->options(User::query()->pluck('nama', 'nama'))
                            ->native(false)
                            ->searchable()
                            ->required(),
                    ])->columns(1),
                    Section::make([
                        TextInput::make('link')
                            ->label('Link YouTube')
                            ->required()
                            ->reactive()
                            ->maxLength(255),
                        YoutubePlayer::make('link')
                            ->label('Youtube Preview')
                            ->reactive()
                            ->columnSpanFull(),
                    ])->columns(1),
                ])->from('md')->columns(2)->columnSpanFull(),
            ]);
    }
}
