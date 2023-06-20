<?php

namespace App\Http\Controllers\Api;

use App\Models\Goal;
use Ramsey\Uuid\Uuid;
use App\Http\Requests\GoalRequest;
use App\Http\Resources\GoalResource;
use App\Http\Controllers\Controller;

class GoalController extends Controller
{
    public function index()
    {
        $goals = Goal::select('id', 'user_id', 'title', 'type', 'amount', 'balance', 'created_at')->get(10);
        return GoalResource::collection($goals);
    }

    public function showGoal(string $id)
    {
        $goal = Goal::select('id', 'user_id', 'title', 'type', 'amount', 'balance', 'created_at')
            ->where('id', $id)
            ->firstOrFail();
        return new GoalResource($goal);
    }

    public function showGoalForUser(string $user_id)
    {
        $goals = Goal::select('id', 'user_id', 'title', 'type', 'amount', 'balance', 'created_at')
            ->where('user_id', $user_id)
            ->get();

        $goalResources = [];

        foreach ($goals as $goal) {
            $goalResources[] = new GoalResource($goal);
        }

        return $goalResources;
    }

    public function createGoal(GoalRequest $request)
    {
        $data = [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => $request->user_id,
            'title' => $request->title,
            'type' => $request->type,
            'amount' => $request->amount,
            'balance' => $request->balance,
        ];
        $goal = Goal::create($data);

        return new GoalResource($goal);
    }

    public function updateGoal(GoalRequest $request, string $id)
    {
        $goal = Goal::findOrFail($id);
        $data = $request->all();

        if ($request->filled('user_id') && $request->user_id === null)
            $data['user_id'] = $request->user_id;

        $goal->update($data);

        return new GoalResource($goal);
    }

    public function deleteGoal(string $id)
    {
        Goal::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Goal deleted successfully'
        ], 200);
    }
}
