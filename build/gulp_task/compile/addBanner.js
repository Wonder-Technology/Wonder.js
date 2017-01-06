var gulp = require("gulp");
var gulpHeader = require("gulp-header");
var path = require("path");

var bowerConfig = require("../../../bower.json");
// var author = bowerConfig.authors[0];

var banner = ['/*!',
        ' * <%= bowerConfig.name %> - <%= bowerConfig.description %>',
        ' * @version v<%= bowerConfig.version %>',
        // ' * @author ' + author,
        ' * @link <%= bowerConfig.homepage %>',
        ' * @license <%= bowerConfig.license %>',
        ' */',
        '',
        ''].join('\n');

var distPath = path.join(process.cwd(), "dist");

function addBanner(wdDtsFilePath, wdFilePath) {
    return gulp.src([wdDtsFilePath, wdFilePath])
        .pipe(gulpHeader(banner, {bowerConfig:bowerConfig}))
        .pipe(gulp.dest(distPath));
}


module.exports = {
    addBanner: addBanner
};
