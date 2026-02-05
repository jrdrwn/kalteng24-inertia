<?php

namespace App\Filament\Resources\Beritas\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Support\Facades\Auth;
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
                        Group::make([
                            Select::make('kategori')
                                ->label('Kategori')
                                ->options(KategoriRubrik::query()
                                    ->distinct('kategori')
                                    ->orderBy('kategori')
                                    ->pluck('kategori', 'kategori'))
                                ->reactive()
                                ->preload()
                                ->native(false)
                                ->searchable()
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
                                ->preload()
                                ->native(false)
                                ->searchable()
                                ->required(),
                            TextInput::make('judul')
                                ->label('Judul')
                                ->required()
                                ->maxLength(50),
                            TextInput::make('sub_up')
                                ->label('Sub Judul Atas')
                                ->maxLength(255),
                            TextInput::make('sub_judul')
                                ->label('Sub Judul')
                                ->maxLength(255),
                            Select::make('user')
                                ->label('Penulis')
                                ->options(User::query()->pluck('nama', 'nama'))
                                ->default('Admin')
                                ->native(false)
                                ->searchable()
                                ->required(),
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
                                    ->required()
                                    ->maxLength(255),
                            ])->columns(1),
                            Fieldset::make('Waktu Upload Berita')->schema([
                                DatePicker::make('tgl')
                                    ->label('Tanggal')
                                    ->default(Date::now())
                                    ->required(),
                                TimePicker::make('jam')
                                    ->label('Jam')
                                    ->default(date('H:i:s')),
                            ])->columns(2),

                        ])
                    ])->columns(2),
                ])->from('md')->columns(1)->columnSpanFull(),

                RichEditor::make('isi_berita')
                    ->label('Isi Berita')
                    ->required()
                    ->fileAttachmentsDirectory('attachments')
                    ->fileAttachmentsVisibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
