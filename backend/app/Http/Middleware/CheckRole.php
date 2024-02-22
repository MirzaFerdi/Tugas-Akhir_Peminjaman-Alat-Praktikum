<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $role)
    {
        // if (!$request->user()->hasRole($role)) {
        //     return response()->json([
        //         'message' => 'Unauthorized'
        //     ], Response::HTTP_UNAUTHORIZED);
        // }
        // return $next($request);


        $explode = explode('|', $role);

        foreach ($explode as $key => $value) {
            if ($request->user()->role->name == $value) {
                return $next($request);
            }
        }

        return abort(403, 'Unauthorized action');
    }
}
