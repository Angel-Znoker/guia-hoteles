'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin');

// compile scss into css
function style() {
	return gulp.src('./css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
}

// use browserSync to update changes
function server() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
}

function watch() {
	gulp.watch('./css/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/*.js').on('change', browserSync.reload);
	gulp.watch('./css/*.css').on('change', browserSync.reload);
	gulp.watch('./img/*.{png, jpeg, jpg, gif}').on('change', browserSync.reload);
}

gulp.task('default', gulp.parallel(server, watch));

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('copyfonts', function() {
	return gulp.src('./node_modules/open-iconic/font/fonts/*.*')
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
	return gulp.src('./img/*.*')
		.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
	return gulp.src('./*.html')
		.pipe(flatmap(function(stream, file) {
			return stream.pipe(usemin({
				css: [rev()],
				html: [function() {
					return htmlmin({collapseWhitespace: true})
				}],
				js: [uglify(), rev()],
				inlinejs: [uglify()],
				inlinecss: [cleanCss(), 'concat']
			}));
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin'));