<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = 'card';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'card_name',
        'bank',
    ];

    // Relação com o modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
