<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function auth(AuthRequest $request)
    {
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'error' => 'Email ou senha incorretos',
            ]);
        }
    
        $cookieName = 'user_auth';
    
        $cookieValue = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
        ];
    
        return response()->json($cookieValue)->cookie($cookieName, json_encode($cookieValue));
    }

    public function logout(Request $request)
    {
        // Remove o cookie 'user_auth'
        return response('Logout realizado')->cookie(Cookie::forget('user_auth'));
    }
}
