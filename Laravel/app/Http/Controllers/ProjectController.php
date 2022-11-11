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
     * Get all of project.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function projectList()
    {
        $projects = DB::table('projects')->get();
        return $projects->toJson();
    }

    /**
     * Get Individual Project.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function projectInformation($id = null)
    {        
        $projectInfo = DB::table('projects')->where('id',$id)->get();
        return $projectInfo->toJson();
    }

    /**
     * Get Project Project.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function taskInformation($id = null)
    {        
        $projectInfo = DB::table('tasks')->where('projectId',$id)->get();
        return $projectInfo->toJson();
    }

    /**
     * Insert the Project data insert.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addProject(Request $request){
        if($request->all()){
            DB::table('projects')->insert($request->all());
            return response()->json(['message' => 'Success'], 201);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
     /**
     * Insert the Task data insert.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addTask(Request $request){
        $inputs = $request->all();
        if($inputs){
          $id =  DB::table('tasks')->insertGetId($request->all());
          $inputs['id'] = $id;
            return response()->json(['message'=>'success!', 'data'=> $inputs], 201);
           
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

}