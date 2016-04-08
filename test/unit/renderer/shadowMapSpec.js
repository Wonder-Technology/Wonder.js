describe("shadow map", function() {
    var sandbox = null;
    var shadow = null;

    var deviceManager;

    var director;
    var sphere;
    var light;

    var renderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        testTool.clearInstance();
        director = wd.Director.getInstance();

        deviceManager = wd.DeviceManager.getInstance();

        sandbox.stub(deviceManager, "gl", testTool.buildFakeGl(sandbox));

        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("integrate test", function() {
        function createSphere() {
            return shadowTool.createSphere();
        }

        beforeEach(function () {
            sphere = createSphere();
            sphere.name = "sphere";
            //light = shadowTool.createDirectionLight([sphere]);
            light = shadowTool.createDirectionLight();

            director.scene.addChild(sphere);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        describe("test Shadow component of first level object and its children", function () {
            beforeEach(function () {
                testTool.openContractCheck(sandbox);
            });

            describe("not allow: the first level object of gameObjectScene not contain Shadow component but its children contain", function () {
                beforeEach(function () {
                    sphere.removeComponent(wd.Shadow);
                });

                it("except the first level object contain space partition component", function () {
                    var octreeObject = octreeTool.createOctree();

                    var child = createSphere();

                    octreeObject.addChild(child);

                    director.scene.addChild(octreeObject);


                    expect(function () {
                        director._init();

                        director.scene.gameObjectScene.render(renderer);
                    }).not.toThrow();
                });
                it("otherwise, error", function () {
                    var child = createSphere();
                    child.addComponent(wd.Shadow.create());

                    sphere.addChild(child);


                    expect(function () {
                        director._init();

                        director.scene.gameObjectScene.render(renderer);
                    }).toThrow();
                });
            });

            describe("test the first level object and its children both has Shadow component", function () {
                var shadow1, shadow2;
                var child;

                beforeEach(function () {
                    shadow1 = sphere.getComponent(wd.Shadow);

                    child = createSphere();
                    shadow2 = wd.Shadow.create();
                    child.addComponent(shadow2);


                    sphere.addChild(child);
                });

                it("the Shadow's cast is determined by the first level object's shadow", function () {
                    shadow1.cast = true;
                    shadow2.cast = false;

                    sandbox.spy(sphere, "render");
                    sandbox.spy(child, "render");


                    director._init();


                    director.scene.gameObjectScene.render(renderer);

                    expect(sphere.render).toCalledTwice();
                    expect(child.render).toCalledTwice();
                });
                it("the Shadow's receive is determined by the first level object's shadow", function () {
                    shadow1.receive = false;
                    shadow2.receive = true;


                    director._init();

                    var shader1 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere).shader;
                    var shader2 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, child).shader;

                    expect(glslTool.contain(shader1.fsSource, "u_twoDShadowMapSampler")).toBeFalsy();
                    expect(glslTool.contain(shader2.fsSource, "u_twoDShadowMapSampler")).toBeFalsy();
                });
                //it("if cast shadow, only add build shadow map shader of children once", function () {
                //    shadow1.cast = true;
                //    shadow2.cast = true;
                //    var material1 = sphere.getComponent(wd.Geometry).material;
                //    var material2 = child.getComponent(wd.Geometry).material;
                //
                //    sandbox.spy(material1, "addShader");
                //    sandbox.spy(material2, "addShader");
                //
                //
                //    director._init();
                //
                //
                //    expect(material1.addShader).toCalledOnce();
                //    expect(material2.addShader).toCalledOnce();
                //});
                it("if receive shadow, only add shadow maps of children once", function () {
                    shadow1.receive = true;
                    shadow2.receive = true;
                    var mapManager1 = sphere.getComponent(wd.Geometry).material.mapManager;
                    var mapManager2 = child.getComponent(wd.Geometry).material.mapManager;

                    sandbox.spy(mapManager1, "addTwoDShadowMap");
                    sandbox.spy(mapManager2, "addTwoDShadowMap");


                    director._init();


                    expect(mapManager1.addTwoDShadowMap).toCalledOnce();
                    expect(mapManager2.addTwoDShadowMap).toCalledOnce();
                });
            });
        });

        describe("fix bug", function(){
            it("if scene.shadowMap.enable === true but no shadow, the object should add NoShadowMapShaderLib", function(){
                director.scene.shadowMap.enable = true;

                sphere.removeComponent(wd.Shadow);

                director._init();

                var shader = sphere.getComponent(wd.Geometry).material.shader;
                expect(shader.hasLib(wd.NoShadowMapShaderLib)).toBeTruthy();
            });
        });
    });
});

