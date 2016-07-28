var gulp = require('gulp');
var plumber = require('gulp-plumber');
require("./createBuildMap");


var gulpRewrite= require('../gulp_plugin/rewriteStaticResourceUrl/index.js');

gulp.task('rewriteStaticeResource',['createBuildMap'], function(){
    return gulp.src('dist_views/**/*.ejs')
        .pipe(plumber())
        .pipe(gulpRewrite())
        .pipe(gulp.dest('dist_views/'));
});

gulp.task("rewrite", ["rewriteStaticeResource"]);
