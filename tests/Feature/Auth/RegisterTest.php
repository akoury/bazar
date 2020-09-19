<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    protected function successfulRegistrationRoute()
    {
        return route('dashboard');
    }

    protected function registerGetRoute()
    {
        return route('register');
    }

    protected function registerPostRoute()
    {
        return route('register');
    }

    protected function guestMiddlewareRoute()
    {
        return route('dashboard');
    }

    public function testUserCanViewARegistrationForm()
    {
        $response = $this->get($this->registerGetRoute());
        $response->assertSuccessful();
        $response->assertViewIs('auth.register');
    }

    public function testUserCannotViewARegistrationFormWhenAuthenticated()
    {
        $user = User::factory()->make();
        $response = $this->actingAs($user)->get($this->registerGetRoute());
        $response->assertRedirect($this->guestMiddlewareRoute());
    }

    public function testUserCanRegister()
    {
        Event::fake();
        $response = $this->post($this->registerPostRoute(), [
            'email'    => 'john@example.com',
            'password' => 'my-password',
        ]);
        $response->assertRedirect($this->successfulRegistrationRoute());
        $this->assertCount(1, $users = User::all());
        $this->assertAuthenticatedAs($user = $users->first());
        $this->assertEquals('john@example.com', $user->email);
        $this->assertTrue(Hash::check('my-password', $user->password));
        Event::assertDispatched(Registered::class, function ($e) use ($user) {
            return $e->user->id === $user->id;
        });
    }

    public function testUserCannotRegisterWithoutEmail()
    {
        $response = $this->from($this->registerGetRoute())->post($this->registerPostRoute(), [
            'password' => 'my-password',
        ]);
        $users = User::all();
        $this->assertCount(0, $users);
        $response->assertRedirect($this->registerGetRoute());
        $response->assertSessionHasErrors('email');
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertGuest();
    }

    public function testUserCannotRegisterWithInvalidEmail()
    {
        $response = $this->from($this->registerGetRoute())->post($this->registerPostRoute(), [
            'email'    => 'invalid-email',
            'password' => 'my-password',
        ]);
        $users = User::all();
        $this->assertCount(0, $users);
        $response->assertRedirect($this->registerGetRoute());
        $response->assertSessionHasErrors('email');
        $this->assertTrue(session()->hasOldInput('email'));
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertGuest();
    }

    public function testUserCannotRegisterWithoutPassword()
    {
        $response = $this->from($this->registerGetRoute())->post($this->registerPostRoute(), [
            'email'    => 'john@example.com',
            'password' => '',
        ]);
        $users = User::all();
        $this->assertCount(0, $users);
        $response->assertRedirect($this->registerGetRoute());
        $response->assertSessionHasErrors('password');
        $this->assertTrue(session()->hasOldInput('email'));
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertGuest();
    }
}
