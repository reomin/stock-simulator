<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //クエリーパラメータで受け取った値を取得する。
        $symbol = $request->query('q');

        $url = "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/search";

        $response = Http::withHeaders([
            'X-RapidAPI-Host' => 'yahoo-finance15.p.rapidapi.com',
            'X-RapidAPI-Key' => env("YF_API_KEY")
        ])->get($url, [
            "search" => $symbol
        ]);

        $data = $response->json();

        dd($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return "こんにちは";
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
