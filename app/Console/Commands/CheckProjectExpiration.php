<?php

namespace App\Console\Commands;

use App\Project;
use App\User;
use App\Notifications\ExpiredProject;
use Illuminate\Console\Command;

class CheckProjectExpiration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:checkProjectExpiration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $projects = Project::whereDate('end','<',date('Y-m-d'))->whereIn('state',[0,1])->get();
      
        foreach ($projects as $project){
            $user = User::where('id',$project->user_id)->first();
            $user->notify(new ExpiredProject($project->id));
        } 
        $projects = Project::whereDate('end','<',date('Y-m-d'))->whereIn('state',[0,1])->update([ 'state' => 4 ]);
        echo "Checked Projects \n";
    }
}
