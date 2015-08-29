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
        extend: function(destination, source) {
            var property = "";

            for (property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        updateAction: function(time, gameObject){
            window.performance.now.returns(time);
            gameObject.actionManager.update(time);
        },
        getValues:function(values){
            if(values){
                if(mathTestUtils.isFloat32Array(values)){
                    return mathTestUtils.getValues(values);
                }
                else{
                    return mathTestUtils.getValues(values.values);
                }
            }

            return mathTestUtils.getValues(matrix.values);
        }
    }
}());
