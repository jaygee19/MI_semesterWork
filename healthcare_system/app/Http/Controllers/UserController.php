<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

class UserController extends Controller
{
        public function authenticate(Request $request)
        {
                $validator = Validator::make($request->all(), [
                        'password' => 'required',
                        'login_name' => 'required',
                ], [
                        'password.required' => 'Zadajte heslo',
                        'login_name.required' => 'Zadajte vaše meno',
                ]);

                if ($validator->fails()) {
                        return response()->json($validator->errors(), 400);
                }

                $token = JWTAuth::attempt($request->only('login_name', 'password'));

                try {
                        if ($token == null) {
                                return response()->json(['errors' => 'Neplatné prihlasovacie údaje'], 400);
                        }
                } catch (JWTException $e) {
                        return response()->json(['errors' => 'Nie je možne vytvoriť token'], 500);
                }

                $user = User::where('login_name', $request->all()['login_name'])->first();
                $user->api_token = $token;
                $user->save();

                return response()->json(['token' => $token], 200);
        }

        public function register(Request $request)
        {
                $validator = Validator::make($request->all(), [
                        'password' => 'required|string|min:6',
                ], [
                        'password.min:6' => 'Zly pocet znakov',
                ]);

                if ($validator->fails()) {
                        return response()->json($validator->errors(), 400);
                }

                $user = User::create([
                        'login_name' => $request->get('name'),
                        'password' => Hash::make($request->get('password')),
                        'level_access' => "A",
                ]);
                $token = JWTAuth::fromUser($user);
                return response()->json(compact('user', 'token'), 201);
        }

        public function getAuthenticatedUser()
        {
                try {
                        if (!$user = JWTAuth::parseToken()->authenticate()) {
                                return response()->json(['Užívateľa sa nepodarilo nájsť'], 404);
                        }
                } catch (TokenExpiredException $e) {

                        return response()->json(['token_expired'], 'error');
                } catch (TokenInvalidException $e) {

                        return response()->json(['token_invalid'], 'error');
                } catch (JWTException $e) {

                        return response()->json(['token_absent'], 'error');
                }

                return response()->json(compact('user'));
        }

        public function logout(Request $request)
        {
            try {
                $user = User::where('user_id', $request->id)->first();
                $user->update(['api_token' => '',]);  
                return response()->json(['result' => 'Užívateľ úspešne odhlásený'], 200);

            } catch (JWTException $exception) {
                return response()->json(['result' => 'Prepáčte, užívateľa sa nepodarilo odhlásiť'], 500);
            }
        }
}
