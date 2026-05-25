<?php

namespace App\Filament\Resources\Configs\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TagsInput;

class ConfigForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make()
                    ->tabs([
                        Tab::make('Identitas Website')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Title Media')
                                            ->required(),
                                        TextInput::make('coppyright')
                                            ->required(),
                                        TextInput::make('link_coppy')
                                            ->label('Link Coppyright')
                                            ->required(),
                                        TextInput::make('motho')
                                            ->required(),
                                        TextInput::make('wasupport')
                                            ->label('WA Support')
                                            ->required(),
                                        TextInput::make('email')
                                            ->label('Email Support')
                                            ->email()
                                            ->required(),
                                        TextArea::make('alamat')
                                            ->required(),
                                    ])
                                    ->columns(1),
                            ]),
                        Tab::make('Sosial Media')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('fb')
                                            ->label('Facebook')
                                            ->required()
                                            ->columnSpanFull(),
                                        TextInput::make('tw')
                                            ->label('Twitter')
                                            ->required()
                                            ->columnSpanFull(),
                                        TextInput::make('ig')
                                            ->label('Instagram')
                                            ->required()
                                            ->columnSpanFull(),
                                        TextInput::make('yt')
                                            ->label('YouTube')
                                            ->required()
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(1),
                                Section::make('Tags Berita')
                                    ->schema([
                                        TagsInput::make('tags')
                                            ->splitKeys(['Tab', ','])
                                            ->label('Tags Berita')
                                            ->placeholder('Tambah tag')
                                            ->rules([
                                                'min:1',
                                                'max:10',
                                            ])
                                            ->nestedRecursiveRules([
                                                'min:2',
                                                'max:20',
                                            ])
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(1),
                            ]),
                        Tab::make('Konten Halaman')
                            ->schema([
                                Section::make('Tentang Kami')
                                    ->schema([
                                        RichEditor::make('about_us_content')
                                            ->label('Konten Tentang Kami')
                                            ->columnSpanFull()
                                            ->helperText('Tampil di halaman Tentang Kami jika tersedia.'),
                                    ])
                                    ->collapsible()
                                    ->collapsed()
                                    ->columnSpanFull(),
                                Section::make('Disclaimer')
                                    ->schema([
                                        RichEditor::make('disclaimer_content')
                                            ->label('Konten Disclaimer')
                                            ->columnSpanFull()
                                            ->helperText('Tampil di halaman Disclaimer jika tersedia.'),
                                    ])
                                    ->collapsible()
                                    ->collapsed()
                                    ->columnSpanFull(),
                                Section::make('Pedoman Media Siber')
                                    ->schema([
                                        RichEditor::make('pedoman_media_siber_content')
                                            ->label('Konten Pedoman Media Siber')
                                            ->columnSpanFull()
                                            ->helperText('Tampil di halaman Pedoman Media Siber jika tersedia.'),
                                    ])
                                    ->collapsible()
                                    ->collapsed()
                                    ->columnSpanFull(),
                            ])
                            ->columns(1),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
