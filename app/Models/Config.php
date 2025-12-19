<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Config
 * 
 * @property int $id_con
 * @property string $title
 * @property string $coppyright
 * @property string $link_coppy
 * @property string $motho
 * @property string $wasupport
 * @property string $email
 * @property string $alamat
 * @property string $ico
 * @property string $logo
 * @property string $fb
 * @property string $tw
 * @property string $ig
 * @property string $yt
 *
 * @package App\Models
 */
class Config extends Model
{
	protected $table = 'config';
	protected $primaryKey = 'id_con';
	public $timestamps = false;

	protected $fillable = [
		'title',
		'coppyright',
		'link_coppy',
		'motho',
		'wasupport',
		'email',
		'alamat',
		'ico',
		'logo',
		'fb',
		'tw',
		'ig',
		'yt'
	];
}
