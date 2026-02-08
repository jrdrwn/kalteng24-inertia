<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BeritaRed
 *
 * @property int $id_ber
 * @property string $judul
 * @property string $sub_up
 * @property string $sub_judul
 * @property string $tema
 * @property string $text_foto
 * @property string $isi_berita
 * @property string $foto_berita
 * @property int $uk
 * @property string $tp
 * @property string $kategori
 * @property string $jenis_rubrik
 * @property string $rate_view
 * @property int $like_view
 * @property int $unlike_viuew
 * @property string $status
 * @property int $hits
 * @property string $user
 * @property string $hari
 * @property Carbon $tgl
 * @property Carbon $jam
 *
 * @package App\Models
 */
class BeritaRed extends Model
{
	protected $table = 'berita_red';
	protected $primaryKey = 'id_ber';
	public $timestamps = false;

	protected $casts = [
		'uk' => 'int',
		'like_view' => 'int',
		'unlike_viuew' => 'int',
		'hits' => 'int',
		'tgl' => 'date',
        'jam' => 'datetime'
	];

	protected $fillable = [
		'judul',
		'sub_up',
		'sub_judul',
		'tema',
		'text_foto',
		'isi_berita',
		'foto_berita',
		'uk',
		'tp',
		'kategori',
		'jenis_rubrik',
		'rate_view',
		'like_view',
		'unlike_viuew',
		'status',
		'hits',
		'user',
		'hari',
		'tgl',
		'jam'
	];

    public function scopeExcludeHitway($query)
    {
        return $query->where('id_ber', '!=', 69);
    }
}
