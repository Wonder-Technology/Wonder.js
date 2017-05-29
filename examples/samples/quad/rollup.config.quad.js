import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import bundleWorker from 'rollup-plugin-bundle-worker';
// import fileAsBlob from 'rollup-plugin-file-as-blob';

export default {
    entry: "./examples/samples/quad/main.ts",
    indent: "\t",
    plugins: [
        // bundleWorker(),
        // fileAsBlob({
        //     include: './examples/samples/quad/renderWorker.js'
        // }),

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
            dest: "./examples/samples/quad/dist/main.js"
        }
    ]
};
