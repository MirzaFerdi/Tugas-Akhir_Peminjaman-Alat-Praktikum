<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    // public function login(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'username'     => 'required',
    //         'password'  => 'required'
    //     ]);

    //     //if validation fails
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     //get credentials from request
    //     $credentials = $request->only('username', 'password');

    //     //if auth failed
    //     if(!$token = auth()->guard('api')->attempt($credentials)) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Username atau Password Anda salah'
    //         ], 401);
    //     }

    //     //if auth success
    //     return response()->json([
    //         'success' => true,
    //         'user'    => auth()->guard('api')->user(),
    //         'token'   => $token
    //     ], 200);
    // }

    public function login(Request $request){
        $credentials = $request->only('username', 'password');

        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json(compact('token'));
    }


    public function logout(){
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());

        if($removeToken) {
            //return response JSON
            return response()->json([
                'success' => true,
                'message' => 'Logout Berhasil!',
            ]);
        }
    }



    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'username' => 'required',
    //         'password' => 'required',
    //     ]);
    //     $credentials = $request->only('username', 'password');

    //     $token = Auth::guard('api')->attempt($credentials);
    //     if (!$token) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Unauthorized',
    //         ], 401);
    //     }

    //     $user = Auth::guard('api')->user();
    //     return response()->json([
    //             'status' => 'success',
    //             'user' => $user,
    //             'authorisation' => [
    //                 'token' => $token,
    //                 'type' => 'bearer',
    //             ]
    //         ]);

    // }

    // public function logout()
    // {
    //     Auth::guard('api')->logout();
    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Successfully logged out',
    //     ]);
    // }

    // public function refresh()
    // {
    //     return response()->json([
    //         'status' => 'success',
    //         'user' => Auth::guard('api')->user(),
    //         'authorisation' => [
    //             'token' => Auth::guard('api')->refresh(),
    //             'type' => 'bearer',
    //         ]
    //     ]);
    // }

}
