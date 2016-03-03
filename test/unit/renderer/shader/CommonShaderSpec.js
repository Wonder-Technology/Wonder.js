describe("CommonShader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shader = new wd.CommonShader();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("update", function(){
        var quadCmd,material;
        var lib;

        beforeEach(function(){
            quadCmd = wd.QuadCommand.create();
            material = new wd.Material();

            shader.program = wd.Program.create();


            sandbox.stub(shader, "judgeRefreshShader");
            sandbox.stub(shader.program, "use");
            sandbox.stub(shader.program, "sendAttributeDataFromCustomShader");
            sandbox.stub(shader.program, "sendUniformDataFromCustomShader");


            lib = {
                sendShaderVariables:sandbox.stub()
            }
            shader.addLib(lib);
        });

        it("judge to refresh shader", function(){
            shader.update(quadCmd, material);

            expect(shader.judgeRefreshShader).toCalledOnce();
        });
        it("use program", function () {
            shader.update(quadCmd, material);

            expect(shader.program.use).toCalledOnce();
            expect(shader.program.use).toCalledBefore(lib.sendShaderVariables);
        });
        it("send shaderLib->variables", function () {
            shader.update(quadCmd, material);

            expect(lib.sendShaderVariables).toCalledOnce();
        });
        it("sendAttributeDataFromCustomShader", function () {
            shader.update(quadCmd, material);

            expect(shader.program.sendAttributeDataFromCustomShader).toCalledOnce();
        });
        it("sendUniformDataFromCustomShader", function () {
            shader.update(quadCmd, material);

            expect(shader.program.sendUniformDataFromCustomShader).toCalledOnce();
        });
        it("send map data", function () {
            sandbox.stub(material.mapManager, "sendData");

            shader.update(quadCmd, material);

            expect(material.mapManager.sendData).toCalledOnce();
        });
    });

    describe("read", function(){
        beforeEach(function(){
        });

        it("read definition data", function(){
            sandbox.stub(shader.sourceBuilder, "read");
            var shaderDefinitionData = {
            }

            shader.read(shaderDefinitionData);

            expect(shader.sourceBuilder.read).toCalledWith(shaderDefinitionData);
        });
        it("mark lib dirty", function () {
            shader.libDirty = false;

            shader.read({});

            expect(shader.libDirty).toBeTruthy();
        });
    });
});
