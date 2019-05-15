<?php

namespace App\Http\Controllers;

use App\Notifications\NewInterest;
use App\Notifications\NewMessage;
use App\Interest;
use App\User;
use App\Position;
use App\Notification;
use App\Project;
use App\Message;
use Illuminate\Http\Request;
use App\Notifications\CancelInterest;


/**
 * 
 * This Controller control HTTP request which are dedicated to Interests
 */
class InterestController extends Controller
{

    public function index($id)
    {
        $positions = Position::where('project_id',$id)->get(); 

        foreach ($positions as $position) {
            if($position->user_id != 0){
                $position->user =  User::where('id',$position->user_id)->first();
            }else{
                $position->interests = Interest::where('position_id',$position->id)->get();
                foreach ($position->interests as $interest) {
                    $interest->user = User::where('id',$interest->user_id)->first();
                }
            }
        }
        return $positions;
    }

    public function store(Request $request)
    {
        $interest = Interest::create([
            'user_id' =>  $request->user_id,
            'position_id' =>  $request->position_id,  
        ]);

        $message = Message::create([
            'recipient_id' =>  $request->author_id,
            'position_id' =>  $request->position_id,
            'sender_id' => $request->user_id,
            'message' => $request->message,
            'cv' => $request->cv, 
        ]);

        $user = User::where('id',$request->author_id)->first();
        $user2 = User::where('id',$request->user_id)->first();

        $user->notify(new NewInterest($user2, $message['id'],$request->project_id,$request->position_id));
        $user->notify(new NewMessage($user2, $message['id'],$request->project_id,$request->position_id));

        return response()->json('Interest created!');
    }

    public function delete(Request $request)
    {
        $interest = Interest::where('user_id',$request->user_id)->where('position_id',$request->position_id)->delete();

        $user = User::where('id',$request->author_id)->first();
        $user2 = User::where('id',$request->user_id)->first();
        $user->notify(new CancelInterest($user2, $request->position_id));
        return response()->json('Interest deleted!');
    }
}
