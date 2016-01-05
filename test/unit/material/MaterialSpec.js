describe("Material", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        material = new wd.Material();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("test default value", function(){
        expect(material.refractionRatio).toEqual(0);
        expect(material.reflectivity).toEqual(wd.ShaderChunk.NULL);
        expect(material.color).toEqual(wd.Color.create("#ffffff"));
    });

    //describe("useProgram", function(){
    //    var scene;
    //
    //    beforeEach(function(){
    //        scene = wd.Director.getInstance().scene;
    //        sandbox.stub(material.shader.program, "use");
    //    });
    //
    //    it("if SceneDispatcher use program, return", function(){
    //        scene.useProgram(wd.Shader.create());
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
            scene = wd.Director.getInstance().scene;
            sandbox.stub(material.shader, "update");
        });

        it("if SceneDispatcher use program, update SceneDispatcher's shader", function(){
            scene.useProgram(wd.Shader.create());
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
