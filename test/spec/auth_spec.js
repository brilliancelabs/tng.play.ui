describe('AuthService powered by Firebase SimpleLogin', function () {
	var auth = authClient, authToken, checkForToken, deferredToken = $.Deferred();
	var timePerAttempt = 1000;
	var totalAttempts = 5;
	var totalTime = timePerAttempt * totalAttempts;
	var userData = {
		"email": "test@bl.io",
		"username": "testdummy",
		"password": "test"
	};

	describe('email and password login', function () {

		beforeEach(function (authenticateUser) {
			timePerAttempt = 1000;
			totalAttempts = 3;

			checkForToken = setInterval(function () {
				authToken = authenticatedUser.firebaseAuthToken;

				if(authToken) {
					deferredToken.resolve(authToken);
				} else {
					console.log('not yet', authenticatedUser);
				}
			}, timePerAttempt);

			setTimeout(function () {
				clearInterval(checkForToken);
			}, totalTime);

			authenticateUser();
			return deferredToken.promise();

		});

		afterEach(function (authenticateUser) {
			clearInterval(checkForToken);

			auth.logout();
			console.log('CLEAR ME');
			userRef.unauth();
			authenticatedUser = {};
			authToken = undefined;

			authenticateUser();
		});

		it('should create a token upon successful login', function (authenticateUser) {
			authToken = undefined;
			expect(authToken).not.toBeDefined();

			auth.login('password', {
				email: userData.email,
				password: userData.password
			});

			deferredToken.then(function (passedToken) {
				console.log('Email Token: ', passedToken);
				expect(authToken).toBeDefined();
				authenticateUser();
			});

		});

	});


	describe('TnG Profile Creation', function () {
		var profileRef = new Firebase('https://tng-users.firebaseio.com');
		var userToValidate = 'this-user-should-never-exist';
		var defer;
		var myProfileExists;

		myProfileExists = true;
		it('should reject and invalid profile', function () {

			validateMyProfile(userToValidate)
			.fail(
				function (myProfileExists) {
					console.log('NOooooooo', myProfileExists);
				}
			);

			expect(myProfileExists).toBe(false);
		});





	});
});