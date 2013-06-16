angular.module('components', []).
  directive('navbar', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
			$scope.messageNumber = 10;
					
      },
      template:
        '<ul class="nav btn-group">'+
		   '<li class="btn btn-inverse" ><a title="" href="perfil.html"><i class="icon icon-user"></i> <span class="text">Perfil</span></a></li>'+
			'<li class="btn btn-inverse dropdown" id="menu-config">'+
				'<a href="#" data-toggle="dropdown" data-target="#menu-config" class="dropdown-toggle">'+
					'<i class="icon icon-cog"></i> <span class="text">Configurações </span>'+
					'<b class="caret"></b>'+
				'</a>'+
				'<ul class="dropdown-menu">'+
					'<li><a  title="Gerenciamento de usuários" href="usuario-list.html" class="tip-left"> <i class="icon-user"/> Usuários(BlackLion Admin)</a></li>'+
					'<li><a  title="Gerenciamento dos módulos" class="tip-left" href="modulos-list.html"> <i class="icon-tasks"/> Módulos</a></li>'+
					'<li><a  title="Gerenciamento de permissões dos módulos" class="tip-left" href="permissoes-list.html"><i class="icon-eye-open"/> Permissões dos Módulos</a></li>'+
				'</ul>'+
			'</li>'+
			'<li class="btn btn-mini btn-inverse">'+
				'<a title="" href="login.html">'+
					'<i class="icon icon-share-alt"></i>'+
					'<span class="text">Logout</span>'+
				'</a>'+
			'</li>'+
        '</ul>',
      replace: true
    };
  }).
  directive('sidebar',function(){
	 return {
      restrict: 'E',
      transclude: true,
      scope: {},
	  controller: function($scope, $element,$route) {
	 
			$scope.modulos = [
				{id:1,link:'#/teste/1',icone:'icon-home',nome:'Teste'},
			];
      },
	  template:
			'<ul>'+
				'<li ng-repeat="modulo in modulos">'+
					'<a href="{{modulo.link}}"><i class="icon {{modulo.icone}}"></i> <span>{{modulo.nome}}</span></a>'+
				'</li>'+				
			'</ul>',
	  replace:true
	};
  }).
  directive('management',function(){
	return{
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			$scope.comments = 10;
		},
		template:'<div class="btn-group">'+
					'<a class="btn btn-large tip-bottom" title="Gerenciar Bares" href="#/bares"><i class="icon-glass"></i></a>'+
					'<a class="btn btn-large tip-bottom" title="Gerenciar Usuários"><i class="icon-user"></i></a>'+
					'<a class="btn btn-large tip-bottom" title="Gerenciar Comentários"><i class="icon-comment">'+
					'</i><span class="label label-important">{{comments}}</span>'+
					'</a>'+
					'<a class="btn btn-large tip-bottom" title="Gerenciar Pedidos"><i class="icon-shopping-cart"></i></a>'+
				'</div>',
		replace:true
	};
  }).
  directive('deletealert',function(){
	return{
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope, $element) {
			
		},
		template:'<div id="deleteAlert" class="modal hide" style="display: none;">'+
				'<div class="modal-header">'+
					'<button data-dismiss="modal" class="close" type="button">×</button>'+
					'<h3>Atenção</h3>'+
				'</div>'+
				'<div class="modal-body">'+
					
				'</div>'+
				'<div class="modal-footer">'+
					'<a data-dismiss="modal" id="sim" class="btn btn-primary" href="#">Sim</a>'+
					'<a data-dismiss="modal" id="nao" class="btn" href="#">Não</a>'+
				'</div>'+
			'</div>',
		replace:true
	};
  }).
  directive('sameAs', function() {
  return {
    require: 'ngModel',
	controller: function($scope, $element) {
	  $scope.password;
	  $scope.password_confirmation;
	},
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue === scope[attrs.sameAs]) {
          ctrl.$setValidity('sameAs', true);
          return viewValue;
        } else {
          ctrl.$setValidity('sameAs', false);
          return undefined;
        }
      });
    }
  };
});
  
  function showLoading(){
    defaults = {
			'position': "overlay",        // right | inside | overlay
			'text': "Carregando",                 // Text to display next to the loader
			'class': "icon-refresh",    // loader CSS class
			'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin"></i></span>',
			'disableSource': true,      // true | false
			'disableOthers': []
		};
	  $.isLoading(defaults);
  }
  
  function hideLoading(){
   $.isLoading( "hide" );
  }
  

 function showSuccesAlert($el){
	var alertElement = '<div class="alert alert-success fade in"  style="display: none;">'+
							'<button class="close" data-dismiss="alert">×</button>'+
							'Operação efetuada com <strong>sucesso!</strong>'+
					'</div>';
		$el.prepend(alertElement);
		$('.alert-success').show('slow');
		
		setTimeout(function(){
			$(".alert").alert('close')
		},5000);
}

function showFailAlert($el){
	var alertElement = '<div class="alert alert-error fade in"  style="display: none;">'+
							'<button class="close" data-dismiss="alert">×</button>'+
							'<strong>Falha</strong> ao tentar executar essa operação'+
					'</div>';
		$el.prepend(alertElement);
		$('.alert-error').show('slow');
		
		setTimeout(function(){
			$(".alert").alert('close')
		},5000);
}

