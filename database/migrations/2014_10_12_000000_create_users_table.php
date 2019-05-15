<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            //$table->primary('id');
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('faculty')->default(null);
            $table->longText('about')->default(null);
            $table->string('position')->default(null);
            $table->string('email')->unique();
            $table->string('type');
            $table->string('cv')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->unsignedInteger('supervisor_id');
            $table->unsignedInteger('activate');
            $table->string('image_path')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
