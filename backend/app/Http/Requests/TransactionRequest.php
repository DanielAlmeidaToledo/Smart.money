<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'type' => [
                'required',
                'string',
                Rule::in(['income', 'expense']),
            ],
            'category' => [
                'required',
                'string',
                'max:255',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],
        ];

        if ($this->getMethod() === 'PATCH') {
            $rules['user_id'] = [
                'nullable',
                'exists:users,id',
            ];

            $rules['type'] = [
                'nullable',
                'string',
                Rule::in(['income', 'expense']),
            ];
        }

        return $rules;
    }
}
