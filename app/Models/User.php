<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $id_user
 * @property string $nama
 * @property string $nm_blg
 * @property string $kode_plg
 * @property string $email
 * @property string $nohp
 * @property string $alamat
 * @property string $pendaftaran
 * @property string $username
 * @property string $password
 * @property string $level
 * @property string $admin_type
 * @property string $foto_user
 * @property string $status
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';
	protected $primaryKey = 'id_user';
	public $timestamps = false;

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'nama',
		'nm_blg',
		'kode_plg',
		'email',
		'nohp',
		'alamat',
		'pendaftaran',
		'username',
		'password',
		'level',
		'admin_type',
		'foto_user',
		'status'
	];
}
