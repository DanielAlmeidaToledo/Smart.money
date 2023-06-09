<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return TransactionResource::collection($transactions);
    }

    public function showTransaction(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        return new TransactionResource($transaction);
    }

    public function createTransaction(TransactionRequest $request)
    {
        $data = $request->validated();
        $transaction = Transaction::create($data);

        return new TransactionResource($transaction);
    }

    public function updateTransaction(TransactionRequest $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $data = $request->validated();
        $transaction->update($data);

        return new TransactionResource($transaction);
    }

    public function deleteTransaction(string $id)
    {
        Transaction::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully'
        ]);
    }
}
