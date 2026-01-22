<?php

namespace App\Filament\Resources\IklOnlines\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\DatePicker;
use Nette\Utils\Image;

class IklOnlinesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('img_ikl')
                    ->label('Foto Iklan')
                    ->imageHeight(64)
                    ->disk('public')
                    ->defaultImageUrl('https://kalteng24.com/no-image.png')
                    ->square(),
                TextColumn::make('title_ikl')
                    ->label('Judul Iklan')
                    ->searchable(),
                TextColumn::make('ktg_ikl')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->label('Kategori')
                    ->searchable(),
                TextColumn::make('posisi')
                    ->label('Posisi')
                    ->searchable(),
                IconColumn::make('status')
                    ->label('Status')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->trueIcon(Heroicon::OutlinedCheckCircle)
                    ->falseIcon(Heroicon::OutlinedXCircle)
                    ->searchable(),
                TextColumn::make('admin')
                    ->label('Admin')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('pemasang')
                    ->searchable(),
                TextColumn::make('tgl')
                    ->label('Tanggal')
                    ->date()
                    ->sortable(),
                TextColumn::make('jam')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->time()
                    ->sortable(),
            ])
            ->filters([
                Filter::make('tgl')
                    ->schema([
                        DatePicker::make('dipublikasi_dari')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                        DatePicker::make('dipublikasi_sampai')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['dipublikasi_dari'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('tgl', '>=', $date)
                            )
                            ->when(
                                $data['dipublikasi_sampai'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('tgl', '<=', $date)
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];

                        if ($data['dipublikasi_dari'] ?? null) {
                            $indicators['dipublikasi_dari'] = 'Dari ' . date('M d, Y', strtotime($data['dipublikasi_dari']));
                        }

                        if ($data['dipublikasi_sampai'] ?? null) {
                            $indicators['dipublikasi_sampai'] = 'Sampai ' . date('M d, Y', strtotime($data['dipublikasi_sampai']));
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
