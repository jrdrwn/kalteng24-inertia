<?php

namespace App\Filament\Widgets;

use App\Models\BeritaRed;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Actions\Action;
use App\Filament\Resources\Beritas\BeritaResource;

class LatestNews extends TableWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 4;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                fn(): Builder => BeritaRed::query()
                    ->orderBy('tgl', 'desc')
            )
            ->columns([
                ImageColumn::make('foto_berita')
                    ->label('Foto')
                    ->imageHeight(64)
                    ->disk('public')
                    ->defaultImageUrl(env('DEFAULT_COVER'))
                    ->square(),
                TextColumn::make('judul')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user')
                    ->label('Penulis')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                TextColumn::make('jenis_rubrik')
                    ->label('Rubrik')
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
                TextColumn::make('hits')
                    ->label('Views')
                    ->badge()
                    ->color('primary')
                    ->sortable(),
                // IconColumn::make('status')
                //     ->label('Status')
                //     ->boolean()
                //     ->trueIcon(Heroicon::OutlinedXCircle)
                //     ->falseIcon(Heroicon::OutlinedCheckCircle)
                //     ->falseColor('success')
                //     ->trueColor('danger')
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                Action::make('Edit')
                    ->url(fn (BeritaRed $record): string => BeritaResource::getUrl('edit', ['record' => $record]))
                    ->icon(Heroicon::Pencil),
            ])
            ->defaultPaginationPageOption(5)
            ->toolbarActions([
                BulkActionGroup::make([
                    //
                ]),
            ]);
    }
}
