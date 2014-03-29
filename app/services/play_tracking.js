'use strict';

angular.module('TnG')

.service('PlayTracking', function ($location) {
	var currentPath = $location.path().split('/');

	this.continue = function (nextStep) {
		if (nextStep) {
			$location.path(nextStep);
		}
	};

	this.nextShot = function (parentScope, currentHole, currentShot) {
		var currentShotAsNumber = parseInt(currentShot);
		var nextShot = (currentShotAsNumber + 1).toString();

		currentPath.splice(4);
		currentPath.push(nextShot);

		var nextShotPath = currentPath.join('/');

		$location.path(nextShotPath);
	};

	this.nextHole = function (parentScope, currentHole) {
		var currentHoleAsNumber = parseInt(currentHole);
		var nextHole = (currentHoleAsNumber + 1).toString();

		currentPath.splice(3);
		currentPath.push(nextHole);

		var nextHolePath = currentPath.join('/');

		$location.path(nextHolePath);
	};
});