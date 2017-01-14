module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'dist/wd.all.innerLib.js',
            'dist/wd.all.debug.js',

            'lib/outer/cannon/cannon.js',

            'test/helper/jquery.js',
            'test/helper/yTool.js',
            'test/helper/bowser.js',

            //'test/helper/jsExtend.js',
            'test/helper/jasmine/**',
            'test/helper/sinonJs/*.js',
            'test/helper/yoop/yOOP.js',
            'test/unit/**/*Tool.js',
            'test/unit/*Tool.js',


            'test/unit/**',

            {pattern: 'test/res/**', watched: false, included: false, served: true}
        ],


        // list of files to exclude
        exclude: [
            '**/temp/*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'dist/wd.all.debug.js': 'coverage'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir : 'test/coverage/',
            reporters: [
                { type: 'lcov'}
            ]
        },



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
        browsers: ['Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};