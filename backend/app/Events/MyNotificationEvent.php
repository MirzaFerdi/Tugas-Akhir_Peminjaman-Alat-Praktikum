<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MyNotificationEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public $role;
    public $userId;

    public function __construct($message, $role , $userId)
    {
        $this->message = $message;
        $this->role = $role;
        $this->userId = $userId;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */


    public function broadcastOn()
    {
        return new Channel('backend-notification-channel-'. $this->role. '-' . $this->userId);
    }

    public function broadcastAs()
    {
        return 'notification-event';
    }
}
