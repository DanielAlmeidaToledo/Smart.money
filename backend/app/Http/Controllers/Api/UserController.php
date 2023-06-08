<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Ramsey\Uuid\Uuid;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUpdateUserRequest;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate();
        return UserResource::collection($users);
    }

    public function showUser(string $id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function register(RegisterUpdateUserRequest $request)
    {
        $data = $request->validated();
        $data['id'] = Uuid::uuid4()->toString();
        $data['password'] = bcrypt($request->password);
        $user = User::create($data);

        return new UserResource($user);
    }

    public function updateUser(RegisterUpdateUserRequest $request, string $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();

        if ($request->has('password'))
            $data['password'] = bcrypt($request->password);

        $user->update($data);

        return new UserResource($user);
    }

    public function deleteUser(string $id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
