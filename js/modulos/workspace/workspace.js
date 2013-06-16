var workspaceApp = angular.module('workspace',['app']);

	
function workspaceController($scope,$rootScope){
		var module = {icon:"icon-home",title:"Workspace",breadCrumb:[{title:'Workspace',link:"#/workspace"}]};
		$rootScope.changeModule(module);
}
	
