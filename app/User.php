<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname','lastname', 'email', 'password','type','faculty','about','position','supervisor_id','activate','cv','type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isAdmin()
    {
      return $this->type === 'admin';
    }


    public function projects()
      {
        return $this->hasMany(Project::class);
      }

    public function positions()
    {
        return $this->hasMany(Position::class);
    }

    /*public function notifications()
    {
      return $this->belongsToMany(self::class, 'followers', 'user_id', 'follows_id')
                    ->withTimestamps();
    }

    public function notifier()
    {
      return $this->belongsToMany(self::class, 'followers', 'follows_id', 'user_id')
                    ->withTimestamps();
    }


    public function notification()
    {

    }*/

    public function receivesBroadcastNotificationsOn()
{
    return 'App.User.' . $this->id;
}

}
