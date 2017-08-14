var glslTool = (function () {
    return {
        buildFakeGl: function (sandbox) {
            var gl = glslUtils.buildFakeGl(sandbox);

            gl.commit = sandbox.stub();

            return gl;
        }
    }
})();
