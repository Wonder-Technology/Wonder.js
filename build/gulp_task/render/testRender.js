var gulp = require("gulp");
var path = require("path");
var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));
var test = require("../e2e/test");

gulp.task("testRender", function (done) {
    test.test(testRender.generateCorrectImage, testRender.runTest, "generate correct image...", "render", done);
});
