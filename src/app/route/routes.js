angular.module('TnG').config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: "/play"
		})
		.when('/play', {
			controller: "Demo",
			templateUrl: "views/starting_hole.angv"
		})
		.when('/play/:hole/par', {
			controller: "Demo",
			templateUrl: "views/hole_par.angv"
		})
		.when('/play/:hole/:shot', {
			controller: "Demo",
			templateUrl: "views/shot_club.angv"
		})
		.when('/play/:hole/:shot/:club', {
			controller: "Demo",
			templateUrl: "views/club_mood.angv"
		})
		.when('/play/:hole/:shot/:club/:mood', {
			controller: "Demo",
			templateUrl: "views/next_action.angv",
			resolve: {
				"dependencies": function ($rootScope, $route, $firebase) {
					var roundState = $route.current.params;
					var thisShot = $rootScope.round.child(roundState.hole).child('shots').child(roundState.shot);

					thisShot.set(roundState);
				}
			}
		})
});