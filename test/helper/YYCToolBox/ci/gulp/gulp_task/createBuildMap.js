require("./prepare");
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var createBuildMap = require('../gulp_plugin/createBuildMap/index.js');

gulp.task('createBuildMap',["prepare"], function(){
    return gulp.src('dist_views/**/*.ejs')
        .pipe(plumber())
        .pipe(createBuildMap());
});


