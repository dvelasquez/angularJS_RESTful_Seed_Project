angular.module('app.controllers')

.controller('LoginController', function ($scope, $log,$Configuration, $Localization, $timeout, $mdToast) {

	//Application Information
	$scope.signature = $Configuration.get("application");

	//Set State accord to user
	var changeState = function(new_state){
		var state = {};
		
		switch (new_state) {
			case "invalid":
				state = {
					text: "login.state.invalid.button",
					disabled: true,
					icon: null
				};
				break;
			case "valid":
				state = {
					text: "login.state.valid.button",
					disabled: false,
					icon: {
						name: 'ic_lock_open_24px',
						category: 'action'
					}
				};
				break;
			case "validating":
				state = {
					text: "login.state.validating.button",
					disabled: true,
					icon: null
				};
				break;
		}	
		state.name = new_state;
		$scope.state = state;

	}

	$scope.isValidating= function(){
		return $scope.state.name == 'validating';
	};

	$scope.onChange = function(form){
		changeState(form.$valid ? 'valid' : 'invalid');
	};

	$scope.login = function(user){
		changeState('validating');

		$timeout(function(){

			$mdToast.show(
				$mdToast.simple()
				.content('Usuario o Clave Incorrecta')
				.position('bottom left')
				.hideDelay(300000)
			);
		
			changeState("valid");
		},2000);
	};

	changeState('invalid');
});