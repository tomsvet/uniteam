<?php

namespace App\Http\Controllers;

use App\Notification;
use App\User;
use App\Project;
use App\Position;
use App\Interest;
use App\Notifications\NewRecommend;
use App\Notifications\NewMessage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\stdObject;
use App\Http\Controllers\stdClass;

/**
 * This Controller control HTTP request which are dedicated to Notifications
 */
class NotificationController extends Controller
{
    public function getNotifications($id)
    {
        $user = User::find($id);
        if($user == null){
            return;
        }
        $projects = $user->notifications()->groupBy('project_id')->select('project_id')->get();
        
        foreach ($projects as $project) {
            $project->id = $project->project_id;
            $project->notifications = $user->notifications()->where('project_id',$project->project_id)->orderBy('created_at','desc')->get();
            $title = Project::select('title','user_id')->where('id',$project->project_id)->first();
            if($title != null){
                $project->title = $title['title'];
                $project->author = User::where('id',$title['user_id'])->first();
                foreach ($project->notifications as $notification) {
                    $notification->sender = User::where('id',$notification->sender_id)->first();
                    $notification->position = Position::where('id',$notification->position_id)->first();
                    if($notification->type == "App\\Notifications\\NewInterest"){
                        $notification->interest = Interest::where('position_id',$notification->position_id)->where('user_id',$notification->sender_id)->first();
                    }
                }
            }else{
                $project->author = User::where('id',$project->notifications[0]->notifiable_id)->first();
                $project->title = $project->notifications[0]->data['title'];
                $project->notifications[0]->sender = User::where('id',$project->notifications[0]->sender_id)->first();
            }
            $project->countNew = $user->unreadNotifications()->where('project_id',$project->project_id)->count();
        }

        $notification = [];
        $notification[0] = $projects ;
        $notification[1] = $user->unreadNotifications()->count();
        return $notification;
    }


    public function getAllNotifications($id)
    {
        $user = User::find($id);
        $senders = $user->notifications()->where('category','s')->groupBy('sender_id')->select('sender_id')->get();

        foreach ($senders as $sender) {
            $sender->notifications = $user->notifications()->where('category','s')->where('sender_id',$sender->sender_id)->orderBy('created_at','desc')->get();
            $data = User::where('id',$sender->sender_id)->first();
            $sender->id = $data['id'];
            $sender->user = $data;
            $sender->lastname = $data['lastname'];
            $sender->activate = $data['activate'];
           
            foreach ($sender->notifications as $notification) {
                if($notification->type == "App\\Notifications\\ConfirmProject"){
                    $project = Project::where('id',$notification->project_id)->first();
                    $notification->project = $project;
                    if ($project != null){
                        $notification->visibility = $project->state;
                    }else{
                        $notification->visibility = -1;
                    }
                }
            }

            $sender->countNew = $user->unreadNotifications()->where('category','s')->where('sender_id',$sender->sender_id)->count();
        }

        $projects = $user->notifications()->where('category','n')->groupBy('project_id')->select('project_id')->get();
        foreach ($projects as $project) {
            $project->id = $project->project_id;
            $project->notifications = $user->notifications()->where('category','n')->where('project_id',$project->project_id)->get();
            $title = Project::select('title','user_id')->where('id',$project->project_id)->first();
            if($title != null){
                $project->title = $title['title'];
                $project->author = User::where('id',$title->user_id)->first();
                foreach ($project->notifications as $notification) {
                    $notification->sender = User::where('id',$notification->sender_id)->first();
                    $notification->position = Position::where('id',$notification->position_id)->first();
                }
            }else{
                $project->author = User::where('id',$project->notifications[0]->notifiable_id)->first();
                $project->title = $project->notifications[0]->data['title'];
                $project->notifications[0]->sender = User::where('id',$project->notifications[0]->sender_id)->first();
            }
            $project->countNew = $user->unreadNotifications()->where('category','n')->where('project_id',$project->project_id)->count();
        }

        $notification = [];
        $notification[0] = $senders ;
        $notification[1] = $projects ;
        $notification[2] = $user->unreadNotifications()->where('category','s')->count();
        $notification[3] =  $user->unreadNotifications()->where('category','n')->count();
        return  response()->json($notification); 

    }

    public function sendRecommend(Request $request)
    {
        $user = User::where('id',$request->recipient_id)->first();
        $user2 = User::where('id',$request->sender_id)->first();
        $user->notify(new NewRecommend($user2, $request->project_id,$request->position_id));
        return response()->json('Recommend created!');
    }

    public function setNotificationsRead(Request $request)
    {
        $user = User::find($request->userId);
        if($request->type =='n'){
            $user->unreadNotifications()->where('category',$request->type)->where('project_id',$request->id)->update(['read_at' => now()]);
        }else{
            $user->unreadNotifications()->where('category',$request->type)->where('sender_id',$request->id)->update(['read_at' => now()]);
        }
        return response()->json('Notifications are set as read!');
    }

    public function getNewNotifications($id)
    {

        $user = User::find($id);

        $senderNotifications = [];
        $projectNotifications = [];

        foreach ($user->unreadNotifications as $notification) {
            
            if($notification->data['type'] == "s"){

                $user = User::where('id',$notification->data['user_id'])->first();
                $notification->activate = $user->activate; 
                
                array_push($senderNotifications,$notification);




            }else{
                array_push($projectNotifications,$notification);
                
               
                }
         }

         $notification = [];
         $notification[0] = $senderNotifications ;
         $notification[1] = $projectNotifications ;
         

         return  response()->json($notification); 
        }


    
}
