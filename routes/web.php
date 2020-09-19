<?php

use Illuminate\Support\Facades\Route;

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

Route::get('brands', 'BrandsController@index')->name('brands.index');
Route::get('brands/create', 'BrandsController@create')->name('brands.create')->middleware('auth');
Route::get('brands/{id}', 'BrandsController@show')->name('brands.show');
Route::post('brands', 'BrandsController@store')->name('brands.store')->middleware('auth');

Route::get('brands/{id}/products', 'ProductModelsController@index')->name('product-models.index');
Route::get('brands/{id}/products/create', 'ProductModelsController@create')->name('product-models.create')->middleware('auth');
Route::post('brands/{id}/models', 'ProductModelsController@store')->name('product-models.store')->middleware('auth');
Route::get('products/{id}/edit', 'ProductModelsController@edit')->name('product-models.edit')->middleware('auth');
Route::patch('models/{id}', 'ProductModelsController@update')->name('product-models.update')->middleware('auth');
Route::delete('models/{id}', 'ProductModelsController@destroy')->name('product-models.destroy')->middleware('auth');

Route::get('brands/{brandId}/products/{id}', 'ProductsController@show')->name('products.show');
Route::delete('products/{id}', 'ProductsController@destroy')->name('products.destroy')->middleware('auth');

Route::get('cart', 'CartsController@show')->name('carts.show');
Route::post('products/{id}/add', 'CartsController@store')->name('carts.store');
Route::post('products/{id}/update', 'CartsController@update')->name('carts.update');
Route::delete('products/{id}/remove', 'CartsController@destroy')->name('carts.destroy');

Route::get('orders', 'OrdersController@index')->name('orders.index')->middleware('auth');
Route::get('orders/create', 'OrdersController@create')->name('orders.create');
Route::post('orders/store/{id?}', 'OrdersController@store')->name('orders.store');
Route::get('orders/{confirmationNumber}', 'OrdersController@show')->name('orders.show');

Auth::routes();
