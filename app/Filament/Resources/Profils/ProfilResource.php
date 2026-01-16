<?php

namespace App\Filament\Resources\Profils;

use App\Filament\Resources\Profils\Pages\CreateProfil;
use App\Filament\Resources\Profils\Pages\EditProfil;
use App\Filament\Resources\Profils\Pages\ListProfils;
use App\Filament\Resources\Profils\Schemas\ProfilForm;
use App\Filament\Resources\Profils\Tables\ProfilsTable;
use App\Models\User;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProfilResource extends Resource
{
    protected static ?string $model = User::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserCircle;
    
    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan';

    protected static ?string $recordTitleAttribute = 'nama';

    protected static ?string $label = 'Profil';

    protected static ?string $navigationLabel = 'Profil Pengguna';

    protected static ?int $navigationSort = 6;

    public static function form(Schema $schema): Schema
    {
        return ProfilForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProfilsTable::configure($table);
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
            'index' => ListProfils::route('/'),
            'create' => CreateProfil::route('/create'),
            'edit' => EditProfil::route('/{record}/edit'),
        ];
    }
}
