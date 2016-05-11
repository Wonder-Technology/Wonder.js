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
        spyProgram:function(sandbox, arg){
            var program = null;

            if(arg.program){
                program = arg.program;
            }
            else{
                program = arg;
            }

            sandbox.spy(program, "sendUniformData");
            sandbox.spy(program, "sendAttributeData");
            sandbox.spy(program, "sendStructureData");
            sandbox.spy(program, "use");

            sandbox.spy(program, "sendFloat1");
            sandbox.spy(program, "sendFloat2");
            sandbox.spy(program, "sendFloat3");
            sandbox.spy(program, "sendFloat4");
            sandbox.spy(program, "sendVector2");
            sandbox.spy(program, "sendVector3");
            sandbox.spy(program, "sendVector4");
            sandbox.spy(program, "sendColor4");
            sandbox.spy(program, "sendNum1");
            sandbox.spy(program, "sendMatrix3");
            sandbox.spy(program, "sendMatrix4");
            sandbox.spy(program, "sendSampleArray");
        },
        stubProgram:function(sandbox, arg){
            var program = null;

            if(arg.program){
                program = arg.program;
            }
            else{
                program = arg;
            }


            sandbox.stub(program, "sendUniformData");
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendStructureData");
            sandbox.stub(program, "use");


            sandbox.stub(program, "sendFloat1");
            sandbox.stub(program, "sendFloat2");
            sandbox.stub(program, "sendFloat3");
            sandbox.stub(program, "sendFloat4");
            sandbox.stub(program, "sendVector2");
            sandbox.stub(program, "sendVector3");
            sandbox.stub(program, "sendVector4");
            sandbox.stub(program, "sendColor4");
            sandbox.stub(program, "sendNum1");
            sandbox.stub(program, "sendMatrix3");
            sandbox.stub(program, "sendMatrix4");
            sandbox.stub(program, "sendSampleArray");
        },
        judgeGLSLDefine: function(shaderSource, defineStr, defineData){
                expect(shaderSource.indexOf("#define " + defineStr + " " + defineData) > -1).toBeTruthy();
        },
        judgeGLSLUniformData: function(shaderSource, uniformDataStr){
            expect(shaderSource.indexOf(uniformDataStr) > -1).toBeTruthy();
        },
        getShaderLibCount: function(shader, libClass){
            return shader.getLibs().filter(function(lib){
                return lib instanceof libClass;
            }).getCount();
        }
    }
}());
