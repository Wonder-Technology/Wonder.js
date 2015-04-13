module.exports = function (grunt) {
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                autoWatch: true
            }
        },
        typescript: {
            base: {
                src: ['engine/**/*.ts', 'engine/*.tx'],
                dest: 'engine/Engine.js',
                options: {
                    module: 'commonjs',
                    target: 'es5', //or es3
                    basePath: '',
                    sourceMap: true,
                    declaration: true,
                    noEmitOnError: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma']);
};