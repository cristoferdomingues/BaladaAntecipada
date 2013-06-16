'use strict';
var baresService = angular.module('baresService', ['ngResource']);


/*baresService.config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('baresHttpInterceptor');
        var baresFunction = function (data, headersGetter) {
            showLoading();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(baresFunction);
    });

baresService.factory('baresHttpInterceptor', function ($q, $window) {
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
    });*/


baresService.factory('Bares',function($resource){
	return $resource('json/empresa.json',{},{
		'get':    {method:'GET'},
		'save':   {method:'POST'},
		'query':  {method:'GET', isArray:true},
		'remove': {method:'DELETE'},
		'delete': {method:'DELETE'} 
	});
});