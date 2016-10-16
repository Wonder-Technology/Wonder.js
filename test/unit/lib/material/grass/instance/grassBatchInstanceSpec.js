describe("test grass batch instance", function() {
    var sandbox = null;

    var grassMap;
    var material;

    var director;

    var cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        wd.GPUDetector.getInstance().extensionInstancedArrays = null;


        material = wd.GrassInstanceMaterial.create();

        grassMap = wd.ImageTexture.create();

        material.map = grassMap;

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("test shader", function () {
        beforeEach(function(){
        });

        describe("test send glsl data", function(){
            var device;
            var gl;
            var camera;
            var director;

            var gameObject;
            var program;

            beforeEach(function(){
                device = wd.DeviceManager.getInstance();

                sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
                gl = device.gl;

                director = wd.Director.getInstance();

                camera = testTool.createCamera();


                director.scene.addChild(camera);


                gameObject = grassInstanceTool.createGrass();
                material = gameObject.getComponent(wd.Geometry).material;

                grassInstanceTool.setFakeTerrainGeoemtry(material);

                director.scene.addChild(gameObject);
            });

            describe("test send instance data as uniform data", function(){
                beforeEach(function(){
                    sandbox.stub(Math, "random").returns(0.5);

                    director._init();
                    program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");


                    rendererTool.renderGameObjectScene();
                });

                it("send a_offset;", function () {
                    expect(testTool.getValues(
                        program.sendUniformData.withArgs("a_offset").firstCall.args[2],
                        1
                    )).toEqual([
                        2.5, 0, 2.5, 3.1
                    ]);
                });
                it("send a_shape;", function () {
                    expect(testTool.getValues(
                        program.sendUniformData.withArgs("a_shape").firstCall.args[2],
                        1
                    )).toEqual([
                        0.2, 2.1, 0.1, 0.3
                    ]);
                });
            });
        });

        describe("test glsl source", function(){
            beforeEach(function(){
            });

            it("should contain attribute variables", function(){
                materialTool.init(material);

                var source = material.shader.vsSource;

                expect(glslTool.contain(
                    source,
                    "uniform vec4 a_offset;"
                )).toBeTruthy();
                expect(glslTool.contain(
                    source,
                    "uniform vec4 a_shape;"
                )).toBeTruthy();
            });
        });
    });
});

