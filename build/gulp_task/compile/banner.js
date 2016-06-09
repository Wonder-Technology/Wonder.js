var bowerConfig = require("../../../bower.json");
var author = bowerConfig.authors[0];

module.exports = {
    banner: ['/**',
        ' * <%= bowerConfig.name %> - <%= bowerConfig.description %>',
        ' * @version v<%= bowerConfig.version %>',
        ' * @author ' + author,
        ' * @link <%= bowerConfig.homepage %>',
        ' * @license <%= bowerConfig.license %>',
        ' */',
        '',
        ''].join('\n')
};
