<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'firstname' => str_random(7),
        'lastname' => str_random(10),
        'email' => $faker->unique()->safeEmail,
        'about' => $faker->text(),
        'faculty' => str_random(4),
        'position' => str_random(7),
        'type' => 'supervisor',
        'email_verified_at' => now(),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Project::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4),
        'description' => $faker->text(),
        'user_id' => rand(1,20),
        'supervisor_id' => 1, 
        'is_completed' => rand(0,1),
        'end'=> $faker->date($format = 'Y-m-d'),
        'created'=> $faker->date($format = 'Y-m-d', $max = 'now'),
    ];
});

$factory->define(App\Position::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(2),
        'description' => $faker->text(),
        'fee'=>'nic',
        'user_id' => rand(1,20),
        'project_id' => rand(1,20), 
        'category_id' => rand(1,4),
    ];
});
