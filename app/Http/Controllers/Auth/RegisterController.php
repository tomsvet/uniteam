<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Notification;
use App\Notifications\ConfirmPerson;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;


class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'type' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'supervisor_id' => ['required'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        



        if($data['supervisor_id'] == 0){
            $user = User::create([
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'email' => $data['email'],
                'type'  => $data['type'],
                'password' => Hash::make($data['password']),
                'supervisor_id' =>  $data['supervisor_id'],
                'activate' => 1,
            ]);
        }else{

            $user = User::create([
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'email' => $data['email'],
                'type'  => $data['type'],
                'password' => Hash::make($data['password']),
                'supervisor_id' => $data['supervisor_id'],
                'activate' => 0,
            ]);




            /*$notification = Notification::create([
                'recipient_id' => $data['supervisor_id'],
                'sender_id' => $user->id,
                'type' => 'supervisor',
                'project_id'  => 0,
                'position_id' => 0,
            ]);*/

            $recepient = User::where('id',$data['supervisor_id'])->first();

        //$sender = User::where('id',$request->user_id)->first();


        $recepient->notify(new ConfirmPerson($user));
        }

        return $user;
    }


    
   
}
