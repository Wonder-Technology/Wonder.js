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

export default {
    entry: "./src/renderer/worker/render_file/RenderWorkerIndex.ts",
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
    targets: [
        {
            sourceMap: true,
            format: "umd",
            moduleName: "wdrd",
            dest: "./dist/worker/wd.renderWorker.js"
        }
    ]
};
