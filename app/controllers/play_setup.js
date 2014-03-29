'use strict';

angular.module('TnG')

.controller('Chooser', function ($scope, CurrentRound, FirebaseAuth, PlaySetup, $rootScope) {
	var nextStep = "/play/choose/clubset";
	$scope.heading = "Choose";
	$scope.subHeading = "Starting hole";
	$scope.panes = {
		"Practice": "practice",
		"Play": "play"
	};

	$scope.initializeTracking = function (selectedMode) {
		CurrentRound.setCurrentRound($scope, selectedMode, $rootScope.loggedInAs);
		PlaySetup.selectedMode = selectedMode;
		PlaySetup.continuePlaySetup(nextStep);
	};
})

.controller('Clubset', function ($scope, CurrentRound, $firebase, PlaySetup) {
	CurrentRound.getCurrentRound($scope);

	var nextStep = "/play/choose/course"
	var defaultClubsRefUrl = 'https://talkngolf.firebaseio.com/clubs';
	var defaultClubsRef = new Firebase(defaultClubsRefUrl);

	$scope.heading = "Choose Club Set";
	$scope.subHeading = "Available sets"
	$scope.panes = $firebase(defaultClubsRef);

	$scope.continuePlaySetup = function (selectedClubSet) {
		PlaySetup.selectedClubSet = $scope.panes[selectedClubSet];

		CurrentRound.saveToRound($scope, 'clubs', $scope.panes[selectedClubSet]);

		PlaySetup.continuePlaySetup(nextStep);
	};
})

.controller('Course', function ($scope, CurrentRound, $firebase, PlaySetup) {
	CurrentRound.getCurrentRound($scope);
	var collection = "courses";
	var nextStep = "/play/choose/course/start";
	var coursesRefUrl = 'https://tng-courses.firebaseio.com';
	var coursesRef = new Firebase(coursesRefUrl);

	$scope.heading = "Choose Golf Course";

	$scope.subHeading = "Your Favorite Courses";

	$scope.panes = $firebase(coursesRef);


	$scope.continuePlaySetup = function (selectedCourse) {
		CurrentRound.saveToRound($scope, 'course', selectedCourse);
		PlaySetup.continuePlaySetup(nextStep);
	};
})

.controller('CourseStart', function ($scope, CurrentRound, $firebase, PlaySetup) {
	CurrentRound.getCurrentRound($scope);

	var nextStep = "/play/track/",
	startingHoles = {
		"1": "1",
		"10": "10"
	};

	$scope.heading = "Choose";
	$scope.subHeading = "The Starting Hole";
	$scope.panes = startingHoles;


	//Begin Tracking
	$scope.continuePlaySetup = function (selectedStartingHole) {

		PlaySetup.selectedStartingHole = selectedStartingHole;

		CurrentRound.saveToRound($scope, 'tracking', {"starting_hole": selectedStartingHole});

		PlaySetup.continuePlaySetup(nextStep + selectedStartingHole);
	};
});