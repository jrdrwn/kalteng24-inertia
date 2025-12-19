<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FotoBeritum
 * 
 * @property int $id_foto
 * @property string $judul
 * @property string $foto
 * @property Carbon $tgl
 * @property string $admin
 * @property int $status
 *
 * @package App\Models
 */
class FotoBeritum extends Model
{
	protected $table = 'foto_berita';
	protected $primaryKey = 'id_foto';
	public $timestamps = false;

	protected $casts = [
		'tgl' => 'datetime',
		'status' => 'int'
	];

	protected $fillable = [
		'judul',
		'foto',
		'tgl',
		'admin',
		'status'
	];
}
