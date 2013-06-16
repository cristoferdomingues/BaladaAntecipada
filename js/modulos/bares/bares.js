var baresApp = angular.module('bares',['app','baresService']);

 baresApp.config(function($routeProvider,$locationProvider) {
			$routeProvider.
			when('/bares', {templateUrl:'templates/bares/bares-list.html', controller:baresListController}).
			when('/bares/new', {templateUrl:'templates/bares/bares-form.html', controller:baresController}).
			when('/bares/edit/:id', {templateUrl:'templates/bares/bares-form.html', controller:baresController}).
			otherwise({redirectTo:'/bares'});
			
});

baresApp.run(function($rootScope){
	 $rootScope.$on('$routeChangeSuccess', function() {
		moduleManager($rootScope);
	 });
});

function moduleManager($rootScope){
	var module = {icon:"icon-glass",title:"Casas Noturnas",breadCrumb:[{title:'Casas Noturnas',link:"#/bares"}]};
	$rootScope.changeModule(module);
}

/*Controllers*/

function baresListController($scope,$rootScope,Bares,$location){
		
	Bares.query(function(){
	
		$scope.bares = [{id:1,nome:"Velvet",status:"A"},{id:2,nome:"Beehive",status:"I"},{id:3,nome:"Pax",status:"A"}];
	});
	
	$rootScope.renderDataTable();
	
	$scope.editar = function(item){
		$location.url('bares/edit/'+item.id);
	}
}

function baresController($scope,$routeParams,$rootScope,Bares,$location,$timeout){
	$('input[type=checkbox],input[type=radio],input[type=file]').uniform();
	$('select').chosen();
	
	$scope.bar = {};
	
	$scope.cancelar = function(){
		$location.url('bares');
	}
	
	if($routeParams.id != null){
		//Editar
		Bares.query({id:$routeParams.id},function(data){
			//descomentar
			//$scope.bar = data;
			
			/*Depois Remover isso*/
			var data = [{id:1,nome:"Velvet",status:"A"},{id:2,nome:"Beehive",status:"I"},{id:3,nome:"Pax",status:"A"}];
			$(data).each(function(idx,val){
				if($routeParams.id == val.id){
					$scope.bar = val;
				}
			});
			/*******************/
			
			atualizaComboBox($timeout,$scope);
		});
		
		$scope.salvar = function(){
			update($scope,Bares);
		};
	}else{
		//Novo
		
	}
	
}

function update($scope,Bares){
	var barSevice = new Bares();
	var bar = $scope.bar;
	
	barService.id = bar.id;
	barService.nome = bar.nome;
	barService.status = bar.status;
	
	barService.$update(function(data){
		
	},
	function(err){
		
	});
}

function salvar($scope,Bares){
	
	var barSevice = new Bares();
	var bar = $scope.bar;
	
	barService.id = bar.id;
	barService.nome = bar.nome;
	barService.status = bar.status;
	
	barService.$update();
}

function atualizaComboBox($timeout,$scope){
$timeout(function(){
		$("#status > option").each(function(){
			if($(this).val().trim() == $scope.bar.status.toString().trim()){
				$(this).attr('selected', 'selected');
				$("#status").trigger("liszt:updated");
			}
		});
	},100);
}
