var testeApp = angular.module('teste',['workspace']);

function testeController($scope,$rootScope,$routeParams){
	var module = {icon:"icon-home",title:"Teste",link:"#/teste",breadCrumb:['Teste']};
	console.log($routeParams);
	$rootScope.changeModule(module);
}