<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	$products = Product::all();
	return View::make('hello');
});


Route::get('/products', function(){
	$products = Product::all()->toArray();
	return View::make('product.index')->with('products', $products);
});