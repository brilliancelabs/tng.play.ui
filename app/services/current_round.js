'use strict';

angular.module('TnG')

.service('CurrentRound', function (FirebaseAuth, $firebase, $location, $q, $rootScope) {
    var currentPlayer = $rootScope.loggedInAs;
    var roundsEndpoint = 'https://tng-rounds.firebaseio.com/';
    var roundsRef = new Firebase(roundsEndpoint);

    var currentRoundRefUrl = roundsEndpoint + $rootScope.loggedInAs;
	console.log('URL: ', currentRoundRefUrl);
    var currentRoundRef = new Firebase(currentRoundRefUrl);
    var currentRound = $firebase(currentRoundRef);

    this.setCurrentRound = function (parentScope, selectedModeToTrack, currentPlayer) {

			parentScope.currentRound = $firebase(roundsRef);

			parentScope.currentRound[$rootScope.loggedInAs] = {
				"mode": selectedModeToTrack,
				"player": $rootScope.loggedInAs,
				"start_time": new Date().getTime(),
				"tracking": {
					"details": "here"
				}
			};

		  parentScope.currentRound.$save($rootScope.loggedInAs);

    };

    this.getCurrentRound = function (parentScope) {
	    var currentPlayer = $rootScope.loggedInAs;
	    var roundsEndpoint = 'https://tng-rounds.firebaseio.com/';
	    var roundsRef = new Firebase(roundsEndpoint);

	    var currentRoundRefUrl = roundsEndpoint + $rootScope.loggedInAs;
	    console.log('URL: ', currentRoundRefUrl);
	    var currentRoundRef = new Firebase(currentRoundRefUrl);
	    var currentRound = $firebase(currentRoundRef);

      parentScope.currentRound = currentRound;
    };

    this.saveToRound = function (parentScope, dataLabel, dataContents) {
      parentScope.currentRound[dataLabel] = dataContents;
	    parentScope.currentRound.$save(dataLabel);
    };

    this.saveTracking = function (parentScope, dataLabel, dataContents) {
        parentScope.currentRound['tracking'][dataLabel] = dataContents;
        parentScope.currentRound.$save('tracking');
    };

    this.saveShot = function (parentScope, currentHole, currentShot, club, mood) {
        if(currentHole && currentShot) {

            if(!parentScope.currentRound.tracking[currentHole]) {
                parentScope.currentRound.tracking[currentHole] = {};
            }

            parentScope.currentRound.tracking[currentHole][currentShot] = {};
            parentScope.currentRound.tracking[currentHole][currentShot].club = club;

            if(mood) {
                parentScope.currentRound.tracking[currentHole][currentShot].mood = mood;
            }

            parentScope.currentRound.$save('tracking');

        }
    };

    this.endRound = function (parentScope) {
        var roundToSave, currentRoundData = {};
        var archiveRefUrl = 'https://tng-archives.firebaseio.com/'+$rootScope.loggedInAs;
        var archiveRef = new Firebase(archiveRefUrl);

        roundToSave = $firebase(archiveRef);

        for(var unfilteredData in currentRound) {
            if(unfilteredData.charAt(0) !== '$') {
                currentRoundData[unfilteredData] = currentRound[unfilteredData];
            }
        }
        currentRoundData.end_time = new Date().getTime();
        currentRoundData.duration = currentRoundData.end_time - currentRoundData.start_time;

        roundToSave.$add(currentRoundData);
        currentRound.$remove();
        $location.path('/');
    };
});