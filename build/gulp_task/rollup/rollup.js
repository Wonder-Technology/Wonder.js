var gulp = require("gulp");
var rollup = require("rollup");
var nodeResolve = require("rollup-plugin-node-resolve");
var commonjs = require("rollup-plugin-commonjs");

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
        nodeResolve({
            skip:[
            ],
            extensions: [".js"]
        }),
        commonjs({
            namedExports: {
            },
            extensions: [".js"]
        })
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