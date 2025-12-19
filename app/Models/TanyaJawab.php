<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TanyaJawab
 * 
 * @property int $id_tanya
 * @property string $tanya
 * @property string $jawab
 * @property string $hari
 * @property Carbon $tgl
 * @property Carbon $jam
 * @property string $status
 * @property string $admin
 *
 * @package App\Models
 */
class TanyaJawab extends Model
{
	protected $table = 'tanya_jawab';
	protected $primaryKey = 'id_tanya';
	public $timestamps = false;

	protected $casts = [
		'tgl' => 'datetime',
		'jam' => 'datetime'
	];

	protected $fillable = [
		'tanya',
		'jawab',
		'hari',
		'tgl',
		'jam',
		'status',
		'admin'
	];
}
