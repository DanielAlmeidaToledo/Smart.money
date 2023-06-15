<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $table = 'goal';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'type',
        'amount',
        'balance',
    ];

    // Relação com o modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
