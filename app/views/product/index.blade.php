@extends('layouts.default')

@section('content')


	<div class="large-12" ng-controller="ListaComprasController">

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
						<td>{{ item.value }}</td>
						<td>{{ item.created_at }}</td>
						<td>{{ item.status }}</td>
						<td>
							<a href="javascript:void(0);" class="button tiny"><i class="step fi-magnifying-glass size-21"></i></a>
							<a href="javascript:void(0);" class="button tiny">x</a>
							<a href="javascript:void(0);" class="button tiny alert">x</a>
						</td>
					</tr>
				</tbody>
			</table>
		
	</div>




	<script type="text/javascript">
		function ListaComprasController ($scope)
		{
			$scope.items = <?php echo json_encode($products); ?>

			// [
			// 	{produto: 'Leite', quantidade: 2, comprado: false},
			// 	{produto: 'Cerveja', quantidade: 12, comprado: false},
			// ];
		}
	</script>


@stop