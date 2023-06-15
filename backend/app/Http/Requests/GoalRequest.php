<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoalRequest extends FormRequest
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
                'max:255',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],
            'balance' => [
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

            $rules['title'] = [
                'nullable',
                'string',
                'max:255',
            ];
        }

        return $rules;
    }
}
