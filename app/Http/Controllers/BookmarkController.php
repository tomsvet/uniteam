<?php

namespace App\Http\Controllers;

use App\Bookmark;
use Illuminate\Http\Request;

/**
 * This Controller control HTTP request which are dedicated to Bookmarks
 */
class BookmarkController extends Controller
{
    public function index()
    {


    }

    public function store(Request $request)
    {
        $bookmark = Bookmark::create([
            'project_id'=> $request->project_id, 
            'booker_id' => $request->user_id,
        ]);
        return response()->json('Bookmark created!');
    }


    public function delete($id)
    {
        $bookmark = Bookmark::where('id',$id)->delete();
        return response()->json('Bookmark deleted!');
    }

    public function show($id)
    {
        $bookmarks = Bookmark::where('booker_id',$id)->get();
        return $bookmarks;
    }
}
