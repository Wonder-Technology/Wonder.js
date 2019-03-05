const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

var wdConfig = {
    entry: {
        "wd": "./lib/es6_global/src/Index.js"
    },
    mode: isProd ? 'production' : 'development',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "dist"),
        library: 'wd',
        libraryTarget: 'umd'
    },
    target: "web"
};

var wdRenderWorkerConfig = {
    entry: {
        "wd.render.worker": "./lib/es6_global/src/worker/render/RenderWorkerIndex.js"
    },
    mode: isProd ? 'production' : 'development',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "dist"),
        library: 'wdrd',
        libraryTarget: 'umd'
    },
    target: "webworker"
};

module.exports = [wdConfig, wdRenderWorkerConfig];
