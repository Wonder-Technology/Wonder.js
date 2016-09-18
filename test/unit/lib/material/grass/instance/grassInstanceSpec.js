describe("test grass instance", function() {
    var sandbox = null;

    var grassMap;
    var material;

    var director;

    var extensionInstancedArrays;

    var cmd;

    function prepareCmd(){
        cmd = rendererTool.createQuadCommand(sandbox);
        cmd.material = material;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        material = wd.GrassInstanceMaterial.create();

        grassMap = wd.ImageTexture.create();

        material.map = grassMap;

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("test animation", function(){
        beforeEach(function(){
            prepareCmd();

            grassInstanceTool.setFakeGeoemtry(material);
        });

        it("test time increase at each frame", function(){
            material.speed = 0.1;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);
            material.updateShader(cmd);

            expect(material.program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, 0.1);
            expect(material.program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, 0.2);
        });

        describe("test fs glsl source", function () {
            var vsSource;

            beforeEach(function(){
                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);

                vsSource = material.shader.vsSource;
            });

            it("use sin function to generate animation effect", function () {
                expect(glslTool.contain(vsSource, "float curve = a_shape.w + 0.4 * (sin(u_time * 4.0 + a_offset.x * 0.8) + cos(u_time * 4.0 + a_offset.y * 0.8));"));
            });
        });
    });
});

