<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'kalteng24@gmail.com'],
            [
                'nama' => 'Admin',
                'password' => Hash::make('admin123'),
                'nm_blg' => 'Admin',
                'kode_plg' => 'KODE001',
                'email' => 'kalteng24@gmail.com',
                'nohp' => '081234567890',
                'alamat' => 'Jl. Sangga Buana 2 No.18 Palangka Raya',
                'username' => 'admin',
                'role' => 'superadmin',
                'password' => Hash::make('admin123'),
                'level' => 'superadmin',
                'foto_user' => 'default.jpg',
                'status' => 1,
            ]
        );
    }
}
