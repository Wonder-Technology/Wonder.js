var shaderTool = (function(){
    return {
        judgeGLSLDefine: function(shaderSource, defineStr, defineData){
                expect(shaderSource.indexOf("#define " + defineStr + " " + defineData) > -1).toBeTruthy();
        },
        judgeGLSLUniformData: function(shaderSource, uniformDataStr){
            expect(shaderSource.indexOf(uniformDataStr) > -1).toBeTruthy();
        }
    }
}());
