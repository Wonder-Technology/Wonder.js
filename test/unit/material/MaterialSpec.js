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

    it("test default value", function(){
        expect(material.refractionRatio).toEqual(0);
        expect(material.reflectivity).toEqual(dy.ShaderChunk.NULL);
        expect(material.color).toEqual(dy.Color.create("#ffffff"));
    });

    //describe("useProgram", function(){
    //    var scene;
    //
    //    beforeEach(function(){
    //        scene = dy.Director.getInstance().scene;
    //        sandbox.stub(material.shader.program, "use");
    //    });
    //
    //    it("if Scene use program, return", function(){
    //        scene.useProgram(dy.Shader.create());
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
        var scene;

        beforeEach(function(){
            scene = dy.Director.getInstance().scene;
            sandbox.stub(material.shader, "update");
        });

        it("if Scene use program, update Scene's shader", function(){
            scene.useProgram(dy.Shader.create());
            sandbox.stub(scene.shader, "update");
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(scene.shader.update).toCalledWith(quadCmd, material);
        });
        it("else, update material's shader", function () {
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(material.shader.update).toCalledWith(quadCmd, material);
        });
    });
});
