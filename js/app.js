var app = angular.module('app',['components','bares']);

 app.config(function($routeProvider,$locationProvider) {
			$routeProvider.
			when('/teste/:testeId', {templateUrl:'templates/teste.html', controller:testeController}).
			otherwise({redirectTo:'/'});

			//$locationProvider.html5Mode(true);
});

/*Interceptor behavior*/
app.config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('appHttpInterceptor');
        var appInterceptorFunction = function (data, headersGetter) {
            showLoading();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(appInterceptorFunction);
});

app.factory('appHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
               hideLoading();
                return response;

            }, function (response) {
                // do something on error
                   hideLoading();
                return $q.reject(response);
            });
        };
    });
/*Fim interceptor behavior*/

app.run(function($rootScope,$timeout) {
	
	

  $rootScope.changeModule = function(moduleAttributes) {
	$rootScope.module = moduleAttributes;
  };
  
  $rootScope.renderDataTable = function(){
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
  }
});