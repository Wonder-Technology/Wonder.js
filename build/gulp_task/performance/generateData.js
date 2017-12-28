var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("generatePfData", function (done) {
    exec("npm run test:pf_generate", { maxBuffer: 2048 * 1000 }, function (err, stdout, stderr) {
        if (err) {
            throw err;
        }

        done();
    });
});


