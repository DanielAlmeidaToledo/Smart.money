<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transaction';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'type',
        'category',
        'amount',
    ];

    // Relação com o modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
