import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    entry: "./examples/samples/quad/collisionWorker.ts",
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
            namedExports: {
                "./node_modules/bowser/src/bowser.js": ["version", "chrome","msie", "firefox", "mobile"],
                "./node_modules/wonder-expect.js/index.js": ["expect"]
            },
            extensions: [".js", ".ts"]
        })
    ],
    targets: [
        {
            sourceMap: true,
            format: "umd",
            moduleName: "quad",
            dest: "./examples/samples/quad/dist/collisionWorker.js"
        }
    ]
};
