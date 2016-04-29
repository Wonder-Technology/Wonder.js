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


        testTool.clearInstance(sandbox);
        director = wd.Director.getInstance();

        deviceManager = wd.DeviceManager.getInstance();

        sandbox.stub(deviceManager, "gl", testTool.buildFakeGl(sandbox));

        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
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

                        directorTool.updateGameObjectScene();
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

                    var shader1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere).shader;
                    var shader2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, child).shader;

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

        describe("test shadow layer", function(){
            var shadow1,shadow2,shadow3;
            var sphere2,sphere3;
            var layer1,layer2,layer3;

            beforeEach(function(){
                testTool.openContractCheck(sandbox);

                layer1 = "layer1";
                layer2 = "layer2";
                layer3 = layer2;

                shadow1 = sphere.getComponent(wd.Shadow);
                shadow1.layer = layer1;

                sphere2 = shadowTool.createSphere();
                sphere2.name = "sphere2";
                shadow2 = sphere2.getComponent(wd.Shadow);
                shadow2.layer = layer2;

                director.scene.addChild(sphere2);


                sphere3 = shadowTool.createSphere();
                sphere3.name = "sphere3";
                shadow3 = sphere3.getComponent(wd.Shadow);
                shadow3.layer = layer3;


                director.scene.addChild(sphere3);
            });

            describe("test build shadowLayerList", function () {
                it("user can specify shadowLayerList", function () {

                    director.scene.shadowLayerList.removeAllChildren();
                    director.scene.shadowLayerList.addChild("a");


                    director._init();

                    expect(director.scene.shadowLayerList.getChildren()).toEqual(["a"]);
                });

                it("else, auto build it when init", function () {
                    director._init();

                    expect(director.scene.shadowLayerList.getChildren()).toEqual([layer1, layer2]);
                });
            });

            it("if gameObject not cast shadow, its shadow layer not work(shader not contain the shadow map of the layer)", function () {
                shadow1.cast = false;

                director._init();

                var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();
                var twoDShadowMapList2 = shadowTool.getDefaultMapManager(sphere2).getTwoDShadowMapList();
                var twoDShadowMapList3 = shadowTool.getDefaultMapManager(sphere3).getTwoDShadowMapList();

                expect(twoDShadowMapList1.getCount()).toEqual(1);
                expect(twoDShadowMapList2.getCount()).toEqual(1);
                expect(twoDShadowMapList3.getCount()).toEqual(1);
            });

            it("each shadow layer has one shadow map", function () {
                director._init();

                var shadowMap1 = shadowTool.getBuildShadowMap(layer1);
                var shadowMap2 = shadowTool.getBuildShadowMap(layer2);
                var shadowMap3 = shadowTool.getBuildShadowMap(layer3);

                expect(shadowMap1 !== shadowMap2).toBeTruthy();
                expect(shadowMap2 === shadowMap3).toBeTruthy();
            });

            describe("test build shadow map", function(){
                beforeEach(function(){

                });

                it("bind the shadow map of self layer when build shadow map", function () {
                    director._init();

                    var shadowMap1 = shadowTool.getBuildShadowMap(layer1);
                    var shadowMap2 = shadowTool.getBuildShadowMap(layer2);

                    sandbox.stub(shadowMap1, "bindToUnit");
                    sandbox.stub(shadowMap2, "bindToUnit");


                    director.scene.gameObjectScene.render(renderer);


                    expect(shadowMap1.bindToUnit).toCalledOnce();
                    expect(shadowMap2.bindToUnit).toCalledOnce();
                });
            });

            describe("test draw shadow map", function(){
                beforeEach(function(){

                });

                it("bind the shadow maps of all layers when draw shadow map", function () {
                    director._init();

                    var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();
                    var twoDShadowMapList2 = shadowTool.getDefaultMapManager(sphere2).getTwoDShadowMapList();
                    var twoDShadowMapList3 = shadowTool.getDefaultMapManager(sphere3).getTwoDShadowMapList();

                    expect(twoDShadowMapList1.getCount()).toEqual(2);
                    expect(twoDShadowMapList2.getCount()).toEqual(2);
                    expect(twoDShadowMapList3.getCount()).toEqual(2);

                    var shadowMap1 = twoDShadowMapList1.getChild(0);
                    var shadowMap2 = twoDShadowMapList1.getChild(1);
                    sandbox.stub(shadowMap1, "bindToUnit");
                    sandbox.stub(shadowMap2, "bindToUnit");


                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 3);
                    expect(shadowMap2.bindToUnit.callCount).toEqual(1 + 3);
                });
                it("should send shadow map data", function () {
                    director._init();

                    var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                    var program1 = data1.program;

                    var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                    var program2 = data2.program;

                    var data3 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere3);
                    var program3 = data3.program;


                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                    expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                    expect(program1.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledOnce();


                    expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                    expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                    expect(program2.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledOnce();



                    expect(program3.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                    expect(program3.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                    expect(program3.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledOnce();
                });
                it("fs glsl should refresh TWOD_SHADOWMAP_COUNT", function () {
                    director._init();

                    var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                    var shader1 = data1.shader;

                    var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                    var shader2 = data2.shader;

                    var data3 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere3);
                    var shader3 = data3.shader;


                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    expect(glslTool.contain(shader1.fsSource, "TWOD_SHADOWMAP_COUNT 2")).toBeTruthy();
                    expect(glslTool.contain(shader2.fsSource, "TWOD_SHADOWMAP_COUNT 2")).toBeTruthy();
                    expect(glslTool.contain(shader3.fsSource, "TWOD_SHADOWMAP_COUNT 2")).toBeTruthy();
                });
            });

            describe("test multi lights", function(){
                var light2;

                beforeEach(function(){
                    light2 = shadowTool.createDirectionLight();

                    director.scene.addChild(light2);
                });

                it("each light and each shadow layer has one shadow map", function(){
                    director._init();

                    var shadowMap11 = shadowTool.getBuildShadowMap(layer1, light);
                    var shadowMap12 = shadowTool.getBuildShadowMap(layer1,light2);

                    var shadowMap21 = shadowTool.getBuildShadowMap(layer2, light);
                    var shadowMap22 = shadowTool.getBuildShadowMap(layer2, light2);

                    var shadowMap31 = shadowTool.getBuildShadowMap(layer3, light);
                    var shadowMap32 = shadowTool.getBuildShadowMap(layer3, light2);

                    expect(shadowMap11 !== shadowMap21).toBeTruthy();
                    expect(shadowMap12 !== shadowMap22).toBeTruthy();

                    expect(shadowMap21 === shadowMap31).toBeTruthy();
                    expect(shadowMap22 === shadowMap32).toBeTruthy();

                    [shadowMap11, shadowMap12, shadowMap21, shadowMap22].forEach(function(shadowMap){
                        sandbox.stub(shadowMap, "bindToUnit");
                    });


                    director.scene.gameObjectScene.render(renderer);


                    expect(shadowMap11.bindToUnit).toCalledOnce();
                    expect(shadowMap12.bindToUnit).toCalledOnce();

                    expect(shadowMap21.bindToUnit).toCalledOnce();
                    expect(shadowMap22.bindToUnit).toCalledOnce();

                    renderer.render();


                    expect(shadowMap11.bindToUnit.callCount).toEqual(1 + 3);
                    expect(shadowMap12.bindToUnit.callCount).toEqual(1 + 3);

                    expect(shadowMap21.bindToUnit.callCount).toEqual(1 + 3);
                    expect(shadowMap22.bindToUnit.callCount).toEqual(1 + 3);
                });
                it("fs glsl should define TWOD_SHADOWMAP_COUNT", function () {
                    director._init();

                    var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                    var shader1 = data1.shader;

                    var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                    var shader2 = data2.shader;

                    var data3 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere3);
                    var shader3 = data3.shader;


                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    expect(glslTool.contain(shader1.fsSource, "TWOD_SHADOWMAP_COUNT 4")).toBeTruthy();
                    expect(glslTool.contain(shader2.fsSource, "TWOD_SHADOWMAP_COUNT 4")).toBeTruthy();
                    expect(glslTool.contain(shader3.fsSource, "TWOD_SHADOWMAP_COUNT 4")).toBeTruthy();
                });
            });


            describe("test change layer at runtime", function(){
                beforeEach(function(){
                });

                describe("test add layer", function(){
                    var sphere4;
                    var layer4;

                    beforeEach(function(){
                        director._init();

                        director._loopBody(1);

                        director.scene.shadowLayerList.removeChild(layer2);
                        director.scene.removeChild(sphere2);
                        director.scene.removeChild(sphere3);


                        layer4 = "layer4";

                        sphere4 = shadowTool.createSphere();
                        sphere4.name = "sphere4";
                        var shadow4 = sphere4.getComponent(wd.Shadow);
                        shadow4.layer = layer4;

                        director.scene.addChild(sphere4);

                        sphere4.init();


                        director.scene.shadowLayerList.addChild(layer4);
                    });

                    it("add the shadow map of the layer", function () {
                        director._loopBody(2);


                        var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();
                        var twoDShadowMapList4 = shadowTool.getDefaultMapManager(sphere4).getTwoDShadowMapList();

                        expect(twoDShadowMapList1.getCount()).toEqual(2);
                        expect(twoDShadowMapList4.getCount()).toEqual(2);
                    });

                    it("add and init the renderTargetRenderer of the layer", function () {
                        var renderTargetRenderer4 = wd.TwoDShadowMapRenderTargetRenderer.create(wd.TwoDShadowMapTexture.create(), light.getComponent(wd.DirectionLight), layer4);
                        sandbox.spy(renderTargetRenderer4, "init");

                        sandbox.stub(wd.TwoDShadowMapRenderTargetRenderer, "create").returns(renderTargetRenderer4);

                        director._loopBody(2);

                        expect(renderTargetRenderer4.init).toCalledOnce();

                        expect(shadowTool.getBuildShadowMapRenderer(layer4)).toBeExist();
                    });

                    describe("test build shadow map", function(){
                        beforeEach(function(){
                        });

                        it("gameObjects should render to the shadow map of the added layer", function () {
                            sandbox.spy(sphere, "render");
                            sandbox.spy(sphere4, "render");

                            director.scene.gameObjectScene.update(1);

                            director.scene.gameObjectScene.render(renderer);


                            expect(sphere.render).toCalledTwice();
                            expect(sphere4.render).toCalledTwice();
                        });
                        it("bind the added shadow map", function () {
                            director.scene.gameObjectScene.update(1);

                            var shadowMap1 = shadowTool.getBuildShadowMap(layer1);
                            var shadowMap4 = shadowTool.getBuildShadowMap(layer4);

                            sandbox.stub(shadowMap1, "bindToUnit");
                            sandbox.stub(shadowMap4, "bindToUnit");




                            director.scene.gameObjectScene.render(renderer);


                            expect(shadowMap1.bindToUnit).toCalledOnce();
                            expect(shadowMap4.bindToUnit).toCalledOnce();
                        });
                    });

                    describe("test draw shadow map", function(){
                        beforeEach(function(){
                        });

                        it("bind the added shadow maps", function () {
                            director.scene.gameObjectScene.update(1);


                            var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                            var shadowMap1 = twoDShadowMapList1.getChild(0);
                            var shadowMap2 = twoDShadowMapList1.getChild(1);
                            sandbox.stub(shadowMap1, "bindToUnit");
                            sandbox.stub(shadowMap2, "bindToUnit");


                            director.scene.gameObjectScene.render(renderer);
                            renderer.render();

                            expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 2);
                            expect(shadowMap2.bindToUnit.callCount).toEqual(1 + 2);
                        });
                        it("should send the added shadow map data", function () {
                            director.scene.gameObjectScene.update(1);

                            var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                            var program1 = data1.program;


                            var data4 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere4);
                            var program4 = data4.program;


                            director.scene.gameObjectScene.render(renderer);
                            renderer.render();

                            expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                            expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();


                            expect(program4.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                            expect(program4.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                        });
                        it("fs glsl->TWOD_SHADOWMAP_COUNT should be refreshed", function () {

                            director.scene.addChild(sphere2);

                            //sphere4.init();


                            director.scene.shadowLayerList.addChild(layer2);




                            director.scene.gameObjectScene.update(1);




                            var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                            var shader1 = data1.shader;

                            var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                            var shader2 = data2.shader;

                            var data4 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere4);
                            var shader4 = data4.shader;


                            director.scene.gameObjectScene.render(renderer);
                            renderer.render();

                            expect(glslTool.contain(shader1.fsSource, "TWOD_SHADOWMAP_COUNT 3")).toBeTruthy();
                            expect(glslTool.contain(shader2.fsSource, "TWOD_SHADOWMAP_COUNT 3")).toBeTruthy();
                            expect(glslTool.contain(shader4.fsSource, "TWOD_SHADOWMAP_COUNT 3")).toBeTruthy();
                        });
                    });
                });

                describe("test remove layer", function(){
                    var oldGLProgram;

                    beforeEach(function(){
                        director._init();

                        director._loopBody(1);


                        oldGLProgram = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere, true).program._program;

                        director.scene.shadowLayerList.removeChild(layer2);
                    });

                    it("if scene has the shadow objects with the layer, contract error", function(){
                        testTool.openContractCheck(sandbox);

                        expect(function(){
                            director._loopBody(2);
                        }).toThrow();
                    });

                    describe("else", function(){
                        beforeEach(function(){
                            director.scene.removeChild(sphere2);
                            director.scene.removeChild(sphere3);
                        });

                        it("remove the shadow map of the layer", function () {
                            director._loopBody(2);


                            var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                            expect(twoDShadowMapList1.getCount()).toEqual(1);
                        });
                        it("remove and dispose the renderTargetRenderer of the layer", function () {
                            var renderTargetRenderer2 = shadowTool.getBuildShadowMapRenderer(layer2);
                            sandbox.stub(renderTargetRenderer2, "dispose");

                            director._loopBody(2);

                            expect(renderTargetRenderer2.dispose).toCalledOnce();

                            expect(shadowTool.getBuildShadowMapRenderer(layer2)).not.toBeExist();
                        });

                        describe("test build shadow map", function(){
                            beforeEach(function(){
                            });

                            it("gameObjects should not render to the shadow map of the removed layer", function () {
                                sandbox.spy(sphere, "render");
                                sandbox.spy(sphere2, "render");
                                sandbox.spy(sphere3, "render");

                                director.scene.gameObjectScene.update(1);

                                director.scene.gameObjectScene.render(renderer);


                                expect(sphere.render).toCalledTwice();
                                expect(sphere2.render).not.toCalled();
                                expect(sphere3.render).not.toCalled();
                            });
                            it("not bind the removed shadow map", function () {
                                var shadowMap1 = shadowTool.getBuildShadowMap(layer1);
                                var shadowMap2 = shadowTool.getBuildShadowMap(layer2);

                                sandbox.stub(shadowMap1, "bindToUnit");
                                sandbox.stub(shadowMap2, "bindToUnit");


                                director.scene.gameObjectScene.update(1);

                                director.scene.gameObjectScene.render(renderer);


                                expect(shadowMap1.bindToUnit).toCalledOnce();
                                expect(shadowMap2.bindToUnit).not.toCalled();
                            });
                        });

                        describe("test draw shadow map", function(){
                            beforeEach(function(){
                            });

                            it("not bind the removed shadow maps", function () {
                                var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                                var shadowMap1 = twoDShadowMapList1.getChild(0);
                                shadowMap1.name = "shadowMap1";
                                var shadowMap2 = twoDShadowMapList1.getChild(1);
                                sandbox.stub(shadowMap1, "bindToUnit");
                                sandbox.stub(shadowMap2, "bindToUnit");


                                director.scene.gameObjectScene.update(1);

                                director.scene.gameObjectScene.render(renderer);
                                renderer.render();

                                expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 1);
                                expect(shadowMap2.bindToUnit.callCount).toEqual(0);
                            });
                            it("should not send the removed shadow map data", function () {
                                var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                                var program1 = data1.program;

                                var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                                var program2 = data2.program;

                                var data3 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere3);
                                var program3 = data3.program;


                                director.scene.gameObjectScene.update(1);

                                director.scene.gameObjectScene.render(renderer);
                                renderer.render();

                                expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                                expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).not.toCalled();


                                expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).not.toCalled();


                                expect(program3.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).not.toCalled();
                            });
                            //it("fs glsl->TWOD_SHADOWMAP_COUNT should be refreshed", function () {
                            describe("shader should be refreshed", function () {
                                it("should create new gl program and use it", function () {
                                    director.scene.gameObjectScene.update(1);


                                    var newGLProgram = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere, true).program._program;




                                    director.scene.gameObjectScene.render(renderer);
                                    renderer.render();

                                    var gl = deviceManager.gl;

                                    expect(gl.useProgram.withArgs(oldGLProgram)).toCalled();


                                    expect(gl.useProgram.withArgs(newGLProgram)).toCalled();

                                    expect(gl.getUniformLocation.withArgs(newGLProgram)).toCalled();

                                });
                                it("should dispose old gl program", function () {
                                    director.scene.gameObjectScene.update(1);


                                    var newGLProgram = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere, true).program._program;




                                    director.scene.gameObjectScene.render(renderer);
                                    renderer.render();

                                    var gl = deviceManager.gl;

                                    expect(gl.deleteProgram.withArgs(oldGLProgram)).toCalledOnce();
                                });
                                it("fs glsl->TWOD_SHADOWMAP_COUNT should be refreshed", function () {
                                    director.scene.gameObjectScene.update(1);

                                    var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                                    var shader1 = data1.shader;



                                    director.scene.gameObjectScene.render(renderer);
                                    renderer.render();

                                    expect(glslTool.contain(shader1.fsSource, "TWOD_SHADOWMAP_COUNT 1")).toBeTruthy();
                                });
                            });
                        });
                    });
                });
            });
        });

        describe("test change shadow->cast at runtime", function(){
            //todo test
        });

        describe("test change shadow->receive at runtime", function(){
            describe("test change not receive to receive", function () {
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).receive = false;

                    director._init();

                    director._loopBody(1);
                });

                describe("test draw shadow map", function(){
                    beforeEach(function(){
                        sphere.getComponent(wd.Shadow).receive = true;
                    });

                    it("draw the shadow map", function () {
                        var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                        var shadowMap1 = twoDShadowMapList1.getChild(0);

                        sandbox.stub(shadowMap1, "bindToUnit");


                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();

                        expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 1);
                    });
                    it("should send glsl data", function () {
                        var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                        var program1 = data1.program;


                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();

                        expect(program1.sendUniformData.withArgs("u_twoDShadowSize[0]")).toCalledOnce();
                    });
                });
            });

            describe("test change receive to not receive", function () {
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).receive = true;

                    director._init();

                    director._loopBody(1);
                });

                describe("test draw shadow map", function(){
                    it("not draw the shadow map", function () {
                        var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                        var shadowMap1 = twoDShadowMapList1.getChild(0);

                        sandbox.stub(shadowMap1, "bindToUnit");


                        sphere.getComponent(wd.Shadow).receive = false;




                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();

                        expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 0);
                    });
                    it("should not send glsl data", function () {
                        sphere.getComponent(wd.Shadow).receive = false;

                        var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                        var program1 = data1.program;



                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();


                        expect(program1.sendUniformData.withArgs("u_twoDShadowSize[0]")).not.toCalled();
                    });
                });
            });

            describe("test direction light + point light", function(){
                var light2;

                beforeEach(function(){
                    light2 = shadowTool.createPointLight();

                    director.scene.addChild(light2);
                });

                describe("test change not receive to receive", function () {
                    function judgeGLSLContainShadowMap(shader){
                        expect(shader.hasLib(wd.NoShadowMapShaderLib)).toBeFalsy();

                        expect(shader.hasLib(wd.TotalShadowMapShaderLib)).toBeTruthy();
                        expect(shader.hasLib(wd.TwoDShadowMapShaderLib)).toBeTruthy();
                        expect(shader.hasLib(wd.CubemapShadowMapShaderLib)).toBeTruthy();
                    }

                    beforeEach(function () {
                        sphere.getComponent(wd.Shadow).receive = false;

                        director._init();

                        director._loopBody(1);
                    });

                    describe("test draw shadow map", function () {
                        it("fs glsl should refresh and contain shadow map glsl", function () {
                            sphere.getComponent(wd.Shadow).receive = true;

                            var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                            var shader1 = data1.shader;
                            var program1 = data1.program;
                            sandbox.stub(program1, "initWithShader");


                            director.scene.gameObjectScene.render(renderer);
                            renderer.render();


                            judgeGLSLContainShadowMap(shader1);

                            expect(program1.initWithShader).toCalledOnce();
                        });
                    });
                });

                describe("test change receive to not receive", function () {
                    function judgeGLSLNotContainShadowMap(shader){
                                                expect(shader.hasLib(wd.NoShadowMapShaderLib)).toBeTruthy();

                        expect(shader.hasLib(wd.TotalShadowMapShaderLib)).toBeFalsy();
                        expect(shader.hasLib(wd.TwoDShadowMapShaderLib)).toBeFalsy();
                        expect(shader.hasLib(wd.CubemapShadowMapShaderLib)).toBeFalsy();
                    }

                    beforeEach(function () {
                        sphere.getComponent(wd.Shadow).receive = true;

                        director._init();

                        director._loopBody(1);
                    });

                    describe("test draw shadow map", function () {
                        it("fs glsl should refresh and not contain shadow map glsl", function () {
                            sphere.getComponent(wd.Shadow).receive = false;

                            var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                            var shader1 = data1.shader;
                            var program1 = data1.program;
                            sandbox.stub(program1, "initWithShader");


                            director.scene.gameObjectScene.render(renderer);
                            renderer.render();


                            judgeGLSLNotContainShadowMap(shader1);

                            expect(program1.initWithShader).toCalledOnce();
                        });
                    });
                });
            });
        });

        describe("test enable/disable shadow globally before init", function(){
            beforeEach(function(){

            });

            it("test enable shadow globally before init", function(){
                beforeEach(function(){
                    director.scene.shadowMap.enable = true;
                });

                it("shader should only has NoShadowMapShaderLib", function(){
                    director._init();

                    expect(sphere.getComponent(wd.Geometry).material.shader.hasLib(wd.NoShadowMapShaderLib)).toBeTruthy();

                    expect(sphere.getComponent(wd.Geometry).material.shader.hasLib(wd.TotalShadowMapShaderLib)).toBeFalsy();
                });

                describe("has no shadow map", function(){
                    beforeEach(function(){

                    });

                    it("not exist build shadow map renderTargetRenderer", function () {
                        director._init();

                        expect(shadowTool.getBuildShadowMapRenderer()).not.toBeExist();
                    });
                    it("not draw shadow map", function () {
                        director.scene.gameObjectScene.update(1);


                        var twoDShadowMapList = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                        expect(twoDShadowMapList.getCount()).toEqual(0);
//
//                        var shadowMap1 = twoDShadowMapList1.getChild(0);
//                        var shadowMap2 = twoDShadowMapList1.getChild(1);
//                        sandbox.stub(shadowMap1, "bindToUnit");
//                        sandbox.stub(shadowMap2, "bindToUnit");
//
//
//                        director.scene.gameObjectScene.render(renderer);
//                        renderer.render();
//
//                        expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 2);
//                        expect(shadowMap2.bindToUnit.callCount).toEqual(1 + 2);
//});
                    });
                });
            });

            //describe("test disable shadow globally", function(){
            //    beforeEach(function(){
            //
            //    });
            //
            //    it("", function(){
            //
            //    });
            //});
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

