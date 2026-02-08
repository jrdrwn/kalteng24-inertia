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
use Filament\Tables\Enums\FiltersLayout;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Illuminate\Support\Carbon;
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
                TextColumn::make('admin')
                    ->label('Admin')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('pemasang')
                    ->searchable(),
                TextColumn::make('sisa_waktu')
                    ->label('Sisa Waktu')
                    ->state(function ($record) {
                        if (!$record->exp_tgl) {
                            return '-';
                        }

                        $exp = \Carbon\Carbon::parse($record->exp_tgl);

                        if ($exp->isPast()) {
                            return 'Kadaluarsa';
                        }

                        return $exp->diffForHumans(
                            now(),
                            [
                                'syntax' => \Carbon\CarbonInterface::DIFF_RELATIVE_TO_NOW,
                                'parts' => 1,
                                'short' => false,
                            ]
                        );
                    })
                    ->color(function ($record) {
                        if (!$record->exp_tgl) {
                            return null;
                        }

                        $days = now()->diffInDays($record->exp_tgl, false);

                        if ($days < 0) return 'gray';      // Kadaluarsa
                        if ($days <= 3) return 'danger';   // ≤ 3 hari
                        if ($days <= 7) return 'warning';  // 4–7 hari

                        return 'success';                  // > 7 hari
                    })
                    ->badge(),
                TextColumn::make('exp_tgl')
                    ->label('Exp. Tgl')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                Filter::make('tgl')
                    ->schema([
                        DatePicker::make('dipublikasi_dari')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                        DatePicker::make('dipublikasi_sampai')
                            ->placeholder(fn($state): string => now()->format('M d, Y')),
                        Select::make('ktg_ikl')
                            ->label('Kategori')
                            ->options([
                                'UTAMA' => 'UTAMA',
                                'HEADLINE' => 'HEADLINE',
                                'BERITA' => 'BERITA',
                                'INSIDENTAL' => 'INSIDENTAL',
                                'FOOTER' => 'FOOTER',
                            ])
                    ])
                    ->columns(3)
                    ->columnSpanFull()
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['dipublikasi_dari'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('tgl', '>=', $date)
                            )
                            ->when(
                                $data['dipublikasi_sampai'] ?? null,
                                fn(Builder $query, $date): Builder => $query->whereDate('tgl', '<=', $date)
                            )
                            ->when(
                                $data['ktg_ikl'] ?? null,
                                fn(Builder $query, $ktg_ikl): Builder =>
                                $query->where('ktg_ikl', $ktg_ikl)
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

                        if ($data['ktg_ikl'] ?? null) {
                            $indicators['ktg_ikl'] = 'Kategori: ' . $data['ktg_ikl'];
                        }

                        return $indicators;
                    }),
            ], layout: FiltersLayout::AboveContent)
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
