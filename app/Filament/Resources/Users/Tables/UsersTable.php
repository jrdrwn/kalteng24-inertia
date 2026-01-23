<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\DatePicker;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto_user')
                    ->label('Foto')
                    ->disk('public')
                    ->defaultImageUrl(env('DEFAULT_AVATAR'))
                    ->circular(),
                TextColumn::make('nama')
                    ->searchable(),
                TextColumn::make('nm_blg')
                    ->label('Nama Belakang')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('nohp')
                    ->label('No. HP')
                    ->searchable(),
                TextColumn::make('alamat')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('role')
                    ->searchable(),
                IconColumn::make('status')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon(Heroicon::OutlinedCheckCircle)
                    ->falseIcon(Heroicon::OutlinedXCircle)
                    ->trueColor('success')
                    ->falseColor('danger'),
                TextColumn::make('timestamp')
                    ->label('Tanggal Bergabung')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Filter::make('tgl')
                    ->schema([
                        DatePicker::make('bergabung_dari')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                        DatePicker::make('bergabung_sampai')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                        Select::make('role')
                            ->label('Role')
                            ->options([
                                'Administrator' => 'Administrator',
                                'Wartawan' => 'Wartawan',
                            ])
                            ->placeholder('Pilih Role'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['bergabung_dari'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('timestamp', '>=', $date)
                            )
                            ->when(
                                $data['bergabung_sampai'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('timestamp', '<=', $date)
                            )
                            ->when(
                                $data['role'] ?? null,
                                fn(Builder $query, $role): Builder =>
                                $query->where('role', $role)
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];

                        if ($data['bergabung_dari'] ?? null) {
                            $indicators['bergabung_dari'] = 'Dari ' . date('M d, Y', strtotime($data['bergabung_dari']));
                        }

                        if ($data['bergabung_sampai'] ?? null) {
                            $indicators['bergabung_sampai'] = 'Sampai ' . date('M d, Y', strtotime($data['bergabung_sampai']));
                        }

                        if ($data['role'] ?? null) {
                            $indicators['role'] = 'Role: ' . $data['role'];
                        }

                        return $indicators;
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
}
