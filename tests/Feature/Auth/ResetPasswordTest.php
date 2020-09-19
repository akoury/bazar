<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ResetPasswordTest extends TestCase
{
    use RefreshDatabase;

    protected function getValidToken($user)
    {
        return Password::broker()->createToken($user);
    }

    protected function getInvalidToken()
    {
        return 'invalid-token';
    }

    protected function passwordResetGetRoute($token)
    {
        return route('password.reset', $token);
    }

    protected function passwordResetPostRoute()
    {
        return '/password/reset';
    }

    protected function successfulPasswordResetRoute()
    {
        return route('dashboard');
    }

    protected function guestMiddlewareRoute()
    {
        return route('dashboard');
    }

    public function testUserCanViewAPasswordResetForm()
    {
        $user = User::factory()->create();
        $response = $this->get($this->passwordResetGetRoute($token = $this->getValidToken($user)));
        $response->assertSuccessful();
        $response->assertViewIs('auth.passwords.reset');
        $response->assertViewHas('token', $token);
    }

    public function testUserCannotViewAPasswordResetFormWhenAuthenticated()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get($this->passwordResetGetRoute($this->getValidToken($user)));
        $response->assertRedirect($this->guestMiddlewareRoute());
    }

    public function testUserCanResetPasswordWithValidToken()
    {
        Event::fake();
        $user = User::factory()->create();
        $this->withoutExceptionHandling();
        $response = $this->post($this->passwordResetPostRoute(), [
            'token'                 => $this->getValidToken($user),
            'email'                 => $user->email,
            'password'              => 'new-awesome-password',
            'password_confirmation' => 'new-awesome-password',
        ]);
        $response->assertRedirect($this->successfulPasswordResetRoute());
        $this->assertEquals($user->email, $user->fresh()->email);
        $this->assertTrue(Hash::check('new-awesome-password', $user->fresh()->password));
        $this->assertAuthenticatedAs($user);
        Event::assertDispatched(PasswordReset::class, function ($e) use ($user) {
            return $e->user->id === $user->id;
        });
    }

    public function testUserCannotResetPasswordWithInvalidToken()
    {
        $user = User::factory()->create([
            'password' => bcrypt('old-password'),
        ]);
        $response = $this->from($this->passwordResetGetRoute($this->getInvalidToken()))->post($this->passwordResetPostRoute(), [
            'token'                 => $this->getInvalidToken(),
            'email'                 => $user->email,
            'password'              => 'new-awesome-password',
            'password_confirmation' => 'new-awesome-password',
        ]);
        $response->assertRedirect($this->passwordResetGetRoute($this->getInvalidToken()));
        $this->assertEquals($user->email, $user->fresh()->email);
        $this->assertTrue(Hash::check('old-password', $user->fresh()->password));
        $this->assertGuest();
    }

    public function testUserCannotResetPasswordWithoutProvidingANewPassword()
    {
        $user = User::factory()->create([
            'password' => bcrypt('old-password'),
        ]);
        $response = $this->from($this->passwordResetGetRoute($token = $this->getValidToken($user)))->post($this->passwordResetPostRoute(), [
            'token'                 => $token,
            'email'                 => $user->email,
            'password'              => '',
            'password_confirmation' => '',
        ]);
        $response->assertRedirect($this->passwordResetGetRoute($token));
        $response->assertSessionHasErrors('password');
        $this->assertTrue(session()->hasOldInput('email'));
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertEquals($user->email, $user->fresh()->email);
        $this->assertTrue(Hash::check('old-password', $user->fresh()->password));
        $this->assertGuest();
    }

    public function testUserCannotResetPasswordWithoutProvidingAnEmail()
    {
        $user = User::factory()->create([
            'password' => bcrypt('old-password'),
        ]);
        $response = $this->from($this->passwordResetGetRoute($token = $this->getValidToken($user)))->post($this->passwordResetPostRoute(), [
            'token'                 => $token,
            'email'                 => '',
            'password'              => 'new-awesome-password',
            'password_confirmation' => 'new-awesome-password',
        ]);
        $response->assertRedirect($this->passwordResetGetRoute($token));
        $response->assertSessionHasErrors('email');
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertEquals($user->email, $user->fresh()->email);
        $this->assertTrue(Hash::check('old-password', $user->fresh()->password));
        $this->assertGuest();
    }
}
