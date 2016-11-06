describe("LightEndShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program,material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.LightEndShaderLib;
        lib = new Lib();

        material = wd.LightMaterial.create();
        cmd = new wd.QuadCommand();
        program = new wd.Program();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("setShaderDefinition", function(){
        beforeEach(function(){
        });

        it("if material.alphaTest === null, not test alpha", function () {
            lib.setShaderDefinition(cmd, material);

            expect(glslTool.contain(lib.fsSourceBody, "discard;")).toBeFalsy();
        });
        it("if material.alphaTest !== null, test alpha", function () {
            material.alphaTest = 0.1;

            lib.setShaderDefinition(cmd, material);

            expect(glslTool.containMultiLine(lib.fsSourceBody, [
                "if (totalColor.a < 0.1){",
                "discard;",
                "}"
            ])).toBeTruthy();
        });
    });
});

