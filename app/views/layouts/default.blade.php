<!doctype html>
<html class="no-js" lang="en" ng-app>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>Primeiro projeto com Angular.js + Laravel</title>

    <link rel="stylesheet" href="/assets/css/foundation.css" type="text/css" />    
    <link rel="stylesheet" href="/assets/css/foundation-icons/foundation-icons.css" type="text/css" />
	
	<script src="/assets/js/angular.min.js"></script>

  </head>
  <body>
    
    <div class="row">
      <div class="large-12 columns">
      	<h2 class="text-center">Example: Angular.js + Laravel 4 + Foundation css framework </h2>
      </div>      
    </div>

    <div class="row">
    	<div class="large-12 columns">
	      	@yield('content')
	      </div>
    </div>
    
    
    <script src="/assets/js/vendor/modernizr.js"></script>
    <script src="/assets/js/vendor/jquery.js"></script>
    <script src="/assets/js/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>