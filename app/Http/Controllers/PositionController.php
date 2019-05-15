<?php

namespace App\Http\Controllers;

use App\Position;
use App\Project;
use App\Notification;
use App\User;
use Illuminate\Http\Request;
use App\Interest;
use App\Message;

use App\Notifications\NewChoose;
use App\Notifications\RemoveMe;
use App\Notifications\RemoveChooser;
use App\Notifications\RejectInterest;
use App\Notifications\CancelInterest;

/**
 * This Controller control HTTP request which are dedicated to Positions
 */
class PositionController extends Controller
{

    public function store(Request $request){

        $validatedData = $request->validate([
            'title' => 'required',
        ]);

        $position = Position::create([
            'title' => $validatedData['title'],
            'description' =>$request->description,
            'category_id' => $request->category_id,
            'project_id'=> $request->project_id,
            'fee'=> $request->fee,
		]);
		return response()->json('Position was created sucesfully!');
    }

    public function update(Request $request)
    {
    	$validatedData = $request->validate([
        	'title' => 'required',
      	]);

      	$position = Position::where('id',$request->position_id)->update([
        	'title' => $validatedData['title'],
        	'description' => $request->description,
        	'category_id' => $request->category_id,
        	'fee'=> $request->fee,
      	]);

      	return response()->json('Position information was changed sucesfully!');
    }



    public function delete(Request $request)
    {
		$position = Position::where('id',$request->position_id)->delete();
		$notification = Notification::where('position_id',$request->position_id)->delete();
		$messages = Message::where('position_id',$request->position_id)->delete();
		return response()->json('Position  was deleted sucesfully!'); 

    }

    public function removeChooseUser(Request $request)
    {
      
		$position = Position::where('id',$request->position_id)->first();
		$project = Project::where('id',$request->project_id)->first();
		$user = User::where('id',$project->user_id)->first();
		$user2 = User::where('id',$request->recipient_id)->first();

		$start = date('d.m.Y', strtotime($project->end));
		$now = date('d.m.Y');
		if(strtotime($start) > strtotime($now)){
			$position = Project::where('id',$project->id)->update([
				'state' => 1,
			]);
		}

		if($request->type == "removeMe"){
			$user->notify(new RemoveMe($user2, $request->project_id,$request->position_id));
		}else{
			$user2->notify(new RemoveChooser($user, $request->project_id,$request->position_id));
		}

		$interest = Interest::where('user_id',$request->user_id)->where('position_id',$request->position_id)->delete();
		$position = Position::where('id',$request->position_id)->update([
			'user_id' => '0',
		]);
		return response()->json('Selected user was removed sucesfully!'); 
    }

    public function chooseUser(Request $request)
    {
		$position = Position::where('id',$request->position_id)->update([
			'user_id' => $request->user_id,
		]);

		$position1 = Position::where('id',$request->position_id)->first();
		$project = Project ::where('id',$position1->project_id)->first();
		$positions = Position::where('project_id',$project->id)->get();
		
		$isFree = 0;
		foreach ($positions as $position ) {
			if ($position->user_id == 0){
				$isFree = 1;
			}
		}

		if($isFree == 0){
			$position = Project::where('id',$project->id)->update([
				'state' => 2,
			]);
		}

		$user2 = User::where('id',$project->user_id)->first();
		$interests = Interest::where('position_id',$request->position_id)->where('user_id','<>',$request->user_id)->get();
		foreach ($interests as $interest){
			$user = User::where('id',$interest->user_id)->first();
			$user->notify(new RejectInterest($user2, $project->id,$position1->id));
		}
		$interests = Interest::where('position_id',$request->position_id)->where('user_id','<>',$request->user_id)->delete();

		$user = User::where('id',$request->user_id)->first();
		$user->notify(new NewChoose($user2, $project,$position1));

		return response()->json('User was  selected sucesfully!');

    
    }

    


}
