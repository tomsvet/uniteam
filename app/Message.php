<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'recipient_id', 'position_id','message','cv','sender_id',
    ];
}
