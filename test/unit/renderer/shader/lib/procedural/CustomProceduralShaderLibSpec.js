describe("CustomProceduralShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.CustomProceduralShaderLib;
        lib = new Lib();

        cmd = new wd.ProceduralCommand();
        program = new wd.Program();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("type", function () {
        expect(lib.type).toEqual("custom_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            lib._proceduralTexture = {
                uniformMap: wdCb.Hash.create({
                    "u_dirtAmplifier": {
                        "type": "FLOAT_1",
                        "value": "6.0"
                    }
                })
            };

            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        });

        it("send a_positionVec2", function () {
            cmd.vertexBuffer = wd.ArrayBuffer.create(new Float32Array([
                1, 1,
                -1, 1,
                -1, -1,
                1, -1
            ]), 2, wd.EBufferType.FLOAT);

            lib.sendShaderVariables(program, cmd);

            expect(program.sendAttributeData).toCalledWith("a_positionVec2", wd.EVariableType.BUFFER, cmd.vertexBuffer);
        });
        it("send custom uniform data", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_dirtAmplifier", wd.EVariableType.FLOAT_1, "6.0");
        });
    });

    describe("setShaderDefinition", function(){
        var attributeVariableArr;
    
        beforeEach(function(){
            sandbox.stub(lib, "addAttributeVariable");

            lib._proceduralTexture = {
                fsSource:"void main(){};"
            };
        });
    
        it("send a_positionVec2", function(){
            lib.setShaderDefinition(cmd);

            attributeVariableArr = lib.addAttributeVariable.args[0][0];
            expect(attributeVariableArr.indexOf("a_positionVec2") > -1).toBeTruthy();
        });
        it("set texture.fsSource to be fsSource", function () {
            lib.setShaderDefinition(cmd);

            expect(lib.fsSource).toEqual(lib._proceduralTexture.fsSource);
        });
    });
});

