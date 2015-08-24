var testTool = (function(){
    return {
        resPath: "base/",

        buildFakeGl: function(sandbox){
            return {
                enable:sandbox.stub(),
                disable:sandbox.stub(),
                polygonOffset:sandbox.stub(),
                colorMask:sandbox.stub(),
                depthMask:sandbox.stub(),
                cullFace:sandbox.stub(),
                blendFunc:sandbox.stub(),
                blendEquation:sandbox.stub(),
                createProgram:sandbox.stub(),
                clearColor:sandbox.stub(),
                clear:sandbox.stub()
            };
        },
        updateAction: function(time, gameObject){
            window.performance.now.returns(time);
            gameObject._actionManager.update(time);
        }
    }
}());
