<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostIndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $posts = Post::select(['id', 'title', 'slug', 'preview', 'created_at'])
                    ->latest()
                    ->paginate(6);

        return response()->json(['posts' => $posts]);
    }
}
