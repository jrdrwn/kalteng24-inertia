<?php

namespace App\Filament\Resources\IklOnlines;

use App\Filament\Resources\IklOnlines\Pages\CreateIklOnline;
use App\Filament\Resources\IklOnlines\Pages\EditIklOnline;
use App\Filament\Resources\IklOnlines\Pages\ListIklOnlines;
use App\Filament\Resources\IklOnlines\Schemas\IklOnlineForm;
use App\Filament\Resources\IklOnlines\Tables\IklOnlinesTable;
use App\Filament\Resources\IklOnlines\Widgets\SpaceIklan;
use App\Models\IklOnline;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class IklOnlineResource extends Resource
{
    protected static ?string $model = IklOnline::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBanknotes;
    
    protected static string|UnitEnum|null $navigationGroup = 'Content';
    
    protected static ?string $recordTitleAttribute = 'title_ikl';
    
    protected static ?string $navigationLabel = 'Iklan Online';
    
    protected static ?string $label = 'Iklan Online';
    
    protected static ?int $navigationSort = 2;
    
    public static function getWidgets(): array
    {
        return [
            SpaceIklan::class,
        ];
    }
    
    public static function form(Schema $schema): Schema
    {
        return IklOnlineForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return IklOnlinesTable::configure($table);
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
            'index' => ListIklOnlines::route('/'),
            'create' => CreateIklOnline::route('/create'),
            'edit' => EditIklOnline::route('/{record}/edit'),
        ];
    }

}
