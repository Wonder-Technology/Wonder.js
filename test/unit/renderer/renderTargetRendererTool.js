var renderTargetRendererTool = {
    getDrawShadowMapShaderAndProgramHelper: function (sandbox, obj, isNotStub) {
        //var shader = obj.getComponent(wd.Geometry).material.shader;
        var shader = obj.getComponent(wd.Geometry).material._shaderManager._mainShader;

        var program = shader.program;

        if (!isNotStub) {
            sandbox.stub(program, "sendUniformData");
        }

        return {
            shader: shader,
            program: program
        };
    }
};
