'use strict';

angular.module('TnG')

.service('FirebaseAuth',
	function ($location, $window, $rootScope, $q) {

	var $self = this;
	var authRefUrl = 'https://talkngolf.firebaseio.com';
	var db = new Firebase(authRefUrl);
	var $service = this;

	this.quickStart = function (parentScope) {
		var newUser = parentScope.quickRegister;

		var username = newUser.username;
		var email = newUser.email;

		if (username && email) {
			$self.register(username, newUser, "direct");
		}
	};

//	this.checkAuth = function (){
//		console.log('checking auth');
//		var auth = new FirebaseSimpleLogin(db, function(error, user) {
//
//			if(error){
//				console.log(error);
//
//			}else if(user){
//				var username = user.username.replace(".", "_dot_");
//				$rootScope.loggedInAs = username;
//
//				//@TODO: Risk for auto-reload failure -- add a limiter of some sort
//				$location.path('/play/choose/clubset  ');
//				console.log($location.path());
//
//			}
//
//		});
//	};

	this.getUsername = function () {
		var waiter = $q.defer();

		this.findUsername()
		.then(
			function (username) {
				waiter.resolve(username);
			},
			function () {
				waiter.reject();
			}
		);

		return waiter.promise;
	};

	this.findUsername = function () {
		var defer = $q.defer();
		var username;

		new FirebaseSimpleLogin(db, function(error, user) {
			if(user){
				username = user.username;
				defer.resolve(username);
			} else {
				defer.reject();
			}

		});

		return defer.promise;
	};

	this.authPassword = function (emailEnteredByUser, passwordEnteredByUser) {
		if(emailEnteredByUser && passwordEnteredByUser) {
			var auth = new FirebaseSimpleLogin(db, function (error, user) {
				if(error){
					console.log(error);

				}else if(user){
					console.log('Logged in as: ', user.username);
					$window.location = "#/";

				}else{
					console.log("Email: ", emailEnteredByUser);
					console.log("Pass: ", passwordEnteredByUser);

					this.login('password', {
						email: emailEnteredByUser,
						password: passwordEnteredByUser
					}, function (error, user) {
                        console.log(user);
                    });

					this.createUser(emailEnteredByUser, passwordEnteredByUser, function(error, user) {
						if (!error) {
							console.log('User Id: ' + user.id + ', Email: ' + user.email);
						} else {
							console.log(error);
						}
					});
				};
			});


		}
	};

	this.authTwitter = function () {
		var auth = new FirebaseSimpleLogin(db, function(error, user) {
			if(error){
				console.log(error);

			}else if(user){
				console.log('Logged in as: ', user.username);
				$window.location = "#/";

			}else{
				this.login('twitter');

			};
		});
	};

	this.authFacebook = function () {
		var auth = new FirebaseSimpleLogin(db, function(error, user) {

			if(error){
				console.log(error);

			}else if(user){
				$self.register(user.username, user, "facebook");

			}else{
				this.login('facebook', {
					scope: 'email, user_likes'
				});

			};

		});
	};

	this.register = function () {
		var userAlreadyInDb;
		if(arguments.length > 1){

			var username = arguments[0];

			var userData = arguments[1];

			var provider = arguments[2];

			if(provider){
				username+="-";
				username+=provider;
				userData.via = provider;
			}
			var users = db.child('users');
			username = username.replace(".", "^dot^"); //remove dots
			var thisUser = users.child(username);

			thisUser.on('value', function(data){
				userAlreadyInDb = data.val();
				console.log('UDB: ', userAlreadyInDb);
			});

			if(!userAlreadyInDb){
				console.log('attempting to save a new user');
                var auth = new FirebaseSimpleLogin(db, function(error, user) {

                    if(error){
                        console.log(error);

                    }else if(user){
                        console.log(user);

                    }

                });

			};

			$window.location = "#/";
		}

	};

	this.logout = function () {
		var auth = new FirebaseSimpleLogin(db, function(error, user) {
			if(user) {
				auth.logout();
			}
		});

	};
});