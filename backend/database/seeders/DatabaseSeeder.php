<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory(9)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@mail.com',
        ]);
    }
}
