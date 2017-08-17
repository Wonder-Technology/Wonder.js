var glslWebGL2Tool = (function () {
    return {
        buildGLSL: function (sandbox, state) {
            var gl = directorTool.init(sandbox);

            directorTool.loopBody(state);

            return gl;
        }
    }
}());
