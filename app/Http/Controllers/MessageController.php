<?php

namespace App\Http\Controllers;

use App\Project;
use App\Message;
use App\User;
use App\Position;
use Illuminate\Http\Request;
use App\Notifications\NewMessage;

/**
 * This Controller control HTTP request which are dedicated to Messages
 */
class MessageController extends Controller
{
    
    public function index($id)
    {
        $messages = Message::where('recipient_id',$id)->orderBy('created_at','DESC')->paginate(10);
        foreach ($messages as $message) {
            $message->sender = User::where('id',$message->sender_id)->first();
            $message->position = Position::where('id',$message->position_id)->first();
            $message->project = Project::where('id',$message->position['project_id'])->first();
        }    
        return $messages;
    }


    public function show($id)
    {
        $message = Message::where('id',$id)->first();
        if($message->read_at == null){
            $message->read_at = now();
            Message::where('id',$id)->update(['read_at'=>now() ]);
        }
        
        $message->sender = User::where('id',$message->sender_id)->first();
        $message->position = Position::where('id',$message->position_id)->first();
        $message->project = Project::where('id',$message->position['project_id'])->first();

        return $message;
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'recipient_id' =>  $request->recipient_id,
            'position_id' =>  $request->position_id,
            'sender_id' => $request->sender_id,
            'message' => $request->message,
            'cv' => $request->cv,
          ]);

        $user = User::where('id',$request->recipient_id)->first();
        $user2 = User::where('id',$request->sender_id)->first();
        $user->notify(new NewMessage($user2, $message['id'],$request->project_id,$request->position_id));

        return response()->json('Message created!');
    }
}
