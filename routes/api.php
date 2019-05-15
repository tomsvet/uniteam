<?php

use Illuminate\Http\Request;

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



Route::group(['middleware' => ['web']], function () {
    Route::post('login','Auth\LoginController@login');  
    Route::post('register','Auth\RegisterController@register');  
    Route::post('logout','Auth\LoginController@logout');
    Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail'); 
    Route::post('password/reset','Auth\ResetPasswordController@reset');
    Route::get('users/supervisors', 'UserController@supervisor');
    Route::get('/getUser', 'UserController@getLoggedUser');
    
    
       
});


Route::post('updateUser','UserController@update');
Route::delete('deletePerson','UserController@delete');
Route::get('supervisor', 'UserController@supervisor');
Route::get('users', 'UserController@index');
Route::post('updateEmail', 'UserController@updateEmail');
Route::post('updatePassword', 'UserController@updatePassword');
Route::get('user/{id}', 'UserController@show');
Route::post('updateName', 'UserController@updateName');
Route::post('updateFaculty', 'UserController@updateFaculty');
Route::post('updateMyPosition', 'UserController@updatePosition');
Route::post('updateAbout', 'UserController@updateAbout');
Route::post('AddPerson', 'UserController@ApprovePerson');
Route::post('RejectPerson', 'UserController@RejectPerson');
Route::post('saveCV','UserController@saveCV');
Route::post('deleteCV','UserController@deleteCV');
Route::get('downloadCV/{id}','UserController@downloadCV');
Route::post('saveImage','UserController@saveImage');




Route::get('projects', 'ProjectController@index');
Route::get('projectsActive', 'ProjectController@getActive');
Route::get('projectsEnded', 'ProjectController@getEnded');
Route::post('projects', 'ProjectController@store');
Route::post('update', 'ProjectController@update');
Route::delete('deleteProject', 'ProjectController@delete');
Route::get('project/{id}', 'ProjectController@show');
Route::get('showUserProject/{id}', 'ProjectController@showUserProject');
Route::post('ApproveProject', 'ProjectController@approveProject');
Route::delete('RejectProject','ProjectController@rejectProject');
Route::post('changeState', 'ProjectController@changeState');
Route::post('saveCover','ProjectController@saveCover');


Route::get('getInterests/{id}', 'InterestController@index');
Route::post('interest', 'InterestController@store');
Route::delete('interestCancel', 'InterestController@delete');


Route::get('/positionCategory', 'PositionCategoryController@index');
Route::post('/updateCategory', 'PositionCategoryController@update');
Route::delete('/deleteCategory', 'PositionCategoryController@delete');


Route::post('/updatePosition', 'PositionController@update');
Route::delete('/deletePosition', 'PositionController@delete');
Route::post('/createPosition', 'PositionController@store');
Route::post('removeChooseUser', 'PositionController@removeChooseUser');
Route::post('ChooseUser', 'PositionController@chooseUser');




Route::get('notifications/{id}', 'NotificationController@getNotifications');
Route::get('notificationsAll/{id}', 'NotificationController@getAllNotifications');
Route::post('setNotificationsRead', 'NotificationController@setNotificationsRead');
Route::get('newNotifications/{id}', 'NotificationController@getNewNotifications');
Route::post('recommend', 'NotificationController@sendRecommend');


Route::get('message/{id}', 'MessageController@show');
Route::get('messages/{id}', 'MessageController@index');
Route::post('message/sendAnswer', 'MessageController@store');





Route::post('setBookmark','BookmarkController@store');
Route::delete('deleteBookmark/{id}','BookmarkController@delete');
Route::get('bookmarks/{id}','BookmarkController@show');



Route::get('getAdminData','AdminController@getAdminData');

Route::get('getAdminProjects','AdminController@getAdminProjects');
Route::get('getAdminPositions','AdminController@getAdminPositions');
Route::get('getAdminUsers','AdminController@getAdminUsers');
Route::get('getAdminCategory','AdminController@getAdminCategory');
Route::get('getAdminProjectsStatistics','AdminController@getAdminProjectsStatistics');
Route::get('getAdminUsersStatistics','AdminController@getAdminUsersStatistics');
Route::get('getAdminPositionsStatistics','AdminController@getAdminPositionsStatistics');
Route::get('getAdminCategoriesStatistics','AdminController@getAdminCategoriesStatistics');
Route::post('adminRemoveProjects','AdminController@adminRemoveProjects');
Route::post('adminRemoveUsers','AdminController@adminRemoveUsers');
Route::post('adminRemovePositions','AdminController@adminRemovePositions');
Route::post('adminRemoveCategories','AdminController@adminRemoveCategories');
Route::post('adminAddCategory','AdminController@adminAddCategory');
Route::post('adminChangeUserType','AdminController@adminChangeUserType');
