describe("Material", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        material = new dy.Material();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    //describe("useProgram", function(){
    //    var stage;
    //
    //    beforeEach(function(){
    //        stage = dy.Director.getInstance().stage;
    //        sandbox.stub(material.shader.program, "use");
    //    });
    //
    //    it("if Stage use program, return", function(){
    //        stage.useProgram(dy.Shader.create());
    //
    //        material.useProgram();
    //
    //        expect(material.shader.program.use).not.toCalled();
    //    });
    //    it("else, use material's shader's program", function () {
    //        material.useProgram();
    //
    //        expect(material.shader.program.use).toCalledOnce();
    //    });
    //
    //});

    describe("updateShader", function(){
        var stage;

        beforeEach(function(){
            stage = dy.Director.getInstance().stage;
            sandbox.stub(material.shader, "update");
        });

        it("if Stage use program, update Stage's shader", function(){
            stage.useProgram(dy.Shader.create());
            sandbox.stub(stage.shader, "update");
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(stage.shader.update).toCalledWith(quadCmd, material);
        });
        it("else, update material's shader", function () {
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(material.shader.update).toCalledWith(quadCmd, material);
        });
    });
});
