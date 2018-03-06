<?php

namespace App\Http\Controllers;

use App\Models\Brand;

class BrandsController extends Controller
{
    public function index()
    {
        $brands = Brand::all();

        return view('brands.index', compact('brands'));
    }

    public function show($id)
    {
        $brand = Brand::findOrFail($id);

        return view('brands.show', compact('brand'));
    }

    public function create()
    {
        return view('brands.create');
    }

    public function store()
    {
        request()->validate([
            'name'   => 'required',
            'slogan' => 'nullable',
        ]);

        $brand = auth()->user()->brands()->create([
            'name'   => request('name'),
            'slogan' => request('slogan'),
        ]);

        return redirect()->route('brands.show', $brand);
    }
}
