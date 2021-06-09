const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts']);
gulp.task('deps.js', () => {
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-animate/angular-animate.js',
        'angular-foundation.js',
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/assets/js'))
});

gulp.task('deps.css', () => {
    return gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css',
    ])
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/assets/css'))
});

gulp.task('deps.fonts', () => {
    return gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('public/assets/fonts/'))
});

