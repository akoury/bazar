<?php

namespace App\Http\Controllers;

use App\Models\Brand;

class BrandsController extends Controller
{
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

        $brand = Brand::create([
            'name'   => request('name'),
            'slogan' => request('slogan'),
        ]);

        $brand->users()->attach(auth()->id());

        return redirect()->route('brands.show', $brand);
    }
}
