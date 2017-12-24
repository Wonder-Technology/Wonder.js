var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("compileReason", function (done) {
    exec("npm run build", { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
        if (err) {
            throw err;
        }

        done();
    });
});
