<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BeritaVid
 * 
 * @property int $id_vid
 * @property string $judul_vid
 * @property string $link
 * @property string $text_vid
 * @property string $kategori
 * @property string $status
 * @property string $tgl
 * @property string $jam
 * @property string $admin
 *
 * @package App\Models
 */
class BeritaVid extends Model
{
	protected $table = 'berita_vid';
	protected $primaryKey = 'id_vid';
	public $timestamps = false;

	protected $fillable = [
		'judul_vid',
		'link',
		'text_vid',
		'kategori',
		'status',
		'tgl',
		'jam',
		'admin'
	];
}
