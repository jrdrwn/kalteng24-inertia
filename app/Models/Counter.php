<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Counter
 * 
 * @property int $id
 * @property Carbon $tanggal
 * @property string $ip
 * @property string $hits
 * @property string $online
 *
 * @package App\Models
 */
class Counter extends Model
{
	protected $table = 'counter';
	public $timestamps = false;

	protected $casts = [
		'tanggal' => 'datetime'
	];

	protected $fillable = [
		'tanggal',
		'ip',
		'hits',
		'online'
	];
}
