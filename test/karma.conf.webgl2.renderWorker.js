module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'test/unit/environment/webgl2.js',
        'test/unit/environment/renderWorker.js',

        'dist/wd.forTest.js',
        'dist/worker/wd.renderWorker.js',



        'examples/js/tool/*.js',


        'test/helper/*.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',
        'test/helper/yoop/yOOP.js',

        'test/unit/utils/**',

        'test/unit/tool/*.js',
        'test/unit/worker/tool/*.js',
        'test/unit/worker/**/tool/*.js',
        'test/unit/worker/utils/*.js',

        'test/unit/worker/**',
        // 'test/unit/worker/**/MainSpec*',
        // 'test/unit/worker/**/texture*',
        // 'test/unit/worker/**/material*',
        // 'test/unit/worker/**/lightMaterial*',
        // 'test/unit/worker/**/disposeTexture*',
        // 'test/unit/worker/**/disposeGeometry*',
        // 'test/unit/worker/**/lightSpec*',
        // 'test/unit/worker/**/DirectorSpec*',

        {pattern: 'dist/wd.js.map', watched: false, included: false, served: true, nocache:true},
        {pattern: 'dist/worker/wd.renderWorker.js.map', watched: false, included: false, served: true, nocache:true},

        {pattern: 'test/res/**', watched: false, included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
        '**/temp/*',
        'test/unit/**/webgl1/**'
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
