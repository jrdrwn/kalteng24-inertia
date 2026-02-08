<?php

namespace App\Filament\Resources\KategoriRubriks;

use App\Filament\Resources\KategoriRubriks\Pages\ManageKategoriRubriks;
use App\Models\KategoriRubrik;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class KategoriRubrikResource extends Resource
{
    protected static ?string $model = KategoriRubrik::class;

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedTag;
    
    protected static ?string $recordTitleAttribute = 'kategori';

    protected static ?string $label = 'Kategori & Rubrik';

    protected static ?string $navigationLabel = 'Kategori & Rubrik';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('kategori')
                    ->required()
                    ->datalist(function () {
                        return KategoriRubrik::query()
                            ->distinct('kategori')
                            ->orderBy('kategori')
                            ->pluck('kategori')
                            ->toArray();
                    }),
                TextInput::make('rubrik')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('kategori')
            ->columns([
                TextColumn::make('kategori')
                    ->searchable(),
                TextColumn::make('rubrik')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->options(function () {
                        return KategoriRubrik::query()
                            ->distinct('kategori')
                            ->orderBy('kategori')
                            ->pluck('kategori', 'kategori')
                            ->toArray();
                    }),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageKategoriRubriks::route('/'),
        ];
    }
}
