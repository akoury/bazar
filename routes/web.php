<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'home')->name('home');
Route::view('/dashboard', 'dashboard')->name('dashboard')->middleware('auth');

Route::get('brands/create', 'BrandsController@create')->name('brands.create')->middleware('auth');
Route::get('brands/{id}', 'BrandsController@show')->name('brands.show');
Route::post('brands', 'BrandsController@store')->name('brands.store')->middleware('auth');

Route::get('products', 'ProductsController@index')->name('products.index');
Route::get('brands/{id}/products/create', 'ProductsController@create')->name('products.create')->middleware('auth');
Route::post('brands/{id}/products', 'ProductsController@store')->name('products.store')->middleware('auth');
Route::get('products/{id}', 'ProductsController@show')->name('products.show');
Route::get('products/{id}/edit', 'ProductsController@edit')->name('products.edit')->middleware('auth');
Route::patch('products/{id}', 'ProductsController@update')->name('products.update')->middleware('auth');

Route::post('products/{id}/orders', 'OrdersController@store')->name('orders.store');
Route::get('orders/{confirmationNumber}', 'OrdersController@show')->name('orders.show');

Auth::routes();
