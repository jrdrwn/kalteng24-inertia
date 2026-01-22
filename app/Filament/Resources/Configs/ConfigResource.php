<?php

namespace App\Filament\Resources\Configs;

use App\Filament\Resources\Configs\Pages\CreateConfig;
use App\Filament\Resources\Configs\Pages\EditConfig;
use App\Filament\Resources\Configs\Pages\ListConfigs;
use App\Filament\Resources\Configs\Schemas\ConfigForm;
use App\Filament\Resources\Configs\Tables\ConfigsTable;
use App\Models\Config;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class ConfigResource extends Resource
{
    protected static ?string $model = Config::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan';

    protected static ?string $navigationLabel = 'Configurasi Website';

    protected static ?string $label = 'Configurasi Website';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ConfigForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ConfigsTable::configure($table);
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
            'index' => ListConfigs::route('/'),
            'create' => CreateConfig::route('/create'),
            'edit' => EditConfig::route('/{record}/edit'),
        ];
    }

    public static function canAccess(): bool
    {
        $user = Auth::user();

        return $user && $user->role === 'Administrator';
    }
}
