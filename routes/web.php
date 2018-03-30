<?php

Route::view('/', 'home')->name('home');
Route::view('/dashboard', 'dashboard')->name('dashboard')->middleware('auth');

Route::get('brands', 'BrandsController@index')->name('brands.index');
Route::get('brands/create', 'BrandsController@create')->name('brands.create')->middleware('auth');
Route::get('brands/{id}', 'BrandsController@show')->name('brands.show');
Route::post('brands', 'BrandsController@store')->name('brands.store')->middleware('auth');

Route::get('brands/{id}/products', 'ProductsController@index')->name('products.index');
Route::get('brands/{id}/products/create', 'ProductsController@create')->name('products.create')->middleware('auth');
Route::post('brands/{id}/products', 'ProductsController@store')->name('products.store')->middleware('auth');
Route::get('brands/{brandId}/products/{id}', 'ProductsController@show')->name('products.show');
Route::get('products/{id}/edit', 'ProductsController@edit')->name('products.edit')->middleware('auth');
Route::patch('products/{id}', 'ProductsController@update')->name('products.update')->middleware('auth');

Route::get('cart', 'CartsController@show')->name('carts.show');
Route::post('products/{id}/add', 'CartsController@store')->name('carts.store');
Route::post('products/{id}/remove', 'CartsController@destroy')->name('carts.destroy');

Route::post('products/{id}/orders', 'OrdersController@store')->name('orders.store');
Route::get('orders', 'OrdersController@index')->name('orders.index')->middleware('auth');
Route::get('orders/{confirmationNumber}', 'OrdersController@show')->name('orders.show');

Auth::routes();
