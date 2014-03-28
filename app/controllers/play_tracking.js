'use strict';

angular.module('TnG')

.controller('TrackClub',
    function ($scope, CurrentRound, $firebase, $http, $location, PlaySetup, PlayTracking, $routeParams) {

    CurrentRound.getCurrentRound($scope);

    var baseUrl, currentHole, currentShot, nextStep, round;

    round = $routeParams;
    baseUrl = $location.path() + "/";

    $scope.heading = "Choose One";
    $scope.subHeading = "Hole " + round.currentHole + " Shot "+ round.currentShot;


    $scope.selectClub = function (selectedClub) {

        selectedClub = selectedClub.code;
        nextStep = baseUrl + selectedClub;

        currentHole = $routeParams.currentHole.toString();
        currentShot = $routeParams.currentShot.toString();

        CurrentRound.saveShot($scope, currentHole, currentShot, selectedClub);
        PlayTracking.continue(nextStep);
    };
})

.controller('TrackMood', function ($scope, CurrentRound, PlayTracking, $location, $routeParams) {

    CurrentRound.getCurrentRound($scope);

    var baseUrl, currentHole, currentShot, nextStep, round, selectedClub;

    baseUrl = $location.path() + "/";
    round = $routeParams;

    $scope.heading = "Howasit?";
    $scope.subHeading = "Hole " + round.currentHole + " | Shot "+ round.currentShot + " | " + round.selectedClub;
    $scope.panes = {
        "1": "face face1",
        "2": "face face2",
        "3": "face face3",
        "4": "face face4"
    };

    $scope.selectMood = function (selectedMood) {

        selectedMood = selectedMood;
        nextStep = baseUrl + selectedMood;

        currentHole = $routeParams.currentHole;
        currentShot = $routeParams.currentShot;
        selectedClub = $routeParams.selectedClub;

        CurrentRound.saveShot($scope, currentHole, currentShot, selectedClub, selectedMood);
        PlayTracking.continue(nextStep);
    };
})

.controller('TrackWhatsNext', function ($scope, CurrentRound, PlayTracking, $routeParams) {

    CurrentRound.getCurrentRound($scope);

    $scope.heading = "Watnow?";

    var currentHole = $routeParams.currentHole;
    var currentShot = $routeParams.currentShot;

    $scope.selectNext = function (whatsNext) {
        PlayTracking[whatsNext]($scope, currentHole, currentShot);
    };
})