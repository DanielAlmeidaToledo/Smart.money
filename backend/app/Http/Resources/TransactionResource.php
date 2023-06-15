<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'type' => $this->type,
            'category' => $this->category,
            'amount' => $this->amount,
            'created_at' => Carbon::make($this->created_at)->format('d-m-Y'),
        ];
    }
}
