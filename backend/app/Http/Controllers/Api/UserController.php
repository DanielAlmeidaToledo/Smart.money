<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Ramsey\Uuid\Uuid;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUpdateUserRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'created_at')->get(10);
        return UserResource::collection($users);
    }

    public function showUser(string $id)
    {
        $user = User::select('id', 'name', 'email', 'created_at')
            ->where('id', $id)
            ->firstOrFail();

        return new UserResource($user);
    }

    public function register(RegisterUpdateUserRequest $request)
    {
        $data = [
            'id' => Uuid::uuid4()->toString(),
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'email' => $request->email
        ];
        $user = User::create($data);

        return new UserResource($user);
    }

    public function updateUser(RegisterUpdateUserRequest $request, string $id)
    {
        $user = User::findOrFail($id);
        $data = $request->all();

        if ($request->filled('password'))
            $data['password'] = bcrypt($request->password);

        $user->update($data);

        return new UserResource($user);
    }

    public function deleteUser(string $id)
    {
        Schema::disableForeignKeyConstraints();
        DB::transaction(function () use ($id) {
            User::findOrFail($id)->delete();
        });
        Schema::enableForeignKeyConstraints();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
