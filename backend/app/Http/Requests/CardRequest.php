<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'user_id' => [
                'required',
                'exists:users,id',
            ],
            'card_name' => [
                'required',
                'string',
                'max:255',
            ],
            'bank' => [
                'required',
                'string',
                'max:255',
            ],
        ];

        if ($this->getMethod() === 'PATCH') {
            $rules['user_id'] = [
                'nullable',
                'exists:users,id',
            ];
        }

        return $rules;
    }
}
