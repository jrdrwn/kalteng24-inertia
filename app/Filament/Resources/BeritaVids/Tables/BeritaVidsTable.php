<?php

namespace App\Filament\Resources\BeritaVids\Tables;

use Dom\Text;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use App\Filament\Tables\Columns\YoutubePlayerColumn;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\DatePicker;

class BeritaVidsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                YoutubePlayerColumn::make('link')
                    ->label('Video'),
                TextColumn::make('judul_vid')
                    ->label('Judul Video')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                TextColumn::make('tgl')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),
                TextColumn::make('jam')
                    ->label('Jam')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                TextColumn::make('admin')
                    ->label('Penulis')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                IconColumn::make('status')
                    ->label('Status')
                    ->boolean()
                    ->trueColor('danger')
                    ->falseColor('success')
                    ->falseIcon(Heroicon::OutlinedCheckCircle)
                    ->trueIcon(Heroicon::OutlinedXCircle)
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
            ])
            ->modifyQueryUsing(
                fn (Builder $query) => $query->orderBy('tgl', 'DESC')
            )
            ->striped();
    }
}
