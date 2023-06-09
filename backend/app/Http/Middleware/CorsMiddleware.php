<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Defina as configurações do CORS
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Adicione as seguintes linhas para lidar com as solicitações OPTIONS
        if ($request->getMethod() === 'OPTIONS') {
            $response->headers->set('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
            $response->headers->set('Access-Control-Max-Age', '86400');
            $response->setStatusCode(200);
        }

        // Defina o cabeçalho Access-Control-Allow-Credentials como 'true'
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
