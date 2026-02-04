<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;

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
class User extends Authenticatable implements HasName, FilamentUser
{
	use HasFactory;
	use Notifiable;

	public function getFilamentName(): string
	{
		return $this->nama ?: ('User ' . $this->getKey());
	}

	protected $table = 'users_new';
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
		'role',
		'password',
		'level',
		'admin_type',
		'foto_user',
		'status',
		'timestamp'
	];

	protected $casts = [
		'timestamp' => 'datetime',
		'status' => 'boolean',
	];

	public function canAccessPanel(Panel $panel): bool
    {
        return $this->role;
    }
}
