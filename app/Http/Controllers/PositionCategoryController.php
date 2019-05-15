<?php

namespace App\Http\Controllers;

use App\PositionCategory;
use App\Notification;
use App\Position;
use App\Message;
use App\Interest;
use Illuminate\Http\Request;


/**
 * This Controller control HTTP request which are dedicated to position's categories
 */
class PositionCategoryController extends Controller
{
    public function index()
    {
        $categories = PositionCategory::get();
     
    	return $categories;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
          ]);

        $category = PositionCategory::create([
            'name'=>$valideted['name'],
        ]);

        return response()->json('New Position Category was created ');
    }

    public function delete(Request $request)
    { 
      $interests = Interest::join('positions', 'positions.id', '=', 'interests.position_id')->where('positions.category_id',$request->category_id)->delete();
      $notification = Message::join('positions', 'messages.position_id', '=', 'positions.id')->where('positions.category_id',$request->category_id)->delete();
		$notification = Notification::join('positions', 'notifications.position_id', '=', 'positions.id')->where('positions.category_id',$request->category_id)->delete();
		$position = Position::where('category_id',$request->category_id)->delete();
		$catgeory = PositionCategory::where('category_id',$request->category_id)->delete();
		
		return response()->json('Category  was deleted sucesfully!'); 
    }

    public function update(Request $request)
    {
      	$validatedData = $request->validate([
        	'title' => 'required',
      	]);

		$position = PositionCategory::where('category_id',$request->category_id)->update([
			'name' => $validatedData['title'],
		]);

		return response()->json('Category information was changed sucesfully!');
    }


}
