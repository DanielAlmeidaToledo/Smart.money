<?php

namespace App\Http\Controllers\Api;

use Ramsey\Uuid\Uuid;
use App\Models\Transaction;
use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::select('id', 'user_id', 'title', 'type', 'category', 'amount', 'created_at')->get(10);
        return TransactionResource::collection($transactions);
    }

    public function showTransaction(string $id)
    {
        $transaction = Transaction::select('id', 'user_id', 'title', 'type', 'category', 'amount', 'created_at')
            ->where('id', $id)
            ->firstOrFail();
        return new TransactionResource($transaction);
    }

    public function showTransactionForUser(string $user_id)
    {
        $transactions = Transaction::select('id', 'user_id', 'title', 'type', 'category', 'amount', 'created_at')
            ->where('user_id', $user_id)
            ->get();

        $transactionResources = [];

        foreach ($transactions as $transaction) {
            $transactionResources[] = new TransactionResource($transaction);
        }

        return $transactionResources;
    }

    public function createTransaction(TransactionRequest $request)
    {
        $data = [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'type' => $request->type,
            'title' => $request->title,
            'category' => $request->category,
        ];
        $transaction = Transaction::create($data);

        return new TransactionResource($transaction);
    }

    public function updateTransaction(TransactionRequest $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $data = $request->all();

        if ($request->filled('user_id') && $request->user_id === null)
            $data['user_id'] = $request->user_id;

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
