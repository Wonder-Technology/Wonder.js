module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'test/helper/environment/webgl1.js',
        'test/helper/environment/noWorker.js',

        'dist/wd.forTest.js',


        'examples/js/tool/*.js',


        'test/helper/*.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',
        'test/helper/yoop/yOOP.js',

        'test/unit/utils/**',

        'test/unit/tool/*.js',
        'test/unit/no_worker/tool/*.js',
        'test/unit/no_worker/**/tool/**/*.js',

        // 'test/unit/**/BufferWriter.js',

        // 'test/unit/no_worker/**',
        // 'test/unit/no_worker/**/hotLoad*',
        // 'test/unit/no_worker/**/AssetDatabase*',
        // 'test/unit/no_worker/**/device*',
        // 'test/unit/no_worker/**/Material*',
        // 'test/unit/no_worker/**/vao*',
        // 'test/unit/no_worker/**/reallocate*',
        // 'test/unit/no_worker/**/Matrix4*',
        // 'test/unit/no_worker/**/Scene*',
        // 'test/unit/no_worker/**/*MapManager*',
        // 'test/unit/no_worker/**/*Geometry*',
        'test/unit/no_worker/**/TextureSpec*',
        // 'test/unit/no_worker/**/ColorSpec*',
        // 'test/unit/no_worker/**/shader*Spec*',
        // 'test/unit/no_worker/**/Shader*Spec*',
        // 'test/unit/no_worker/**/*WebGLRenderer*',
        // 'test/unit/no_worker/**/*LightSpec*',
        // 'test/unit/no_worker/**/*PointLightSpec*',
        // 'test/unit/no_worker/**/*Geometry*',
        // 'test/unit/no_worker/**/*LightMaterial*',
        // 'test/unit/no_worker/**/*BasicMaterial*',
        // 'test/unit/no_worker/**/*LightMaterial*',
        // 'test/unit/no_worker/**/Material*',
        // 'test/unit/no_worker/**/frontRender*',
        // 'test/unit/no_worker/**/basicRender*',
        // 'test/unit/no_worker/**/*drawRender*',
        // 'test/unit/no_worker/**/*GameObject*',
        // 'test/unit/no_worker/**/*Camera*',
        // 'test/unit/no_worker/**/Main*',
        // 'test/unit/no_worker/**/createGL*',
        // 'test/unit/**/reallocate*',
        // 'test/unit/**/Camera*',
        // 'test/unit/**/*Camera*',
        // 'test/unit/**/WebGLRenderer*',
        // 'test/unit/**/draw*',
        // 'test/unit/**/renderer/**',
        // 'test/unit/**/Tag*',
        // 'test/unit/**/*Geometry*',
        // 'test/unit/**/*Material*',
        // 'test/unit/**/MeshRenderer*',
        // 'test/unit/**/Main*',
        // 'test/unit/**/ThreeD*',
        // 'test/unit/**/GameObject*',
        // 'test/unit/**/Scene*',
        // 'test/unit/**/shaderSource*',

        {pattern: 'dist/wd.js.map', watched: false, included: false, served: true, nocache:true},

        {pattern: 'test/res/**', watched: false, included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
        '**/temp/*',
        'test/unit/**/webgl2/**'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
