'use strict';

angular.module('TnG', ['ngRoute', 'ngTouch', 'firebase'])

.run(function ($rootScope, $location, $route) {
	//@TODO: replace with firebase simplelogin

	var roundRefUrl = 'https://tng-rounds.firebaseio.com/dev',
		allRoundsRef = new Firebase(roundRefUrl),
		fakeUsername = new Date().getTime(),
		roundRef = allRoundsRef.child(fakeUsername);

	$rootScope.round = roundRef;
})
.controller('Demo', function ($scope, $location, $route, $firebase, $window) {
	var firstTimeHelp,
		loadValue,
		loadPhase,
		appPhases = {
			"1": {
				"url": "play",
				"partial": "app/views/9p/starting_hole.angv",
				"name": "Starting Hole"
			}
		},
		current,
		currentHolesPar,
		currentPath,
		newPath,
		newPathArr,
		startingShot;

	current = $route.current.params;
	$scope.currentHole = current.hole || 0;
	$scope.currentShot = current.shot || 0;
	$scope.currentClub = current.club || null;
	$scope.activePane = 1;


	//Custom button functions
	var chosenHole;
	angular.element('[data-choose-hole]').on('click', function () {
		chosenHole = angular.element(this).data().chooseHole;

		$window.location = "#" + $location.path() + "/" + chosenHole + "/par";
	});

	var chosenPar;
	angular.element('[data-choose-par]').on('click', function () {
		chosenPar = angular.element(this).data().choosePar;

		console.log('RS: ', $scope);
		var parOfThisHole = $scope.round.child(current.hole).child('par');
		parOfThisHole.set(chosenPar);

		$window.location = "#/play/" + current.hole + "/1";
	});

	var chosenClub;
	angular.element('[data-choose-club]').on('click', function () {
		chosenClub = angular.element(this).data().chooseClub;

		$window.location = "#" + $location.path() + "/" + chosenClub;
	});

	var chosenMood;
	angular.element('[data-choose-mood]').on('click', function () {
		chosenMood = angular.element(this).data().chooseMood;

		$window.location = "#" + $location.path() + "/" + chosenMood;
	});

	var chosenAction,
		currentHoleNumber,
		currentShotNumber,
		nextHole,
		nextHoleNumber,
		nextShot,
		nextShotNumber,
		roundState;

	angular.element('[data-choose-next]').on('click', function () {

		console.log('Passed from the resolve parameter: ', $scope.roundStatus);

		chosenAction = angular.element(this).data().chooseNext;
		roundState = $location.path().split('/');
		roundState.pop(); //play mode
		roundState.pop(); //current club
		currentShotNumber = parseInt(roundState.pop());
		currentHoleNumber = parseInt(roundState.pop());

		if (chosenAction === 'shot') {
			nextShotNumber = currentShotNumber + 1;
			roundState.push(currentHoleNumber);
			roundState.push(nextShotNumber);
			nextShot = roundState.join('/');

			$window.location = "#" + nextShot;
		}

		if (chosenAction === 'hole') {
			nextHoleNumber = currentHoleNumber + 1;
			roundState.push(nextHoleNumber);
			nextHole = roundState.join('/');

			$window.location = "#" + nextHole + "/par";
		}
	});

	var mulliganTaken;
	angular.element('[data-take-mulligan]').on('click', function () {
		//First save the shot to database as un-scored but tracked
		//Then rewind to club selection
		mulliganTaken = angular.element(this).data().takeMulligan;

		roundState = $location.path().split('/');
		roundState.pop(); //play mode

		if (mulliganTaken === "yes") {
			//save mulligan to db for tracking but not scoring
			//try again

			$window.location = "#" + roundState.join('/');
		} else {

		}

	});

	$scope.goBack = function () {
		history.back();
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}

	/**First Time Help**/
	var seenAlready = 1;
	var helpSwipeForMoreUrl;

	firstTimeHelp = {};
	firstTimeHelp.swipeForMore = {
		"status": seenAlready,
		"url": "app/views/9p/help_swipe_for_more.angv"
	};

	if (!firstTimeHelp.swipeForMore.status) {
		helpSwipeForMoreUrl = firstTimeHelp.swipeForMore.url;
	}

	$scope.helpSwipeForMore = helpSwipeForMoreUrl;
});