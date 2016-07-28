module.exports = function (grunt) {
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                autoWatch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma']);
};