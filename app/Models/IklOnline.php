<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class IklOnline
 * 
 * @property int $id_ikl
 * @property string $title_ikl
 * @property string $link
 * @property string $img_ikl
 * @property string $ktg_ikl
 * @property string $posisi
 * @property string $status
 * @property string $admin
 * @property string $pemasang
 * @property Carbon $tgl
 * @property Carbon $jam
 * @property string $ket
 *
 * @package App\Models
 */
class IklOnline extends Model
{
	protected $table = 'ikl_online';
	protected $primaryKey = 'id_ikl';
	public $timestamps = false;

	protected $fillable = [
		'title_ikl',
		'link',
		'img_ikl',
		'ktg_ikl',
		'posisi',
		'status',
		'admin',
		'pemasang',
		'tgl',
		'exp_tgl',
		'ket'
	];
}
