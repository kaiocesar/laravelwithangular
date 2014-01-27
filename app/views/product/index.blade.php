@extends('layouts.default')

@section('content')


	<div class="large-12" ng-controller="ProductsController">

		<h3>All products <small>({{ items.length }})</small> </h3>

		<div class="large-12 medium-8">
			<ul class="breadcrumbs large-12">
				<li><a href="javascript:void(0);">Home</a></li>			
				<li class="current"><a href="javascript:void(0);">Products</a></li>
			</ul>
		</div>

			<table class="large-12 text-center">
				<thead>
					<tr>
						<th class="text-center">#</th>
						<th class="text-center">Name</th>
						<th class="text-center">Value</th>
						<th class="text-center">Created at</th>
						<th class="text-center">Status</th>
						<th class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="item in items">
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.value | currency:"R$ " }}</td>
						<td>{{ item.created_at }}</td>
						<td>{{ (item.status==1)? "Ativo" : "Inativo" }}</td>
						<td>
							<a href="javascript:void(0);" class="button tiny"><i class="step fi-magnifying-glass size-24"></i></a>
							<a href="javascript:void(0);" class="button tiny"><i class="step fi-pencil size-24"></i></a>					
							<a href="javascript:void(0);" class="button tiny alert" onclick="return confirm('Are you sure you want to delete this item ?');"><i class="step fi-x size-24"></i></a>					
							
						</td>
					</tr>
				</tbody>
			</table>
		
	</div>




	<script type="text/javascript">
		function ProductsController ($scope)
		{
			$scope.items = <?php echo json_encode($products); ?>;
		}
	</script>


@stop