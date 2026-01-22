<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriRubrik extends Model
{
    protected $table = 'kategori_rubrik';
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'kategori',
        'rubrik',
    ];
}
