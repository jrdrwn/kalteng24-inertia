<?php

namespace App\Filament\Resources\BeritaVids;

use App\Filament\Resources\BeritaVids\Pages\CreateBeritaVid;
use App\Filament\Resources\BeritaVids\Pages\EditBeritaVid;
use App\Filament\Resources\BeritaVids\Pages\ListBeritaVids;
use App\Filament\Resources\BeritaVids\Schemas\BeritaVidForm;
use App\Filament\Resources\BeritaVids\Tables\BeritaVidsTable;
use BackedEnum;
use UnitEnum;
use App\Models\BeritaVid;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BeritaVidResource extends Resource
{
    protected static ?string $model = BeritaVid::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedFilm;

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Berita Video';

    protected static ?string $label = 'Berita Video';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'judul_vid';

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function form(Schema $schema): Schema
    {
        return BeritaVidForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BeritaVidsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBeritaVids::route('/'),
            'create' => CreateBeritaVid::route('/create'),
            'edit' => EditBeritaVid::route('/{record}/edit'),
        ];
    }
}
