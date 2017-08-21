var GLSLTool = YYC.Class(GLSLToolBase, {
    Public: {
        buildGLSL: function (sandbox, state) {
            var gl = directorTool.init(state);

            directorTool.loopBody(state);

            return gl;
        }
    }
});

var glslTool = new GLSLTool();
