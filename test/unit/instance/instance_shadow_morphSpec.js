describe("instance+shadow+morph", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var sphere1, sphere1Instance1;
    var instanceArr;

    var renderer;
    var camera;

    var light;

    function createSphere() {
        var material = wd.LightMaterial.create();


        var geometry = geometryTool.createModelGeometry();

        geometry.material = material;



        var gameObject = wd.GameObject.create();

        gameObject.addComponent(wd.MeshRenderer.create());
        gameObject.addComponent(geometry);


        var shadow = wd.Shadow.create();
        shadow.receive = true;
        shadow.cast = true;

        gameObject.addComponent(shadow);




        gameObject.addComponent(wd.MorphAnimation.create());



        return gameObject;
    }

    function prepareWithoutChild() {
        sphere1 = createSphere();
        sphere1.name = "sphere1";

        var sourceInstance = wd.SourceInstance.create();
        sphere1.addComponent(sourceInstance);


        instanceArr = [];

        instanceArr.push(sphere1);

        sphere1Instance1 = instanceTool.cloneInstance(sphere1, "0");

        instanceArr.push(sphere1Instance1);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("test direction light", function () {
        var shader;
        var program;

        beforeEach(function () {
            director.scene.addChild(camera);
            prepareTool.prepareForMap(sandbox);

            light = shadowTool.createDirectionLight();

            director.scene.addChild(light);
        });

        describe("test build shadow map", function () {
            beforeEach(function () {
                prepareWithoutChild();
            });

            describe("test instances", function () {
                function setBuildShadowMapShaderAndProgram(handleProgramFunc) {
                    shadowTool.setTwoDBuildShadowMapShaderAndProgramHelper(sandbox, instanceArr[0], handleProgramFunc, function (s, p) {
                        shader = s;
                        program = p;
                    }, true)
                }

                beforeEach(function () {
                });

                it("should send u_interpolation,a_currentFramePosition,a_nextFramePosition", function () {
                    setBuildShadowMapShaderAndProgram(function (program) {
                        sandbox.stub(program, "sendAttributeBuffer");
                        sandbox.stub(program, "sendUniformData");
                    });

                    director._init();

                    director.scene.gameObjectScene.render(renderer);


                    expect(program.sendUniformData.withArgs("u_interpolation")).toCalledOnce();
                    expect(program.sendAttributeBuffer.withArgs("a_currentFramePosition")).toCalledOnce();
                    expect(program.sendAttributeBuffer.withArgs("a_nextFramePosition")).toCalledOnce();
                });
            });
        });
    });
});
