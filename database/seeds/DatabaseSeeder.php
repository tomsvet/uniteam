<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        //factory(App\User::class, 3)->create();
        /*factory(App\Project::class, 20)->create();
        factory(App\Position::class, 20)->create();*/
        DB::table('position_categories')->insert([
            'name' => 'Architecture',
        ]);
        DB::table('position_categories')->insert([
            'name' => 'Design',
        ]);
        DB::table('position_categories')->insert([
            'name' => 'Economics',
        ]);
        DB::table('position_categories')->insert([
            'name' => 'Programming',
        ]);
        DB::table('position_categories')->insert([
            'name' => 'Network',
        ]);

        DB::table('users')->insert([
            'firstname' => 'Admin',
            'lastname' => 'Admin',
            'type' => 'admin',
            'activate' => '1',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123456'),
        ]);
        DB::table('users')->insert([
            'firstname' => 'Tomas',
            'lastname' => 'Svetlik',
            'type' => 'supervisor',
            'activate' => '1',
            'email' => 'supervisor@supervisor.com',
            'password' => bcrypt('123456'),
        ]);
    }
}
