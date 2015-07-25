var gulp = require("gulp");
var del = require("del");
var distPath = "dist";

gulp.task("clean", function() {
    return del.sync([distPath], {
        force: true
    });
});

