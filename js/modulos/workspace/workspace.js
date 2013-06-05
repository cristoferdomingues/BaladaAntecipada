var workspaceApp = angular.module('workspace',['components']);


 workspaceApp.config(function($routeProvider,$locationProvider) {
			$routeProvider.
			when('/teste/:testeId', {templateUrl:'templates/teste.html', controller:testeController}).
			otherwise({redirectTo:'/'});
	});
	
	
	function workspaceController($scope,$rootScope){
		var module = {icon:"icon-home",title:"Workspace",link:"#/teste",breadCrumb:['Workspace']};
		$rootScope.changeModule(module);
	}
	
workspaceApp.run(function($rootScope) {
  $rootScope.changeModule = function(moduleAttributes) {
	$rootScope.module = moduleAttributes;
  }
});