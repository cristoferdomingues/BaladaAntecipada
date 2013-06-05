angular.module('empresa', ['components','empresaService']).
 config(function($routeProvider,$locationProvider) {
    $routeProvider.
	  when('/', {controller:empresaController}).
	  when('/new', {controller:empresaController}).
      when('/editar/:empresaId', {controller:empresaController}).
      otherwise({redirectTo:'/'});
  }).
 directive('empresatable',function(){
	return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, Empresa,$timeout) {
		showLoading();
		var dataTable;
		Empresa.query(function(data){
			console.log("sucesso");
			
			$scope.empresas = data;
			
			$timeout(function(){
				dataTable = $('.data-table').dataTable({
					"bJQueryUI": true,
					"sPaginationType": "full_numbers",
					"sDom": '<""l>t<"F"fp>',
					"iDisplayLength": 20,
					"oLanguage": {
						"sEmptyTable": "Sem dados",
						"sSearch":"Buscar:",
						"oPaginate": {
							"sFirst": "Primeiro",
							"sLast": "Último",
							"sNext":"Próximo",
							"sPrevious":"Anterior" 
						  }
					}
				});
				
				$('.dataTables_length').remove();
			},100);	
			hideLoading();
		},
		function(err){
			console.error(err);
			hideLoading();
		});
		
		  /**
		  *Fun��o respons�vel pela ação de deletar o registro
		  */
		$scope.apagar = function(item){
			bootbox.confirm('Deseja excluir <strong>'+item.titulo+'</strong> ?','Não','Sim', function(result) {
					 if(result){
						 Empresa.delete(function(data){
							console.log(data);
							var itemIndex = $.inArray(item,$scope.empresas);
							dataTable.fnDeleteRow(itemIndex);
							$scope.empresas.splice(itemIndex,1);
							
							showSuccesAlert($('#container'));
						},
						function(err){
							$log.error(err);
							showFailAlert($('#container'));
						});
					 }
				}); 
			}
			/*============================FIM APAGAR====================*/
			
			/**
			*Fun��o respons�vel pelas ações de editar o registro
			*/
			$scope.editar = function(item){
				console.log(item);
				location.href="empresa.html#/editar/"+item.id;
			}
			
			$scope.novo = function(){
				location.href="empresa.html#/new/";
			}
      },
	  template:'<table class="table table-bordered data-table">'+
				'<thead>'+
					'<tr>'+
						'<th>Código</th>'+
						'<th>Titulo</th>'+
						'<th>Ação</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>'+
					'<tr class="gradeX"  ng-repeat="empresa in empresas | orderBy:id">'+
						'<td class="center">{{empresa.id}}</td>'+
						'<td align="left">{{empresa.titulo}}</td>'+
						'<td class="center">'+
							'<ul class="ulAcao">'+
								'<li>'+
									'<button class="tip-bottom btn btn-primary btn-mini" title="Editar" ng-click="editar(empresa)">'+
										'<i class="icon-pencil icon-white"></i>'+
									'</button>'+
								'</li>'+
								'<li>'+
									'<button  class="tip-bottom btn btn-danger btn-mini" title="Apagar" ng-click="apagar(empresa)">'+
										'<i class="icon-trash icon-white"></i>'+
									'</button>'+
								'</li>'+
							'</ul>'+
						'</td>'+
					'</tr>'+
				'</tbody>'+
			'</table>',
			replace:true
	};
 })


function empresaController($scope,$location,Empresa){

	var acao = $location.path().split("/")[1];
	/*
		URLS
	*/
	
	var CANCELARURL = 'empresa-list.html#/';
	
	/*
		EDITAR
	*/
	if(acao.toUpperCase()=='EDITAR'){
			showLoading();
			var id = $location.path().split("/")[2];
			Empresa.get({id:id},
			function(data){
				$scope.id = data.id;
				$scope.titulo = data.titulo;
				$scope.descricao = data.descricao;
				
				CKEDITOR.instances.descricao.setData($scope.descricao);
				
				hideLoading();
			},
			function(err){
				console.log(err);
				showFailAlert($('#container'));
				hideLoading();
			});
			
			
			$scope.salvar = function(){
				$scope.descricao = CKEDITOR.instances.descricao.getData();
				var param = {titulo:$scope.titulo,texto:$scope.descricao};
				
				Empresa.update(param,
				function(){
				hideLoading();
				},
				function(){
				showFailAlert($('#container'));
					hideLoading();
				});
			}
	/*
		NOVO
	*/
	}else if(acao.toUpperCase()=='NEW'){
			
			$scope.salvar = function(){
			console.log('salvar');
			showLoading();
			
			$scope.descricao = CKEDITOR.instances.descricao.getData();
			
			var empresa = Empresa;
			var emp = new empresa();
			emp.titulo = $scope.titulo;
			emp.descricao = $scope.descricao;
			
			emp.$save(function(data){
				showSuccesAlert($('#container'));
				hideLoading();
				$scope.titulo = $scope.descricao = '';
				CKEDITOR.instances.descricao.setData('');
			},
			function(err){
				console.log(err);
			showFailAlert($('#container'));
				hideLoading();
			});
			
			console.log("NOVO");
			$scope.descricao = CKEDITOR.instances.descricao.getData();
			console.log("titulo "+$scope.titulo+" "+"texto:"+$scope.descricao);
			}
	}
	
	/*
		BTN CANCELAR
	*/
		$scope.cancelar = function(){
			location.href=CANCELARURL;
		};
	
}