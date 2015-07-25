// Karma configuration
// Generated on Wed Nov 05 2014 07:16:09 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/yyctoolbox/tool/yTool.js',

        //'src/math/*.js',
        'dist/Engine.innerLib.js',
        'dist/Engine.debug.js',

        'test/helper/jsExtend.js',
        'test/helper/jasmine/**',
        'test/helper/sinonJs/*.js',

        //'test/unit/**/*.js'
        'test/unit/math/*.js',
        //'test/unit/event/eventSpec.js'
        'test/unit/event/*.js'
        //'test/unit/event/mouseEventSpec.js'
        //'test/unit/utils/browserDetector/useragents.js',
        //'test/unit/utils/**/*.js',

        //{pattern: 'src/**/*.js.map', watched: false, included: false, served: true},
        //{pattern: 'src/**/*.ts', watched: false, included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
        '**/temp/*'
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
