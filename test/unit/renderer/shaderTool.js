var shaderTool = (function(){
    return {
        getAndSpyProgram: function(sandbox, material){
            //var isTest = wd.Main.isTest;
            //
            //testTool.closeContractCheck();
            //
            //var program = shader.program;
            //
            //wd.Main.isTest = isTest;
            //
            //if(program){
            //    return program;
            //}
            //
            //
            //
            //return wd.Program.create();
            var program = material.program;

            this.spyProgram(sandbox, material);

            return program;
        },
        getAndStubProgram: function(sandbox, material){
            var program = material.program;

            this.spyProgram(sandbox, material);

            return program;
        },
        spyProgram:function(sandbox, material){
            sandbox.spy(material.program, "sendUniformData");
            sandbox.spy(material.program, "sendAttributeData");
            sandbox.spy(material.program, "sendStructureData");
        },
        stubProgram:function(sandbox, material){
            sandbox.stub(material.program, "sendUniformData");
            sandbox.stub(material.program, "sendAttributeData");
            sandbox.stub(material.program, "sendStructureData");
        },
        judgeGLSLDefine: function(shaderSource, defineStr, defineData){
                expect(shaderSource.indexOf("#define " + defineStr + " " + defineData) > -1).toBeTruthy();
        },
        judgeGLSLUniformData: function(shaderSource, uniformDataStr){
            expect(shaderSource.indexOf(uniformDataStr) > -1).toBeTruthy();
        }
    }
}());
