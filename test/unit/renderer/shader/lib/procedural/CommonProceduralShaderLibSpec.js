describe("CommonProceduralShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.CommonProceduralShaderLib;
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
        expect(lib.type).toEqual("common_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            sandbox.stub(program, "sendAttributeData");
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
    });

    describe("setShaderDefinition", function(){
        var attributeVariableArr;
    
        beforeEach(function(){
            sandbox.stub(lib, "addAttributeVariable");
        });
    
        it("send a_positionVec2", function(){
            lib.setShaderDefinition(cmd);

            attributeVariableArr = lib.addAttributeVariable.args[0][0];
            expect(attributeVariableArr.indexOf("a_positionVec2") > -1).toBeTruthy();
        });
    });
});

