'use strict';

var gulp 				= require('gulp'),
		clean				=	require('gulp-clean'),
		concat			= require('gulp-concat'),
		bower				= require('gulp-bower'),
		minifyCss		=	require('gulp-minify-css'),
		prepForMin	=	require('gulp-ngmin'),
		uglify			=	require('gulp-uglify');

gulp.task('build', function() {
	gulp.src([
		'./src/lib/jquery/dist/**/*.js',
		'./src/lib/bootstrap/dist/**/*.js',
		'./src/lib/firebase/**/*.js',
		'./src/lib/angular/angular.js',
		'./src/lib/angular-*/**/*.js',
		'./src/lib/angularfire/**/*.js',
		'!./src/**/*.min.js',
		'./src/app/**/*.js'
	])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./dist/lib'));

	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));

	//Copy styles and fonts
	gulp.src([
		'./src/lib/angular/**/*.css',
		'./src/styles/css/bootstrap.min.css',
		'./src/styles/css/talkngolf.css',
		'./src/styles/css/animation_support.css'
	])
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./dist/styles'));

	gulp.src('./src/styles/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'));

	gulp.src('./src/views/*.angv')
		.pipe(gulp.dest('./dist/views'));

});

gulp.task('prod', function() {

	gulp.src('./dist/lib/lib.js')
		.pipe(prepForMin())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/lib'));

	gulp.src('./dist/styles/styles.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist/styles'));

});

gulp.task('scramble', function() {
	gulp.src('./dist/lib/lib.js')
		.pipe(prepForMin())
		.pipe(gulp.dest('./dist/lib'));
});

gulp.task('default', ['build', 'prod']);