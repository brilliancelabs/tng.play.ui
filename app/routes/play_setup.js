angular.module('TnG')

.config(function ($routeProvider) {
	$routeProvider

	.when('/play/choose/clubset', {
	  controller:'Clubset',
	  templateUrl:'app/views/choose_clubset.angv',
	  resolve: {
	    dependencies: function ($rootScope, $q) {
		    var deferred = $q.defer();
		    var username = $rootScope.loggedInAs;

		    if(username) {
			    deferred.resolve(username);
		    } else {
			    deferred.reject();
		    }

		    return deferred.promise;
	    }
	  }
	})

	.when('/play/choose/course', {
	  controller:'Course',
	  templateUrl:'app/views/choose_course.angv'
	})

	.when('/play/choose/course/start', {
	  controller:'CourseStart',
	  templateUrl:'app/views/choose_course_starting_hole.angv'
	})

});