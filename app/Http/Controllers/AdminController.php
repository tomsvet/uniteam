<?php

namespace App\Http\Controllers;

use App\Project;
use App\Position;
use App\User;
use App\PositionCategory;
use App\Interest;
use App\Notification;
use App\Bookmark;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\stdObject;
use App\Http\Controllers\stdClass;
use Illuminate\Support\Facades\DB;


/**
 * This Controller control HTTP request which are dedicated to Admin's processes
 */
class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function admin()
    {
        return view('index');
    }


    public function getAdminData()
    {

        $data = new \stdClass;

        $data->allCount = Project::count();
        $data->endedCount = Project::where('state', 3)->count();
        $data->userCount = User::count();
        $data->positionCount = Position::count();
        $userGraph = [];
        $userGraph2 = [];
        $day = date('d.m.Y');
        $month = date('F');
       
        for ($i=0; $i < 5; $i++) { 
             $userGraph[$i]= new \stdClass;
            $userGraph2[$i]= new \stdClass;
            $userGraph[$i]->count = User::whereYear('created_at','<=',date('Y',strtotime($day)))->whereMonth('created_at','<=',date('n',strtotime($day)))->count(); 
            $userGraph2[$i]->count = Project::whereYear('created_at','<=',date('Y',strtotime($day)))->whereMonth('created_at','<=',date('n',strtotime($day)))->count(); 
        
            $userGraph[$i]->month = date('F',strtotime($day));
            $userGraph2[$i]->month = date('F',strtotime($day));
            $day = date('d.m.Y',strtotime($day. "last month") );
        }

        $arrayFaculty = array("FA","FAST","FEKT","FCH","FIT","FP","FSI","FaVU","");

        $i = 0;
        foreach ($arrayFaculty as $faculty) {
            $userPie[$i]= new \stdClass;
            if($faculty == ""){
                $userPie[$i]->name = "none";
            }else{
                $userPie[$i]->name = $faculty;
            }
            $userPie[$i]->count = User::where('faculty',$faculty)->count();
            $i ++;
        }

        $graphCategory = Position::select('category_id', DB::raw('count(*) as count'))
        ->groupBy('category_id')->orderBy('count','DESC')
        ->limit(5)->get();

        foreach ($graphCategory as $category) {
            $name = PositionCategory::select('name')->where('category_id',$category->category_id)->first();
            $category->name = $name['name'];
        }

        $data->userGraph = array_reverse($userGraph);
        $data->userGraph2 = array_reverse($userGraph2);
        $data->userPie = $userPie;
        $data->graphCategory = $graphCategory;
        return response()->json($data) ;
    }

    public function getAdminProjects(Request $request){
        $column = "created";
        $direction = "ASC";
        if($request->orderByTitle != 0){
            $column = "title";
            if($request->orderByTitle == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByAuthor != 0){
            $column = "lastname";
            if($request->orderByAuthor == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
       }else if ($request->orderByStart != 0){
            $column = "created";
            if($request->orderByStart == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByExpiration != 0){
            $column = "end";
            if($request->orderByExpiration == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }    
        }

        $projects = Project::select('projects.*', 'users.firstname','users.lastname')->join('users', 'projects.user_id', '=', 'users.id')->orderBy($column,$direction)->paginate(10);
       
        foreach ($projects as $project) {
            if($project->state == 2){
                $project->stateName = "Running";
            }else if($project->state == 4){
                $project->stateName = "Expired";
            }else if($project->state == 0){
                $project->stateName = "Unapproved";  
            }else if($project->state == 3){
                $project->stateName = "Finished";
            }else if($project->state == 1){
                $project->stateName = "Active";
            }

            $project->created = date('d.m.Y', strtotime($project->created));
            $project->end = date('d.m.Y', strtotime($project->end));
            $project->isChecked = false;
        }
        
        return response()->json($projects) ;
    }


    public function getAdminProjectsStatistics(){
        $statistic = new \stdClass;
        $statistic->all = Project::count();
        $statistic->finished = Project::where('state', 3)->count();
        $statistic->running = Project::where('state', 2)->count();
        $statistic->active = Project::where('state', 1)->count();
        return response()->json($statistic) ;
    }

    public function adminRemoveProjects(Request $request){

        foreach ($request->projects as $project ) {
           
            if ($project['isChecked'] == true){
                $position = Position::where('project_id',$project['id'])->delete();
                $pom = Project::where('id',$project['id'])->delete();
            }
        }
        return response()->json('Project  was deleted sucesfully!');
    }

    public function adminRemoveUsers(Request $request){

        foreach ($request->users as $user ) {
           
            if ($user['isChecked'] == true){
                $projects = Project::where('user_id',$user['id'])->get();
                foreach ($projects as $project ) {
                    $position = Position::where('project_id',$project['id'])->delete();
                }
                $projects = Project::where('user_id',$user['id'])->delete();
                $pom = User::where('id',$user['id'])->delete();
            }
        }
        return response()->json('User  was deleted sucesfully!');
    }

    public function adminRemovePositions(Request $request){
        foreach ($request->positions as $position ) {
            if ($position['isChecked'] == true){
                $pos = Position::where('id',$position['id'])->delete();
            }
        }
        return response()->json('Position  was deleted sucesfully!');
    }

    public function adminRemoveCategories(Request $request){
        foreach ($request->categories as $category ) {
            if ($category['isChecked'] == true){
                $pos = Position::where('category_id',$category['category_id'])->delete();
                $pos = PositionCategory::where('category_id',$category['category_id'])->delete();  
            }
        }
        return response()->json('Category  was deleted sucesfully!');
    }

    public function getAdminUsersStatistics(){
        $statistic = new \stdClass;
        $statistic->all = User::count();
        $statistic->university = User::where('type', "university")->count();
        $statistic->supervisor = User::where('type', "supervisor")->count();
        $statistic->normal = User::where('type', "normal")->count();
        return response()->json($statistic) ;
    }

    public function getAdminPositionsStatistics(){
        $statistic = new \stdClass;
        $statistic->all = Position::count();
        return response()->json($statistic) ;
    }

    public function getAdminCategoriesStatistics(){
        $statistic = new \stdClass;
        $statistic->all = PositionCategory::count();
        return response()->json($statistic) ;
    }

    public function getAdminUsers(Request $request){
        $column = "created_at";
        $direction = "DESC";
        if($request->orderByLastname != 0){
            $column = "lastname";
            if($request->orderByLastname == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByFirstname != 0){
            $column = "firstname";
            if($request->orderByFirstname == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByType != 0){
            $column = "type";
            if($request->orderByType == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByRegistration != 0){
            $column = "created_at";
            if($request->orderByRegistration == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByFaculty != 0){
            $column = "faculty";
            if($request->orderByFaculty == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }  
        }

        $users = User::orderBy($column,$direction)->paginate(10);
        foreach ($users as $user) {
            $user->created = date('d.m.Y', strtotime($user->created_at));
            $user->isChecked = false;
        }
        
        return response()->json($users) ;
    }

    public function getAdminPositions(Request $request){
        $column = "created_at";
        $direction = "ASC";
        $positions= [];
        if($request->orderByTitle != 0){
            $column = "title";
            if($request->orderByTitle == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByFee != 0){
            $column = "fee";
            if($request->orderByFee == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByType != 0){
            $column = "name";
            if($request->orderByType == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByWorker != 0){
            $column = "lastname";
            if($request->orderByWorker == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }

            $positions =Position:: select('positions.*','users.lastname')->join('users', 'users.id', '=', 'positions.user_id')->orderBy($column,$direction)->paginate(10);
        }else if ($request->orderByProject != 0){
            $column = "projects.title";
            if($request->orderByProject == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }

        if ($request->orderByWorker == 0){
            $positions = Position:: select('positions.*','position_categories.name as type','projects.title as project_title')->join('position_categories', 'positions.category_id', '=', 'position_categories.category_id')->join('projects', 'projects.id', '=', 'positions.project_id')->orderBy($column,$direction)->paginate(10);
        }

        foreach ($positions as $position) {
            $worker = User::where('id',$position->user_id)->first();
            $position->worker = $worker['lastname']." ".$worker['firstname'];
            $position->created = date('d.m.Y', strtotime($position->created_at));
            $position->isChecked = false;
        }

        return response()->json($positions);
    }

    public function getAdminCategory(Request $request){
        $column = "created_at";
        $direction = "ASC";
        if($request->orderById != 0){
            $column = "category_id";
            if($request->orderById == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
        }else if ($request->orderByName != 0){
            $column = "name";
            if($request->orderByName == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }
       
        }else if ($request->orderByCreation != 0){
            $column = "created_at";
            if($request->orderByCreation == 1){
                $direction = "ASC";
            }else{
                $direction = "DESC";
            }  
        }

        $categories = PositionCategory::orderBy($column,$direction)->paginate(10);
       
        foreach ($categories as $category) {
            $category->created = date('d.m.Y', strtotime($category->created_at));
            $category->isChecked = false;
        }

        return response()->json($categories) ;
    }



    public function adminChangeUserType(Request $request){
        foreach ($request->users as $user ) {
            if ($user['isChecked'] == true){
                $pos = User::where('id',$user['id'])->update(['type'=> $request->type]);
            }
        }
        return response()->json('Type  was changed sucesfully!');
    }

    public function adminAddCategory(Request $request){
        $pos = PositionCategory::create(['name' => $request->title]);
        return response()->json('Category  was created sucesfully!');
    }

}
