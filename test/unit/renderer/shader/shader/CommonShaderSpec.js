describe("CommonShader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shader = wd.CommonShader.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("update", function(){
        var quadCmd,material;
        var lib;

        beforeEach(function(){
            quadCmd = rendererTool.createQuadCommand(sandbox);
            material = wd.LightMaterial.create();

            shader.program = wd.Program.create();


            sandbox.stub(shader, "judgeRefreshShader");
            sandbox.stub(shader.program, "use");


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
        it("send map data", function () {
            sandbox.stub(shader.mapManager, "sendData");

            shader.update(quadCmd, material);

            expect(shader.mapManager.sendData).toCalledOnce();
        });
    });
});
