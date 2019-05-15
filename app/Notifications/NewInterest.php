<?php

namespace App\Notifications;

//use App\Notification;
use App\User;
use App\Project;
use App\Position;
use Illuminate\Bus\Queueable;
///use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class NewInterest extends Notification 
{
    use Queueable;


    protected $user;
    protected $message;
    protected $project;
    protected $position;
    protected $author;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Int $message, Int $project_id, Int $position_id)
    {
        $this->user = $user;
        $this->message = $message;
        $this->project = Project::where('id',$project_id)->first();
        $this->position = Position::where('id',$position_id)->first();
        $this->author = User::where('id',$this->project->user_id)->first();
   
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    /*public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }*/

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'project_id' => $this->project->id,
            'project_title' => $this->project->title,
            'author' => [
                'id' => $this->author->id,
                'firstname' => $this->author->firstname,
                'lastname' => $this->author->lastname,
            ],
            'message'=>$this->message,
            'position_id' => $this->position->id,
            'position_title' => $this->position->title,
            'position_free' => $this->position->user_id,
            'user_id' => $this->user->id,
            'user_firstname' => $this->user->firstname,
            'user_lastname' => $this->user->lastname,
            'type' => 'n',
            
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
    public function broadcastType()
    {
        return 'new-interest';
    }
}
