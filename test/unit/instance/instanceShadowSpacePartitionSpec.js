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
        sphere1.name = "sphere1";
        var sourceInstance = wd.OneToOneSourceInstance.create();
        sphere1.addComponent(sourceInstance);


        child1 = createSphere();
        child1.name = "sphere1_child1";
        child1.removeComponent(wd.Shadow);

        sphere1.addChild(child1);



        instanceArr = [];

        instanceArr.push(sphere1);

        sphere1Instance1 = instanceTool.cloneInstance(sphere1, "0");

        child1Instance1 = sphere1Instance1.getChild(0);


        instanceArr.push(sphere1Instance1);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        octreeObject = octreeTool.createOctree();
        octreeObject.name = "octreeObject";

        octreeObject.addChildren(instanceArr);


        director.scene.addChild(octreeObject);


        director.scene.addChild(camera);
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.resetData();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);

        camera = testTool.createCamera();
        camera.name = "cameraObject";

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
            light.name = "light";

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

                        var shader1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere1, true).shader;
                        var shader11 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, child1, true).shader;


                        var shader2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere1Instance1, true).shader;
                        var shader21 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, child1Instance1, true).shader;

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

                octreeObject.getComponent(wd.Octree).isCollideEnable = false;
            });

            it("init shouldn't contract error", function () {
                testTool.openContractCheck(sandbox);

                expect(function(){
                    director._init();
                }).not.toThrow();
            });

            describe("test build shadow map", function(){
                var shader;
                var program;

                function setBuildShadowMapShaderAndProgram(obj, handleProgramFunc) {
                    shadowTool.setTwoDBuildShadowMapShaderAndProgramHelper(sandbox, obj, handleProgramFunc, function(s, p){
                        shader = s;
                        program = p;
                    })
                }

                describe("batch draw instances", function() {
                    var sphere1Material;
                    var map;

                    beforeEach(function () {
                        sphere1Material = sphere1.getComponent(wd.Geometry).material;

                        map = wd.ImageTexture.create({});
                        sandbox.stub(map, "bindToUnit");

                        sphere1Material.map = map;
                        sphere1Material.redWrite = false;

                        setBuildShadowMapShaderAndProgram(sphere1, function(program){
                            //sandbox.spy(program, "use");
                            //sandbox.spy(program, "sendUniformData");
                            //sandbox.spy(program, "sendAttributeBuffer");
                        })
                    });

                    it("only render source object, but draw all the no-culled objects one by one by drawElements", function () {
                        director._init();


                        directorTool.updateGameObjectScene();
                        director.scene.gameObjectScene.render(renderer);


                        expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 + 2);

                        expect(sphere1.render).toCalledTwice();

                        expect(sphere1Instance1.render).not.toCalled();


                        expect(child1.render).toCalledTwice();

                        expect(sphere1Instance1.getChild(0).render).not.toCalled();


                        expect(gl.drawElements.callCount).toEqual(2 + 2);

                        expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
                    });
                });
            });
        });
    });
});
