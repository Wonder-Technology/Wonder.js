describe("CustomProceduralShader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shader = new wd.CustomProceduralShader();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("update", function(){
        var cmd;
        //var lib;

        beforeEach(function(){
            cmd = wd.ProceduralCommand.create();

            shader.program = wd.Program.create();

            //
            //sandbox.stub(shader, "judgeRefreshShader");
            sandbox.stub(shader.program, "use");

            //lib = {
            //    sendShaderVariables:sandbox.stub()
            //}
            //shader.addLib(lib);
        });

        it("update correspond maps from custom procedural texture data", function () {
            var texture = wd.CustomProceduralTexture.create();
            sandbox.stub(texture.mapManager, "bindAndUpdate");
            shader._texture = texture;

            shader.update(cmd);

            expect(texture.mapManager.bindAndUpdate).toCalledOnce();
        });
        it("send data of correspond maps", function () {
            var texture = wd.CustomProceduralTexture.create();
            sandbox.stub(texture.mapManager, "bindAndUpdate");
            sandbox.stub(texture.mapManager, "sendData");
            shader._texture = texture;

            shader.update(cmd);

            expect(texture.mapManager.sendData).toCalledOnce();
            expect(texture.mapManager.sendData).toCalledAfter(texture.mapManager.bindAndUpdate);
        });
    });
});
