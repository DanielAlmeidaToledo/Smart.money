<?php

namespace App\Http\Controllers\Api;

use App\Models\Card;
use Ramsey\Uuid\Uuid;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Http\Controllers\Controller;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::select('id', 'user_id', 'card_name', 'bank', 'created_at')->get(10);
        return CardResource::collection($cards);
    }

    public function showCard(string $id)
    {
        $card = Card::select('id', 'user_id', 'card_name', 'bank')
            ->where('id', $id)
            ->findOrFail();
        return new CardResource($card);
    }

    public function createCard(CardRequest $request)
    {
        $data = [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => $request->user_id,
            'card_name' => $request->card_name,
            'bank' => $request->bank,
        ];
        $card = Card::create($data);

        return new CardResource($card);
    }

    public function updateCard(CardRequest $request, string $id)
    {
        $card = Card::findOrFail($id);
        $data = $request->all();

        if ($request->filled('user_id') && $request->user_id === null)
            $data['user_id'] = $request->user_id;

        $card->update($data);

        return new CardResource($card);
    }

    public function deleteCard(string $id)
    {
        Card::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Card deleted successfully'
        ], 200);
    }
}
