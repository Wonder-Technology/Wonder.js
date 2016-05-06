var shaderTool = (function(){
    return {
        getAndSpyProgram: function(sandbox, material, programName){
            var program = material.program;

            this.spyProgram(sandbox, material);

            if(programName){
                program.name = programName;
            }

            return program;
        },
        getAndStubProgram: function(sandbox, material, programName){
            var program = material.program;

            this.spyProgram(sandbox, material);

            if(programName){
                program.name = programName;
            }

            return program;
        },
        spyProgram:function(sandbox, material){
            sandbox.spy(material.program, "sendUniformData");
            sandbox.spy(material.program, "sendAttributeData");
            sandbox.spy(material.program, "sendStructureData");
            sandbox.spy(material.program, "use");
        },
        stubProgram:function(sandbox, material){
            sandbox.stub(material.program, "sendUniformData");
            sandbox.stub(material.program, "sendAttributeData");
            sandbox.stub(material.program, "sendStructureData");
            sandbox.stub(material.program, "use");
        },
        judgeGLSLDefine: function(shaderSource, defineStr, defineData){
                expect(shaderSource.indexOf("#define " + defineStr + " " + defineData) > -1).toBeTruthy();
        },
        judgeGLSLUniformData: function(shaderSource, uniformDataStr){
            expect(shaderSource.indexOf(uniformDataStr) > -1).toBeTruthy();
        }
    }
}());
