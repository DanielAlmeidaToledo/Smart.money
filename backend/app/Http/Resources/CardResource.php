<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'card_name' => $this->card_name,
            'bank' => strtoupper($this->bank),
            'created_at' => Carbon::make($this->created_at)->format('d-m-Y'),
        ];
    }
}
