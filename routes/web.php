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

Route::view('about', 'about')->name('about');

Route::get('products', 'ProductsController@index')->name('products.index');
Route::get('products/{id}', 'ProductsController@show')->name('products.show');

Route::post('products/{id}/orders', 'OrdersController@store')->name('orders.store');
Route::get('orders/{confirmationNumber}', 'OrdersController@show')->name('orders.show');

Auth::routes();
