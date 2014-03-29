'use strict'

angular.module('TnG')

.service('PlaySetup', function ($http, $location, $q, $rootScope) {
	//@TODO: Replace with loggedInAs when Auth is integrated
	this.roundEndpoint = "https://tng-rounds.firebaseio.com/";
	this.username = $rootScope.loggedInAs;

	var endpoint = "https://talkngolf.firebaseio.com/";

	this.getPageData = function (collection, callback, endpointOverride) {

		var refList = {
			"rounds": "https://tng-rounds.firebaseio.com/",
			"default": "https://talkngolf.firebaseio.com/"
		},

		targetCollection;

		endpoint = refList[endpointOverride] || endpoint;

		targetCollection = $rootScope.loggedInAs + "/" + collection


		$http({method: 'GET', url: endpoint + targetCollection + '/.json'})
		.success(function (retrievedData, status, headers, config) {
			callback(retrievedData);
		})
		.error(function (error, status, headers, config) {
			callback(error);
		})
	};

	this.get = function (field, ref, id) {
		var refList = {
			"rounds": "https://tng-rounds.firebaseio.com/",
			"default": "https://talkngolf.firebaseio.com/"
		};

		console.log(refList[ref] + id, field);
	};

	this._roundIsActive = function () {
		var defer = $q.defer(),
		endpoint = this.roundEndpoint,
		isActive = false,
		fb = new Firebase(endpoint),
		username = username || $rootScope.loggedInAs;
		this.username = username;

		fb.child(username).on('value', function (snapshot) {
			if (!snapshot.val()) {
				defer.reject();
			} else {
				defer.resolve();
			}
		});

		return defer.promise;
	};

	this._initRound = function () {
		var $self = this,
		defer = $q.defer();

		this._roundIsActive().then(
		function () {
			defer.resolve();
		},
		function () {
			//initialize round
			var username = username || $self.loggedInAs,
			endpoint = $self.roundEndpoint + username + "/.json",
			initData = {"player": username, "startTime": Date()};

			$http.put(endpoint, initData)
			.then(function () {
				console.log('Initialization complete');
				defer.resolve();
			});
		}
		);

		return defer.promise;
	};

	this._saveRound = function (dataToSave, requestedEndpoint) {
		var defer = $q.defer(),
		$self = this;

		this._initRound().then(
		function () {
			if (requestedEndpoint) {

				var targetEndpoint = $self.roundEndpoint + $self.username + "/" + requestedEndpoint + "/.json";

				$http.put(targetEndpoint, dataToSave)
				.then(
				function () {
					defer.resolve();
				},
				function (error) {
					defer.reject();
				}
				);
			} else {
				defer.resolve();
			}
		}
		);

		return defer.promise;
	};

	this.continuePlaySetup = function (nextStep, dataToSave, targetCollection) {
		this._saveRound(dataToSave, targetCollection)
		.then(function () {
			$location.path(nextStep);
		});
	};
})