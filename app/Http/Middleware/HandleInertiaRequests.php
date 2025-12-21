<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class HandleInertiaRequests extends Middleware
{

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'imageUrl' => config('app.image_url'),
        ]);
    }
}
