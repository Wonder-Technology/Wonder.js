var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/create_inner_file/shaderChunk.js");
require("./build/gulp_task/compile/compileReason.js");

gulp.task("build", gulpSync.sync(["createShaderChunkSystemFile", "compileReason"]));






var generate = require("wonder-generate-index");
var path = require("path");

gulp.task("generateIndex", function (done) {
    var rootDir = path.join(process.cwd(), "src"),
        destDir = "./src/";

    generate.generate("/", rootDir, ["**/api/*.re", "**/api/**/*.re"], destDir, {
        exclude: ["System.re", "Utils.re", "Common.re"]
    });

    done();
});



var rollup = require("rollup");




gulp.task("rollup", function () {
    // function buildEntry (config) {
    //     const output = config.output
    //     const { file, banner } = output
    //     const isProd = /min\.js$/.test(file)
    //     return rollup.rollup(config)
    //       .then(bundle => bundle.generate(output))
    //       .then(({ code }) => {
    //         if (isProd) {
    //           var minified = (banner ? banner + '\n' : '') + uglify.minify(code, {
    //             output: {
    //               ascii_only: true
    //             },
    //             compress: {
    //               pure_funcs: ['makeMap']
    //             }
    //           }).code
    //           return write(file, minified, true)
    //         } else {
    //           return write(file, code)
    //         }
    //       })
    //   }
    var inputConfig = {
        input: "./lib/es6_global/src/Index.js",
        plugins: [
        ]
    };
    var outputConfig = {
        file: "./dist/wd.js",
        format: "umd",
        name: "wd",
        indent: '\t'
    };

    return rollup.rollup(inputConfig)
        .then(bundle => bundle.write(outputConfig))
});




