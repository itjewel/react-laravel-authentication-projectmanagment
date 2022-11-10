<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function projectList()
    {
        $users = DB::table('projects')->get();
        return $users->toJson();
    }

    public function addProject(Request $request){
        if($request->all()){
            DB::table('projects')->insert($request->all());
            return response()->json(['message' => 'Success'], 201);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

}