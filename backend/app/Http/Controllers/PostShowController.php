<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostShowController extends Controller
{
    public function __invoke(Request $request, $slug)
    {
        $post = Post::where('slug', $slug)
                    ->select(['title', 'body', 'created_at'])
                    ->firstOrFail();

        return response()->json(['post' => $post]);
    }
}
