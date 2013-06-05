'use strict';
var empresaService = angular.module('empresaService', ['ngResource']);

empresaService.factory('Empresa',function($resource){
	return $resource('server/empresa.php/empresa/:id',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'} 
	});
});

