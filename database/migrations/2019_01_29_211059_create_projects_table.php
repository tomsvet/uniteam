<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->longText('description');
           // $table->unsignedInteger('visibility')->default(0);
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('supervisor_id');
            $table->boolean('state')->default(0);
            $table->string('cover')->default(null);
            $table->date('end');
            $table->date('created');
            $table->timestamps();
            /*$table->enum('choices', array('foo', 'bar'));*/
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
