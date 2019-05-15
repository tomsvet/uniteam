<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{


    protected $fillable = [
        'title', 'description','project_id','user_id','category_id','fee',
    ];

    
}
