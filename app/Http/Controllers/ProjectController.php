<?php

namespace App\Http\Controllers;

use App\Project;
use App\Position;
use App\User;
use App\PositionCategory;
use App\Interest;
use App\Notification;
use App\Bookmark;
use App\Message;
use App\Notifications\ConfirmProject;
use App\Notifications\ApproveProject;
use App\Notifications\RejectProject;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * This Controller control HTTP request which are dedicated to Projects
 */
class ProjectController extends Controller
{

	public function index(Request $request){

		if($request->order == 0){
			$column = "created_at";
			$direction = "DESC";
		}else if ($request->order == 1){
			$column = "created_at";
			$direction = "ASC";
		}else if ($request->order == 2){
			$column = "title";
			$direction = "ASC";
		}else if ($request->order == 3){
			$column = "title";
			$direction = "DESC";
		}

		if($request->positionCategory == 0){
			if($request->state == -1){
				if ($request->filter == 1){
					$projects = Project::whereIn('state', [1, 2, 3])->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if($request->filter == 2){
					$projects = Project::where('projects.user_id',$request->user_id)->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 3){
					$projects = Project::where('title','like',"%$request->search%")->select('projects.*', 'bookmarks.booker_id')->join('bookmarks', 'projects.id', '=', 'bookmarks.project_id')->where('bookmarks.booker_id',$request->user_id)->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 4){
					$projects = Project::where('supervisor_id',$request->user_id)->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 5){
					$projects = Project::select('projects.*')->join('positions', 'projects.id', '=', 'positions.project_id')->join('interests', 'positions.id', '=', 'interests.position_id')->where('interests.user_id',$request->user_id)->where('projects.title','like',"%$request->search%")->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}
			}else{
				if ($request->filter == 1){
					$projects = Project::whereIn('state', [1, 2, 3])->where('state',$request->state)->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if($request->filter == 2){
					$projects = Project::where('projects.user_id',$request->user_id)->where('state',$request->state)->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 3){
					$projects = Project::where('state',$request->state)->where('title','like',"%$request->search%")->select('projects.*', 'bookmarks.booker_id')->join('bookmarks', 'projects.id', '=', 'bookmarks.project_id')->where('bookmarks.booker_id',$request->user_id)->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 4){
					$projects = Project::where('supervisor_id',$request->user_id)->where('state',$request->state)->where('title','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 5){
					$projects = Project::where('state',$request->state)->select('projects.*')->join('positions', 'projects.id', '=', 'positions.project_id')->join('interests', 'positions.id', '=', 'interests.position_id')->where('interests.user_id',$request->user_id)->where('projects.title','like',"%$request->search%")->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}
			}
		}else{
			if($request->state == -1){
				if ($request->filter == 1){
					$projects = Project::whereIn('state', [1, 2, 3])->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if($request->filter == 2){
					$projects = Project::where('projects.user_id',$request->user_id)->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 3){
					$projects = Project::where('projects.title','like',"%$request->search%")->select('projects.*', 'bookmarks.booker_id')->join('bookmarks', 'projects.id', '=', 'bookmarks.project_id')->where('bookmarks.booker_id',$request->user_id)->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 4){
					$projects = Project::where('supervisor_id',$request->user_id)->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 5){
					$projects = Project::select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->join('interests', 'positions.id', '=', 'interests.position_id')->where('interests.user_id',$request->user_id)->where('positions.category_id',$request->positionCategory)->where('projects.title','like',"%$request->search%")->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}
			}else{
				if ($request->filter == 1){
					$projects = Project::whereIn('state', [1, 2, 3])->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->where('state',$request->state)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if($request->filter == 2){
					$projects = Project::where('projects.user_id',$request->user_id)->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->where('state',$request->state)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 3){
					$projects = Project::where('state',$request->state)->where('projects.title','like',"%$request->search%")->select('projects.*', 'bookmarks.booker_id')->join('bookmarks', 'projects.id', '=', 'bookmarks.project_id')->where('bookmarks.booker_id',$request->user_id)->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 3){
					$projects = Project::where('supervisor_id',$request->user_id)->where('projects.title','like',"%$request->search%")->select('projects.*', 'positions.category_id')->join('positions', 'projects.id', '=', 'positions.project_id')->where('positions.category_id',$request->positionCategory)->where('state',$request->state)->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}else if ($request->filter == 5){
					$projects = Project::where('state',$request->state)->select('projects.*')->join('positions', 'projects.id', '=', 'positions.project_id')->join('interests', 'positions.id', '=', 'interests.position_id')->where('interests.user_id',$request->user_id)->where('positions.category_id',$request->positionCategory)->where('projects.title','like',"%$request->search%")->groupBy('projects.id')->orderBy($column,$direction)->paginate(5);
				}
			}
		}

		foreach ($projects as $project){
			$project->author = User::where('id',$project->user_id)->first();
			$project->end = date('d.m.Y', strtotime($project->end));
			$project->created = date('d.m.Y', strtotime($project->created));
			$project->positionCount =  Position::where('project_id',$project->id)->count();
			$project->positionFull =   Position::where('project_id',$project->id)->where('user_id','<>',0)->count();
			$positions = Position::where('project_id',$project->id)->get();
			$project->positions = $positions;
			
			foreach ($project->positions as $position) {
				$position->interests = Interest::where('position_id',$position->id)->get();
				$position->category = PositionCategory::where('category_id',$position->category_id)->first();	
			}
			$now = date('d.m.Y');
			if(strtotime($project->end) < strtotime($now)){
				$project->active = 0;
			}else{
				$project->active = 1;
			}
		}

		return response()->json($projects);
	}

    public function saveCover(Request $request){

		$validation = Validator::make($request->all(),[
			'image'=>'required|mimes:jpeg,jpg,png,gif|max:10000'
		]);

		if ($validation->fails()){
			$response=array('status'=>'error','errors'=>$validation->errors()->toArray());  
			return response()->json($response);
		}

		if($request->hasFile('image')){
			$uniqueid=uniqid();
			$original_name=$request->file('image')->getClientOriginalName(); 
			$size=$request->file('image')->getSize();
			$extension=$request->file('image')->getClientOriginalExtension();
			$name=$uniqueid.'.'.$extension;
			$path=$request->file('image')->storeAs('public/projects',$name);
			$data = '/storage/projects/'.$name;

			if($path){
				$project = Project::where('id',$request->project_id)->update(['cover'=>$data ]);
				return response()->json('Project created!');
			}else{
				return response()->json(array('status'=>'error','message'=>'failed to upload image'));
			}
		}
    }

    public function store(Request $request)
    {
      	$validatedData = $request->validate([
            'title' => 'required',
        ]);

    	$new = date('Y-m-d', strtotime($request->endDate));
        $project = Project::create([
            'title' => $validatedData['title'],
            'description' => $request->description,
            'user_id' => $request->user_id,
            'supervisor_id'=> $request->supervisor,
            'end'=> $new,
            'created'=> date("Y-m-d"),
            'state'=>'0',
        ]);

        $positions = $request->positions;
        foreach ($positions as $position){
            $position2 = Position::create([
				'title' => $position['name'],
				'description' => $position['description'],
				'project_id'=> $project->id,
				'category_id'=>$position['category_id'],
				'fee'=> $position['fee'],
            ]);
        }

        $user = User::where('id',$request->supervisor)->first();
        $sender = User::where('id',$request->user_id)->first();
        $user->notify(new ConfirmProject($sender, $project));
        return $project;
    }


    public function show($id)
    {
		$project = Project::where("id",$id)->first();
		$project->positions = Position::where('project_id',$id)->get();
		$project->author = User::where('id',$project->user_id)->first();
		$project->end = date('d.m.Y', strtotime($project->end));
		$project->created = date('d.m.Y', strtotime($project->created));
		if($project->end >= date("d.m.Y")){
            $project->active = 1;
        }else{
            $project->active = 0;
		}
		
		foreach ($project->positions as $position) {
			if($position->user_id != 0){
				$position->user =  User::where('id',$position->user_id)->first();
			}else{
				$position->interests = Interest::where('position_id',$position->id)->get();
				$position->interestsCount = Interest::where('position_id',$position->id)->count();
				foreach ($position->interests as $interest) {
					$interest->user = User::where('id',$interest->user_id)->first();
				}
			}
			if ($position->category_id != 0){
				$name = PositionCategory::select('name')->where('category_id',$position->category_id)->first();
				$position->category_name = $name->name;
			}
		}
		
		if ($project['cover'] != NULL){
			$project->cover = env('APP_P').$project['cover'];
		}
      
          
      return response()->json($project);

    }

    public function showUserProject($user_id){
		$projects = Project::where('user_id',$user_id)->whereIn('state', [1, 2, 3])->orderBy("created","DESC")->get();
		$positions = Position::get();
		
		foreach ($projects as $project){
			$project->author = User::where('id',$project->user_id)->first();
			$project->end = date('d.m.Y', strtotime($project->end));
			$project->created = date('d.m.Y', strtotime($project->created));
			$now = date('d.m.Y');
			if(strtotime($project->end) < strtotime($now)){
				$project->active = 0;
			}else{
				$project->active = 1;
			}
			
			$project->positionCount =  Position::where('project_id',$project->id)->count();
			$project->positionFull =   Position::where('project_id',$project->id)->where('user_id','<>',0)->count();
			$project->positions = Position::where('project_id',$project->id)->get(); 

			foreach ($project->positions as $position) {
				if($position->project_id == $project->id){
					$position->interests = Interest::where('position_id',$position->id)->get();
					$position->category = PositionCategory::where('category_id',$position->category_id)->first();
				}
			}
		}

		return response()->json($projects);
    }



    public function update(Request $request){
		$validatedData = $request->validate([
			'title' => 'required',
		]);

		$new = date('Y-m-d', strtotime($request->endDate));
		$projectOld = Project::where('id',$request->project_id)->first();

		if($projectOld->state == '4' ) {
			if(date('Y-m-d') < $new){
				$project = Project::where('id',$request->project_id)->update([
					'title' => $validatedData['title'],
					'description' => $request->description,
					'end'=> $new,
					'state'=>'1',
				]);

				return response()->json('Project information was changed sucesfully!');
			}
		}else if($projectOld->state == '1' ) {
			if(date('Y-m-d') > $new){
				$project = Project::where('id',$request->project_id)->update([
					'title' => $validatedData['title'],
					'description' => $request->description,
					'end'=> $new,
					'state'=>'4',
				]);

				return response()->json('Project information was changed sucesfully!');
			}
    	}

		$project = Project::where('id',$request->project_id)->update([
		'title' => $validatedData['title'],
		'description' => $request->description,
		'end'=> $new,
		]);

    	return response()->json('Project information was changed sucesfully!');
    }

    public function delete(Request $request){
		$bookmarks = Bookmark::where('project_id',$request->project_id)->delete();
		$messages = Message:: join('positions', 'positions.id', '=', 'messages.position_id')->where('positions.project_id',$request->project_id)->delete();
		$interests = Interest::join('positions', 'positions.id', '=', 'interests.position_id')->where('positions.project_id',$request->project_id)->delete();
		$positions = Position::where('project_id',$request->project_id)->delete();
		$notification = Notification::where('project_id',$request->project_id)->delete();
		$project = Project::where('id',$request->project_id)->delete();
      	return response()->json('Project  was deleted sucesfully!');
    }

    public function approveProject(Request $request){
		$project = Project::where('id',$request->project_id)->update([
			'state'=> 1,
		]);

		$project = Project::where('id',$request->project_id)->first();
		$user = User::where('id',$request->recipient_id)->first();
		$sender = User::where('id',$request->sender_id)->first();
		$user->notify(new ApproveProject($sender, $project));
		return response()->json('Project was approved ');
    }


    public function rejectProject(Request $request){
		$project = Project::where('id',$request->project_id)->first();
		$user = User::where('id',$request->recipient_id)->first();
		$sender = User::where('id',$request->sender_id)->first();
		$not = Notification::where('project_id',$request->project_id)->delete();
		$user->notify(new RejectProject($sender, $project));
		$p = Project::where('id',$request->project_id)->delete();
		return response()->json('Project was rejected ');
    }

	public function changeState(Request $request){
		if ($request->state == 2){
			$project = Project::where('id',$request->project_id)->update([ 'state' => 2 ]);
		}else if($request->state == 3){
			$project = Project::where('id',$request->project_id)->update(['state' => 3 ]);
		}
		
		return response()->json('States was changed ');
	} 
}
