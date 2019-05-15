<?php

namespace App;

use App\User;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'data','notifiable_type','project_id','notifiable_id','sender_id','position_id','read_at','created_at','updated_at' /* 'message','project_id','sender_id','recipient_id','position_id',*/
    ];


   /* public function users()
    {
      return $this->belongsTo(User::class,'recipient_id');
    }*/
}
