angular.module('TnG', ['ngRoute', 'ngTouch', 'firebase'])
.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function () {
		console.log('booooooo!!!');
		$location.path('/');
	});
})
.config(function ($routeProvider) {

	$routeProvider
	.when('/', {
		controller: 'Chooser',
		template: "loading...",
		resolve: {
			dependencies: function ($q, $rootScope, $window) {
				var userRef = new Firebase('https://talkngolf.firebaseio.com');
				var auth = new FirebaseSimpleLogin(userRef, function (error, user) {
					if (error) {
						// an error occurred while attempting login
						console.log(error);

					} else if (user) {
						// user authenticated with Firebase
						console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
						console.log('USER', user);

						var username;
						if (user.id) {
							username = user.id;
						}

//					          if(user.username) {
//						          username = user.username.replace(".", "_dot_");
//					          } else {
//						          username = user.email.replace(".", "_dot_");
//					          }
//
						$rootScope.loggedInAs = username;

						$window.location = "#/play"

					} else {
						// user is logged out
						$window.location = "#/login";

					}

				});
			}
		}
	})
	.when('/play', {
		controller: 'Chooser',
		templateUrl: 'app/views/chooser.angv',
		resolve: {
			dependencies: function ($rootScope, $q) {
				var deferred = $q.defer();
				var username = $rootScope.loggedInAs;

				if (username) {
					deferred.resolve(username);
				} else {
					deferred.reject();
				}

				return deferred.promise;
			}
		}
	})
	.when('/register', {
		controller: 'UsersLogin',
		templateUrl: 'app/views/users_register.angv'
	})
	.when('/login', {
		controller: 'UsersLogin',
		templateUrl: 'app/views/users_login.angv'
	})
	.when('/logout', {
		controller: 'UsersLogout',
		templateUrl: 'app/views/users_logout.angv',
		resolve: {
			dependencies: function ($q, $rootScope, $window) {
				var userRef = new Firebase('https://talkngolf.firebaseio.com');
				var auth = new FirebaseSimpleLogin(userRef, function () {
				});
				auth.logout();
				$rootScope.loggedInAs = "";
				$window.location = "#/";
			}
		}
	})
});