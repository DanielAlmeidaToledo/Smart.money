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

        // Define o nome do cookie
        $cookieName = 'last_activity';

        // Define o tempo de inatividade desejado (1 minuto)
        $tempo_inatividade = 5;

        // Verifica se o cookie existe e se o usuário está inativo há mais de 1 minuto
        if ($request->hasCookie($cookieName) && (time() - $request->cookie($cookieName) > $tempo_inatividade)) {
            // Redireciona o usuário para a página de login
            return redirect('login')->cookie(Cookie::forget($cookieName));
        }

        // Define o valor do cookie como o tempo atual
        $cookieValue = time();

        // Retorna a resposta JSON com o usuário autenticado e define o cookie
        return response()->json([
            'user' => $user,
        ])->withCookie($cookieName, $cookieValue, $tempo_inatividade);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        // Encerra a sessão e remove as informações de autenticação
        $request->session()->forget('usuario');

        return redirect('login')->cookie(Cookie::forget('last_activity'));
    }
}
