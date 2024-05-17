<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $nama;
    public $token;

    /**
     * Create a new message instance.
     */
    public function __construct($email,$nama,$token)
    {
        $this->email = $email;
        $this->nama = $nama;
        $this->token = $token;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Send Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.email_template',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->subject('Reset Password') // Set the email subject
                    ->view('emails.email_template') // Set the email view template
                    ->with([
                        'email' => $this->email,
                        'nama' => $this->nama,
                        'token' => $this->token
                    ]); // Pass the token to the view
    }
}
