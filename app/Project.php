<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  
    protected $fillable = [
        'title', 'description','visibility','user_id','is_completed','end','created','supervisor_id','state',
    ];

    public function positions()
      {
        return $this->hasMany(Position::class);
      }
}
