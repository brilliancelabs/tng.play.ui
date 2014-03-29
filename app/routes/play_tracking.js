var app = angular.module('TnG')

.config(function ($routeProvider) {
	$routeProvider
	.when('/play/track/:currentHole', {
		redirectTo: "/play/track/:currentHole/1"
	})

	.when('/play/track/:currentHole/:currentShot', {
		controller: 'TrackClub',
		templateUrl: 'app/views/tracking_club.angv'
	})

	.when('/play/track/:currentHole/:currentShot/:selectedClub', {
		controller: 'TrackMood',
		templateUrl: 'app/views/tracking_mood.angv'
	})

	.when('/play/track/:currentHole/:currentShot/:selectedClub/:moodSwing', {
		controller: 'TrackWhatsNext',
		templateUrl: 'app/views/tracking_whats_next.angv'
	})
});