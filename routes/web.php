<?php
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/{path?}', function () {
    if( Auth::check())
        return view('welcome');
    else
        return view('index');
});*/


/*Route::get('{slug?}', function() {
    return view('index');
})
->where('slug?', '(?!api)([A-z\d-\/_.]+)?');*/



//resource

/*Route::get('/', function () {
    if( Auth::check())

        return view('welcome');
    else
        return view('welcome');
});*/




//Route::view('/{path?}', 'index');
 
Auth::routes();

Route::view('/','index')->name('signin');
Route::view('/signup', 'index');
Route::get('{slug?}', 'HomeController@index');
/*Route::get('/signin', 'HomeController@index')->name('home');*/


Route::get('/admin/{path?}', 'AdminController@admin')    
    ->middleware('is_admin')    
    ->name('admin');

   // Route::view('/admin/{path?}', 'index');



Route::view('/{path?}','index');


//Route::get('/{path?}', 'HomeController@index');

Route::view('/project/{id}', 'index');
Route::view('/user/{id}', 'index');
Route::view('/message/{id}', 'index');

//Route::view('/{path?}', 'index');
/*Route::view('/signup', 'index');



*/


//Route::resource('projects', 'ProjectController');
//Route::get('/admin','AdminController@index')->name('admin');