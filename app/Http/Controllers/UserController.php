<?php

namespace App\Http\Controllers;

use App\User;
use App\Project;
use App\Position;
use App\PositionCategory;
use App\Notification;
use App\Interest;
use App\Message;

use App\Notifications\ApproveUser;
use App\Notifications\RejectUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

$controller = App::make('\App\Http\Controllers\ProjectController');

/**
 * This Controller control HTTP request which are dedicated to Users
 */
class UserController extends Controller
{

    public function index(Request $request)
    {
        if($request->order == 0){
            $column = "created_at";
            $direction = "DESC";
        }else if ($request->order == 1){
            $column = "created_at";
            $direction = "ASC";
    
        }else if ($request->order == 2){
            $column = "lastname";
            $direction = "ASC";
        }else if ($request->order == 3){
            $column = "lastname";
            $direction = "DESC";
        } 

        if($request->positionCategory == 0){
            if ($request->filter == 1)
                $users = User::where('activate','1')->where('lastname','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
            else{
                $users = User::where('supervisor_id',$request->user_id)->where('lastname','like',"%$request->search%")->orderBy($column,$direction)->paginate(5);
            }
        }else{
            if ($request->filter == 1){
                $users = User::where('activate','1')->where('lastname','like',"%$request->search%")->select('users.*', 'position_categories.category_id')->join('position_categories', 'users.position', '=', 'position_categories.category_id')->where('position_categories.category_id',$request->positionCategory)->orderBy($column,$direction)->paginate(5);
            }else{
                $users = User::where('supervisor_id',$request->user_id)->where('lastname','like',"%$request->search%")->select('users.*', 'position_categories_id')->join('position_categories', 'users.position', '=', 'position_categories.name')->where('position_categories.category_id',$request->positionCategory)->orderBy($column,$direction)->paginate(5);
            }
        }
        foreach ($users as $user) { 
            if($user->position != 0){
                $name = PositionCategory::select('name')->where('category_id',$user->position)->first();
                $user->position_name = $name->name;
            }
            $user->own = Project::where('user_id',$user->id)->count();
            $user->member = Position::where('user_id',$user->id)->count();
        }
        return $users;
    }


    public function delete(Request $request)
    {
        $project = Position::where('user_id',$request->user_id)->update(['user_id'=>0]);
        $project = Position::join('projects', 'projects.id', '=', 'positions.project_id')->where('projects.user_id',$request->user_id)->delete();
        $project = Project::where('user_id',$request->user_id)->delete();
        $notification = Notification::where('sender_id',$request->user_id)->orwhere('notifiable_id',$request->user_id)->delete();
        $interests = Interest::where('user_id',$request->user_id)->delete();
        $message = Message::where('sender_id',$request->user_id)->orwhere('recipient_id',$request->user_id)->delete();
        $person = User::where('id',$request->user_id)->delete();

        return response()->json('User was deleted'); 
    }

    public function supervisor()
    {
        $supervisors = User::whereIn('type', ['supervisor'])->get();
        return $supervisors;
    }

    public function getLoggedUser(){
        if( Auth::check() ){
            $u =  Auth::user();
            $user = User::where('id',$u->id)->first();
            if($user->position != 0){
                $name = PositionCategory::select('name')->where('category_id',$user->position)->first();
                $user->position_name = $name->name;
            }
            if ($user['image_path'] != NULL){
                $user->image_path = env('APP_P').$user['image_path'];
            }else{
                $user->image_path = env('APP_P')."/storage/uploads/profil.png";
            }
            return $user;
        }else{
            return null;
        }
        
    }

    public function updateEmail(Request $request){
        $validatedData = $request->validate([
            'email' => 'required|max:255|email|string|unique:users', 
        ]);

        $updatemail = User::where('id',$request->id)->update([
            'email'=>$validatedData['email']
        ]);
        return response()->json('Email updated!'); 
    }


    public function updatePassword(Request $request){
        $validatedData = $request->validate([
            'password' => 'required|same:password',
            'password_confirmation' => 'required|same:password',
            'old_password' => 'required',
          ]);

        $current_password = Auth::User()->password;
        if(Hash::check($validatedData['old_password'], $current_password)){   
            $user_id = Auth::User()->id;   
            $updatedpassword = User::where('id',$user_id)->update(['password' => Hash::make($validatedData['password'])]);
            return response()->json('Password updated!');
        }else{
            return response()->json('Please enter correct current password!');
        }
    }

    public function show($id){
        $user = User::where("id",$id)->first();
        if($user->position != 0){
            $name = PositionCategory::select('name')->where('category_id',$user->position)->first();
            $user->position_name = $name->name;
        }
        if ($user['image_path'] != NULL){
            $user->image_path = env('APP_P').$user['image_path'];
        }else{
            $user->image_path = env('APP_P')."/storage/uploads/profil.png";
        }
        $user->own = Project::where('user_id',$user->id)->count();
        $user->member = Position::where('user_id',$user->id)->count();
        return response()->json($user);
    }

    public function updatePosition(Request $request){
        $position = User::where('id',$request->user_id)->update(['position'=>$request->position_id]);
        return response()->json('Position updated!'); 
    }

    public function updateName(Request $request){
        $validatedData = $request->validate([
            'firstname' => 'required|max:255|string',
            'lastname' => 'required|max:255|string',

        ]);
        
        $firstname = User::where('id',$request->user_id)->update(['firstname'=>$validatedData['firstname']]);
        $lastname = User::where('id',$request->user_id)->update(['lastname'=>$validatedData['lastname']]);
        return response()->json('Name updated!');    
    }

    public function updateFaculty(Request $request)
    {
        $faculty = User::where('id',$request->user_id)->update(['faculty'=>$request->faculty]);

        return response()->json('Faculty updated!');    
    }

    public function updateAbout(Request $request)
    {
        $validatedData = $request->validate([
            'about' => 'string',
        ]);

        $about = User::where('id',$request->user_id)->update([
            'about'=>$validatedData['about'],
        ]);
        
        return response()->json('Information About me updated!');   
    }

    public function ApprovePerson(Request $request)
    {
        $person = User::where('id',$request->user_id)->update(['activate'=>1 ]);
        $person = User::where('id',$request->user_id)->first();
        $person->notify(new ApproveUser());
        

        return response()->json('Person was approved!');  
    }

    public function RejectPerson(Request $request){
        $person = User::where('id',$request->user_id)->delete();
        $notification = Notification::where('sender_id',$request->user_id)->delete();
        $person->notify(new RejectUser());

        return response()->json('Person rejected!'); 
    }

    public function saveImage(Request $request)
    {
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
            $path=$request->file('image')->storeAs('public/uploads',$name);
            $data = '/storage/uploads/'.$name;

            if($path){
                $person = User::where('id',$request->user_id)->update(['image_path'=>$data ]);
                return response()->json(array('status'=>'success','message'=>'Image successfully uploaded','image'=>'/storage/uploads/'.$name));
            }else{
                return response()->json(array('status'=>'error','message'=>'failed to upload image'));
            }
        }
    }



    public function saveCV(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            'cv'=>'required|mimes:txt,pdf,doc|max:10000'
        ]);

        if ($validation->fails()){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray());  
            return response()->json($response);
        }


        if($request->hasFile('cv')){

            $uniqueid=uniqid();
            $original_name=$request->file('cv')->getClientOriginalName(); 
            $size=$request->file('cv')->getSize();
            $extension=$request->file('cv')->getClientOriginalExtension();
    
            $name=$uniqueid.'.'.$extension;
            $path=$request->file('cv')->storeAs('public/files',$name);

            $data = '/storage/files/'.$name;

            if($path){
                $person = User::where('id',$request->user_id)->update(['cv'=>$path ]);
                return response()->json(array('status'=>'success','message'=>'CV successfully uploaded','image'=>'/storage/files/'.$name));
            }else{
                return response()->json(array('status'=>'error','message'=>'failed to upload cv'));
            }

        }
    }

    public function downloadCV($id){
        $user = User::where('id',$id)->first();
        $path = $user->cv;
        $url = Storage::url($path);

        return env('APP_P').$url;
    }

    public function deleteCV(Request $request)
    {
        $user = User::where('id',$request->id)->first();
        $path = $user->cv;
        Storage::delete($path);
        $user = User::where('id',$request->id)->update(['cv'=> null ]);
        
        return response()->json('User delete CV');
    }

    public function update(Request $request){
        $person = User::where('id',$request->user_id)->update([
            'firstname'=>$request->firstname,
            'lastname'=>$request->lastname,
            'email'=>$request->email 
        ]);
        return response()->json('User update');
    }
}
