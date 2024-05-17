<?php

namespace App\Http\Controllers;

use App\Mail\SendEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('username', 'password');

        if(!$token = JWTAuth::attempt($credentials)){
            $user = User::where('username', $request->username)->first();

            if(!$user){
                return response()->json(['error' => 'NIP atau NIM anda tidak ditemukan!'], Response::HTTP_NOT_FOUND);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Password yang anda masukkan salah!'], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();
        return response()->json(compact('user','token'));
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

    public function forgotPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Email yang anda masukkan tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        // Generate a unique token for the password reset process
        $token = Str::random(255);
        $nama = $user->nama;
        $email = $user->email;

        // Store the token in a temporary storage mechanism (e.g., database)
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'nama' => $nama,
            'token' => $token,
            'created_at' => now(),
        ]);

        // Optionally, send an email to the user with a link containing the token
        // Your email sending logic here...
        $email = new SendEmail($email,$nama,$token);
        Mail::to($request->email)->send($email);

        return response()->json(['success' => true, 'message' => 'Token reset password dikirimkan ke email anda', 'email' => $user->email]);
    }
    public function resetPassword(Request $request){
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Check if token exists in the database
        $token = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$token) {
            return response()->json(['success' => false, 'message' => 'Token yang anda masukkan salah!'], Response::HTTP_BAD_REQUEST);
        }

        // Update user's password
        $user = User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        // Optionally, delete the token from the database after password reset
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json(['success' => true, 'message' => 'Reset password berhasil!']);
    }


}
