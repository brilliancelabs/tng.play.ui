'use strict';

var app = angular.module('TnG')

.service('CurrentPlayer', function () {
	this.getUsername = function () {
		return "morganpressel";
	};
});