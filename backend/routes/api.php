<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'showUser']);

Route::post('/users', [UserController::class, 'register']);

Route::patch('/users/{id}', [UserController::class, 'updateUser']);

Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

Route::get('/', function () {
    return redirect('/users');
});
