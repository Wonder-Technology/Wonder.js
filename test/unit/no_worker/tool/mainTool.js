var mainTool = (function () {
    return {
        buildFakeDomQuery: function (sandbox, canvasDom) {
            return {
                css: sandbox.stub(),
                get: sandbox.stub().returns(canvasDom)
            };
        },
        buildInitCanvasDom: function (sandbox) {
            return {
                style: {},
                width: 1,
                height: 2,
                getContext: sandbox.stub().returns(glslTool.buildFakeGl(sandbox))
            };
        }
    }
}());

