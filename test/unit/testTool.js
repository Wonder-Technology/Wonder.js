var testTool = (function(){
    return {
        resPath: "base/",

        buildFakeGl: function(sandbox){
            return {
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
