<?php

namespace App\Notifications;

use App\User;
use App\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class RejectProject extends Notification
{
    use Queueable;

    protected $user;
    protected $project;
    
    protected $author;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Project $project)
    {
        $this->user = $user;
        $this->project =$project;
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
            'user_id' => $this->user->id,
            'user_firstname' => $this->user->firstname,
            'user_lastname' => $this->user->lastname,
            'type' => 'n',
            'reject'=>'1',
        ];
    }
}
