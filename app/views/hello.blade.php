@extends('layouts.default')

@section('content')

	<div class="large-4 right">
		<div class="callout panel">
			<h4>Dynamic search</h4>
			<span>Search: </span>
			<input type="text" ng-model="search">
		    <p>{{  search ? "Your search by:  "+ search : "" }}</p>
		</div>
	</div>

@stop