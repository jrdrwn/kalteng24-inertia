<?php

namespace App\Filament\Resources\Configs\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\TagsInput;
use Illuminate\Support\Facades\Date;
use App\Models\KategoriRubrik;
use App\Models\User;

class ConfigForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Flex::make([
                    Group::make([
                        Section::make('')
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
                            ]),
                    ]),
                    Group::make([
                        Section::make('Sosial Media')
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
                            ])->collapsible(),
                        Section::make()
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
                            ])->columns(1),
                    ]),
                ])->from('md')->columnSpanFull(),
            ]);
    }
}
