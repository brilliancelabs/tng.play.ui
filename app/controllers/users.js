'use strict';

angular.module('TnG')

.controller('UsersLogin', function ($scope, $location, $q, $rootScope, $window, $firebase, FirebaseAuth) {
	var quickRegister = {};

	$scope.login = FirebaseAuth.simplelogin;
	$scope.loginWithTwitter = FirebaseAuth.authTwitter;
	$scope.loginWithFacebook = FirebaseAuth.authFacebook;
	$scope.quickRegister = quickRegister;
	$scope.loginWithPassword = function () {
		var email = $scope.quickRegister.username;
		var password = $scope.quickRegister.password;

		if (email && password) {
			FirebaseAuth.authPassword(email, password);
		}

	}

	$scope.quickStart = function () {
		FirebaseAuth.quickStart($scope);
	};

})

.controller('UsersLogout', function ($scope, FirebaseAuth) {
	FirebaseAuth.logout();
})

