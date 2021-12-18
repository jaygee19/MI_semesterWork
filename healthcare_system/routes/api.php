<?php

use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'authenticate']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getAuthenticatedUser']);

        Route::get('/open', [TestController::class, 'open']);

    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('/user', [UserController::class, 'getAuthenticatedUser']);
        Route::get('/closed', [TestController::class, 'closed']);
    });

