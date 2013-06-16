var testeApp = angular.module('teste',['workspace']);

function testeController($scope,$rootScope,$routeParams){
	var module = {icon:"icon-home",title:"Teste",breadCrumb:[{title:'Teste',link:"#/teste"}]};
	console.log($routeParams);
	$rootScope.changeModule(module);
}