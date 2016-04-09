describe("instance with shadow and octree", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var sphere1, sphere1Instance1;
    var child1, child1Instance1;

    var instanceArr;

    var octreeObject;

    var renderer;
    var camera;

    var light;

    function createSphere() {
        return shadowTool.createSphere();
    }

    function prepareWithChild() {
        sphere1 = createSphere();
        var sourceInstance = wd.SourceInstance.create();
        sphere1.addComponent(sourceInstance);


        child1 = createSphere();
        child1.removeComponent(wd.Shadow);

        sphere1.addChild(child1);



        instanceArr = [];

        instanceArr.push(sphere1);

        sphere1Instance1 = instanceTool.cloneInstance(sphere1, "0");

        child1Instance1 = sphere1Instance1.getChild(0);


        instanceArr.push(sphere1Instance1);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        octreeObject = octreeTool.createOctree();

        octreeObject.addChildren(instanceArr);


        director.scene.addChild(octreeObject);


        director.scene.addChild(camera);
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
        beforeEach(function () {
            prepareWithChild();
            prepareTool.prepareForMap(sandbox);


            light = shadowTool.createDirectionLight();

            director.scene.addChild(light);
        });

        describe("draw based on shadow map", function() {
            describe("test shadow map", function () {
                beforeEach(function () {
                });

                describe("if receive shadow", function () {
                    beforeEach(function () {
                        sphere1.getComponent(wd.Shadow).receive = true;
                        sphere1Instance1.getComponent(wd.Shadow).receive = true;
                    });

                    it("fs glsl should contain shadow map glsl", function () {
                        director._init();

                        var shader1 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere1, true).shader;
                        var shader11 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, child1, true).shader;


                        var shader2 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere1Instance1, true).shader;
                        var shader21 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, child1Instance1, true).shader;

                        expect(glslTool.contain(shader1.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                        expect(glslTool.contain(shader11.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();

                        expect(glslTool.contain(shader2.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                        expect(glslTool.contain(shader21.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                    });
                });
            });
        });


        describe("if hardware not support", function () {
            beforeEach(function () {
                wd.GPUDetector.getInstance().extensionInstancedArrays = null;
            });

            it("init shouldn't contract error", function () {
                testTool.openContractCheck(sandbox);

                expect(function(){
                    director._init();
                }).not.toThrow();
            });
        });
    });
});
