<?php

namespace App\Filament\Resources\Beritas\Schemas;

use Dom\Text;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Date;
use App\Models\KategoriRubrik;
use App\Models\User;

class BeritaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Flex::make([
                    Section::make([
                        Group::make()->columns(2)->schema([
                            Select::make('kategori')
                                ->label('Kategori')
                                ->options(KategoriRubrik::query()
                                    ->distinct('kategori')
                                    ->orderBy('kategori')
                                    ->pluck('kategori', 'kategori'))
                                ->reactive()
                                ->required(),
                            Select::make('jenis_rubrik')
                                ->label('Rubrik')
                                ->options(function (callable $get) {
                                    $kategori = $get('kategori');
                                    if (!$kategori) {
                                        return [];
                                    }
                                    return KategoriRubrik::query()
                                        ->where('kategori', $kategori)
                                        ->orderBy('rubrik')
                                        ->pluck('rubrik', 'rubrik');
                                })
                                ->reactive()
                                ->required(),
                        ]),
                        TextInput::make('judul')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('sub_up')
                            ->label('Sub Judul Atas')
                            ->maxLength(255),
                        TextInput::make('sub_judul')
                            ->label('Sub Judul')
                            ->maxLength(255),
                        TextInput::make('tema')
                            ->label('Tema')
                            ->maxLength(100),
                    ]),
                    Group::make([
                        Section::make([
                            FileUpload::make('foto_berita')
                                ->label('Foto Berita')
                                ->image()
                                ->imageEditor()
                                ->disk('public')
                                ->visibility('public')
                                ->imageCropAspectRatio('2:1')
                                ->required(),
                            TextInput::make('text_foto')
                                ->label('Keterangan Foto')
                                ->maxLength(255),
                        ])->columns(1),
                        Section::make([
                            DatePicker::make('tgl')
                                ->label('Tanggal')
                                ->default(Date::now())
                                ->required(),
                            TimePicker::make('jam')
                                ->label('Jam')
                                ->default(date('H:i:s')),
                            Select::make('user')
                                ->label('Penulis')
                                ->options(User::query()->pluck('nama', 'nama'))
                                ->required(),
                        ])->columns(1),
                    ])
                ])->from('md')->columns(2)->columnSpanFull(),

                RichEditor::make('isi_berita')
                    ->label('Isi Berita')
                    ->required()
                    ->fileAttachmentsDirectory('attachments')
                    ->fileAttachmentsVisibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
