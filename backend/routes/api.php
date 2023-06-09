<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\GoalController;
use App\Http\Controllers\Api\TransactionController;

# Rotas para autenticação
Route::post('/login', [AuthController::class, 'auth']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

# Rotas para o CRUD de usuários
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'showUser']);
Route::post('/users', [UserController::class, 'register']);
Route::patch('/users/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

# Rotas para o CRUD de transações
Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/transactions/{id}', [TransactionController::class, 'showTransaction']);
Route::get('/transactions/user/{user_id}', [TransactionController::class, 'showTransactionForUser']);
Route::post('/transactions', [TransactionController::class, 'createTransaction']);
Route::patch('/transactions/{id}', [TransactionController::class, 'updateTransaction']);
Route::delete('/transactions/{id}', [TransactionController::class, 'deleteTransaction']);

# Rotas para o CRUD de cartões
Route::get('/cards', [CardController::class, 'index']);
Route::get('/cards/{id}', [CardController::class, 'showCard']);
Route::get('/cards/user/{user_id}', [CardController::class, 'showCardForUser']);
Route::post('/cards', [CardController::class, 'createCard']);
Route::patch('/cards/{id}', [CardController::class, 'updateCard']);
Route::delete('/cards/{id}', [CardController::class, 'deleteCard']);

# Rotas para o CRUD de goals
Route::get('/goals', [GoalController::class, 'index']);
Route::get('/goals/{id}', [GoalController::class, 'showGoal']);
Route::get('/goals/user/{user_id}', [GoalController::class, 'showGoalForUser']);
Route::post('/goals', [GoalController::class, 'createGoal']);
Route::patch('/goals/{id}', [GoalController::class, 'updateGoal']);
Route::delete('/goals/{id}', [GoalController::class, 'deleteGoal']);

# Rota para a página inicial da API
Route::get('/', function () {
    return response()->json([
        'message' => 'Erro na rota',
    ]);
});
