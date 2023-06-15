<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoalResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'type' => strtoupper($this->type),
            'amount' => $this->amount,
            'balance' => $this->balance,
            'created_at' => Carbon::make($this->created_at)->format('d-m-Y'),
        ];
    }
}
