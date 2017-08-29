import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import * as packageData from "wonder-package";

var {namedExportsData, addNamedExports } = packageData.package;

function getNamedExports(namedExportsData) {
    var namedExports = {};

    addNamedExports(namedExports, namedExportsData.immutable);
    addNamedExports(namedExports, namedExportsData.bowser);
    addNamedExports(namedExports, namedExportsData["wonder-expect.js"]);

    return namedExports;
}

var packageConfig = require("./package.json");

var banner = ["/*!",
    " * " + packageConfig.name + " - " +  packageConfig.description,
    " * @version v" + packageConfig.version,
    " * @author " + packageConfig.authors,
    " * @link " + packageConfig.homepage,
    " * @license " + packageConfig.license,
    " */",
    "",
    ""].join("\n");

export default {
    // entry: "./dist/es2015/index.js",
    entry: "./src/index.ts",
    indent: "\t",
    plugins: [
        typescript({
            tsconfig:false,
            typescript:require("typescript")
        }),
        nodeResolve({
            skip:[
            ],
            extensions: [".js", ".ts"]
        }),
        commonjs({
            namedExports: getNamedExports(namedExportsData),
            extensions: [".js", ".ts"]
        })
    ],
    banner:banner,
    targets: [
        {
            sourceMap: true,
            format: "umd",
            moduleName: "wd",
            dest: "./dist/wd.js"
        },
        {
            sourceMap: true,
            format: "es",
            dest: "./dist/wd.module.js"
        }
    ]
};
