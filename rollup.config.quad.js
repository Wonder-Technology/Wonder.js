import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
    entry: "./examples/samples/quad/main.ts",
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
        })
    ],
    targets: [
        {
            sourceMap: true,
            format: "umd",
            moduleName: "quad",
            dest: "./examples/samples/quad/dist/main.js"
        }
    ]
};
