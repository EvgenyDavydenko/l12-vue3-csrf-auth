<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'body',
        'preview',
    ];

    protected static function booted(): void
    {
        static::creating(function ($post) {
            $post->slug = Str::slug($post->title);
        });
    }
}
