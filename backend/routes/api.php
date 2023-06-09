<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TransactionController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'showUser']);
Route::post('/users', [UserController::class, 'register']);
Route::patch('/users/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/transactions/{id}', [TransactionController::class, 'showTransaction']);
Route::post('/transactions', [TransactionController::class, 'createTransaction']);
Route::patch('/transactions/{id}', [TransactionController::class, 'updateTransaction']);
Route::delete('/transactions/{id}', [TransactionController::class, 'deleteTransaction']);

Route::get('/', function () {
    return redirect('/users');
});
