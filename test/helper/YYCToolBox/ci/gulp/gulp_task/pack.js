require("./createBuildMap");
var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var gulpMinifyCss = require('gulp-minify-css');
//var gulpMinifyHtml = require('gulp-minify-html');


var gulpGetSeajsMainFile = require('../gulp_plugin/getSeajsMainFile/index.js');
var gulpCombo = require('../lib/gulp-seajs-combo/index.js');

gulp.task('packSeajs', ['createBuildMap'], function () {

    return gulp.src('gulp/gulp_plugin/resourceMap.json')
        .pipe(plumber())
        .pipe(gulpGetSeajsMainFile())
        .pipe(gulpCombo({}))
        .pipe(gulpUglify())

        //just set to cwd path,the dest path is set by dist attr in resourceMap.json

        .pipe(gulp.dest('./'));
});


var gulpGetNoCmdJsFile = require('../gulp_plugin/getNoCmdJsFile/index.js'),
    gulpConcat = require('../gulp_plugin/concat/index.js');

gulp.task('packNoCmdJs', ['createBuildMap'], function () {
    return gulp.src('gulp/gulp_plugin/resourceMap.json')
        .pipe(plumber())
        .pipe(gulpGetNoCmdJsFile())
        .pipe(gulpConcat())
        .pipe(gulpUglify())


        //just set to cwd path,the dest path is set by dist attr in resourceMap.json
        .pipe(gulp.dest('./'));
});

var gulpGetCssFile = require('../gulp_plugin/getCssFile/index.js');

gulp.task('packCss', ['createBuildMap'], function () {
    return gulp.src('gulp/gulp_plugin/resourceMap.json')
        .pipe(plumber())
        .pipe(gulpGetCssFile())
        .pipe(gulpConcat())
        .pipe(gulpMinifyCss({
            aggressiveMerging: false,
            compatibility: "*"
        }))

        //just set to cwd path,the dest path is set by dist attr in resourceMap.json
        .pipe(gulp.dest('./'));
});

//var gulpEjsMin = require('gulp-ejsmin')
//
//gulp.task('packHtml', ['createBuildMap'], function () {
//    var opts = {
//        //conditionals: true
//        //loose:true,
//        //spare:true,
//        //empty:true,
//        //cdata:true
//    };
//
//    return gulp.src('dist_views/**/*.ejs')
//        .pipe(plumber())
//        .pipe(gulpMinifyHtml(opts))
//
//        .pipe(gulp.dest('dist_views'));
//});

gulp.task("pack", ["packSeajs", "packNoCmdJs", "packCss"]);
//gulp.task("pack", ["packSeajs"]);

