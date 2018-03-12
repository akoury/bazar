<?php

Route::domain('bazar.test')->group(function () {
    Route::view('/', 'home')->name('home');
    Route::view('/dashboard', 'dashboard')->name('dashboard')->middleware('auth');

    Route::get('brands', 'BrandsController@index')->name('brands.index');
    Route::get('brands/create', 'BrandsController@create')->name('brands.create')->middleware('auth');
    Route::post('brands', 'BrandsController@store')->name('brands.store')->middleware('auth');

    //mover a domain group
    Route::get('products/{id}/edit', 'ProductsController@edit')->name('products.edit')->middleware('auth');
    Route::patch('products/{id}', 'ProductsController@update')->name('products.update')->middleware('auth');

    Route::post('products/{id}/orders', 'OrdersController@store')->name('orders.store');
    Route::get('orders/{confirmationNumber}', 'OrdersController@show')->name('orders.show');

    Auth::routes();
});

Route::domain('{domain}')->group(function () {
    Route::get('/', 'BrandsController@show')->name('brands.show');
    Route::get('products', 'ProductsController@index')->name('products.index');
    Route::get('products/create', 'ProductsController@create')->name('products.create')->middleware('auth');
    Route::post('products', 'ProductsController@store')->name('products.store')->middleware('auth');
    Route::get('products/{id}', 'ProductsController@show')->name('products.show');
});
