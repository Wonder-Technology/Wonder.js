describe("direction shadow map", function() {
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

    describe("integrate test", function(){
        function createSphere() {
            return shadowTool.createSphere();
        }

        beforeEach(function(){
            sphere = createSphere();
            sphere.name = "sphere";
            light = shadowTool.createDirectionLight();

            director.scene.addChild(sphere);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("set shadow map->texParameteri", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MAG_FILTER, gl.LINEAR)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MIN_FILTER, gl.LINEAR)).toCalledOnce();
        });

        describe("build shadow map", function() {
            var shader, program;

            function setBuildShadowMapShaderAndProgram(obj, handleProgramFunc) {
                shadowTool.setTwoDBuildShadowMapShaderAndProgramHelper(sandbox, obj, handleProgramFunc, function(s, p){
                    shader = s;
                    program = p;
                })
            }


            describe("if cast shadow", function(){
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).cast = true;
                });

                describe("test send data", function(){
                    beforeEach(function(){
                        setBuildShadowMapShaderAndProgram(sphere, function (program) {
                            sandbox.stub(program, "sendAttributeData");
                            sandbox.stub(program, "sendUniformData");
                        });


                        director._init();

                        director.scene.gameObjectScene.render(renderer);
                    });

                    it("send u_vpMatrixFromLight,u_mMatrix,u_vMatrix,u_pMatrix,a_position", function () {
                        expect(program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledOnce();
                        expect(program.sendUniformData.withArgs("u_vpMatrixFromLight").firstCall.args[2]).toEqual(jasmine.any(wd.Matrix4));
                        expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        expect(program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        expect(program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        expect(program.sendAttributeData.withArgs("a_position")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                    });
                    it("not send other data which should be send when draw shadow map", function () {
                        expect(program.sendAttributeData.withArgs("a_normal")).not.toCalled();
                    });
                });

                it("only bind shadow map, not send shadow map unit(because glsl only bind one texture, and its unit is 0 defaultly)", function () {
                    director._init();

                    var shadowMap = shadowTool.getBuildShadowMap();

                    sandbox.stub(shadowMap, "bindToUnit");

                    sandbox.stub(shadowMap, "sendData");


                    director.scene.gameObjectScene.render(renderer);


                    expect(shadowMap.bindToUnit).toCalledOnce();
                    expect(shadowMap.sendData).not.toCalled();
                });

                it("not bind or send other map", function () {
                    director._init();

                    var material = sphere.getComponent(wd.Geometry).material;
                    var diffuseMap = material.diffuseMap;

                    sandbox.stub(diffuseMap, "bindToUnit");

                    sandbox.stub(diffuseMap, "sendData");


                    director.scene.gameObjectScene.render(renderer);


                    expect(diffuseMap.bindToUnit).not.toCalled();
                    expect(diffuseMap.sendData).not.toCalled();
                });
                //
                //
                //it("test send shadowMap data", function () {
                //    setBuildShadowMapShaderAndProgram(sphere, function (program) {
                //        sandbox.stub(program, "sendAttributeData");
                //        sandbox.stub(program, "sendUniformData");
                //    });
                //
                //
                //    director._init();
                //
                //    director.scene.gameObjectScene.render(renderer);
                //
                //
                //    expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]")).toCalledOnce();
                //});



                describe("set webgl state", function(){
                    var gl;

                    beforeEach(function(){
                        gl = deviceManager.gl;
                    });

                    it("set side by each object's material", function () {
                        gl.CULL_FACE = "CULL_FACE";
                        gl.FRONT_AND_BACK = "FRONT_AND_BACK";

                        director._init();

                        var material = sphere.getComponent(wd.Geometry).material;
                        material.side = wd.ESide.NONE;



                        director.scene.gameObjectScene.render(renderer);


                        expect(gl.enable).toCalledWith("CULL_FACE");
                        expect(gl.cullFace).toCalledWith("FRONT_AND_BACK");
                    });
                    it("set blend to be false", function () {
                        gl.BLEND = "BLEND";

                        director._init();

                        var material = sphere.getComponent(wd.Geometry).material;

                        material.blend = true;

                        deviceManager.blend = true;


                        director.scene.gameObjectScene.render(renderer);


                        expect(gl.disable.withArgs("BLEND")).toCalledTwice();
                        expect(gl.enable.withArgs("BLEND")).not.toCalledTwice();
                    });
                    it("not set other webgl effect", function () {
                        director._init();

                        var material = sphere.getComponent(wd.Geometry).material;

                        material.redWrite = false;


                        director.scene.gameObjectScene.render(renderer);

                        expect(gl.colorMask.withArgs(false, true, true, true)).not.toCalled();
                    });
                });
            });

            it("if not cast shadow, not render to build shadow map", function () {
                sphere.getComponent(wd.Shadow).cast = false;
                sandbox.spy(sphere, "render");


                director._init();

                director.scene.gameObjectScene.render(renderer);


                expect(sphere.render).not.toCalledTwice();
            });
        });

        describe("draw shadow map", function(){
            var shader, program;

            function setDrawShadowMapShaderAndProgram(){
                var data = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);

                shader = data.shader;
                program = data.program;
            }

            describe("test shadow map", function(){
                beforeEach(function(){
                });

                describe("if receive shadow", function() {
                    beforeEach(function () {
                        sphere.getComponent(wd.Shadow).receive = true;
                    });

                    it("should send shadow map data", function () {
                        director._init();

                        setDrawShadowMapShaderAndProgram();
                        director._loopBody();

                        expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                        expect(program.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 1)).toCalledOnce();
                    });

                    it("fs glsl should contain shadow map glsl", function () {
                        director._init();

                        setDrawShadowMapShaderAndProgram();

                        expect(glslTool.contain(shader.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                    });
                });

                describe("if not receive shadow", function () {
                    beforeEach(function () {
                        sphere.getComponent(wd.Shadow).receive = false;
                        director._init();

                        setDrawShadowMapShaderAndProgram();
                        director._loopBody();
                    });

                    it("shouldn't send shadow map data", function () {
                        expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).not.toCalled();

                        expect(program.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 0)).toCalledOnce();
                    });

                    it("fs glsl shouldn't contain shadow map glsl", function () {
                        expect(glslTool.contain(shader.fsSource, "u_twoDShadowMapSampler")).toBeFalsy();
                    });
                });


                describe("test object with children", function() {
                    var part1, part2;
                    var program1,program2;
                    var shader1, shader2;

                    function setChildrenDrawShadowMapShaderAndProgram(){
                        var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, part1);
                        var data2 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, part2);

                        shader1 = data1.shader;
                        shader2 = data2.shader;

                        program1 = data1.program;
                        program2 = data2.program;
                    }

                    beforeEach(function () {
                        part1 = createSphere();
                        part1.removeComponent(wd.Shadow);

                        part2 = createSphere();
                        part2.removeComponent(wd.Shadow);

                        part1.addChild(part2);

                        sphere.addChild(part1);
                    });

                    describe("if receive shadow", function() {
                        beforeEach(function () {
                            sphere.getComponent(wd.Shadow).receive = true;

                            director._init();

                            setChildrenDrawShadowMapShaderAndProgram();

                        });

                        it("children should send shadow map data", function () {
                            director._loopBody();

                            expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                            expect(program1.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 1)).toCalledOnce();

                            expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                            expect(program2.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 1)).toCalledOnce();
                        });

                        it("children fs glsl should contain shadow map glsl", function () {
                            expect(glslTool.contain(shader1.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                            expect(glslTool.contain(shader2.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
                        });
                    });

                    describe("if not receive shadow", function () {
                        beforeEach(function () {
                            sphere.getComponent(wd.Shadow).receive = false;

                            director._init();

                            setChildrenDrawShadowMapShaderAndProgram();
                        });

                        it("shouldn't send shadow map data", function () {
                            director._loopBody();

                            expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).not.toCalled();

                            expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).not.toCalled();
                        });

                        it("fs glsl shouldn't contain shadow map glsl", function () {
                            expect(glslTool.contain(shader1.fsSource, "u_twoDShadowMapSampler")).toBeFalsy();

                            expect(glslTool.contain(shader2.fsSource, "u_twoDShadowMapSampler")).toBeFalsy();
                        });
                    });
                });
            });

            describe("test multi direction lights", function(){
                var light2;

                beforeEach(function(){
                    light2 = shadowTool.createDirectionLight();

                    director.scene.addChild(light2);
                });

                it("send shadow map data", function () {
                    director._init();

                    setDrawShadowMapShaderAndProgram();
                    director._loopBody();

                    expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledOnce();
                });

                it("send u_vpMatrixFromLight,u_twoDShadowSize,u_twoDShadowBias,u_twoDShadowDarkness,u_twoDLightPos", function () {
                    var direLight1 = light.getComponent(wd.DirectionLight);
                    var direLight2 = light2.getComponent(wd.DirectionLight);

                    testTool.stubGetter(sinon, direLight1, "shadowMapWidth", function () {
                        return 100;
                    })
                    testTool.stubGetter(sinon, direLight1, "shadowMapHeight", function () {
                        return 200;
                    })
                    direLight1.shadowBias = 0.1;
                    direLight1.shadowDarkness = 0.5;

                    var position1 = wd.Vector3.create(1, 1, 1);
                    light.transform.position = position1;


                    testTool.stubGetter(sinon, direLight2, "shadowMapWidth", function () {
                        return 101;
                    })
                    testTool.stubGetter(sinon, direLight2, "shadowMapHeight", function () {
                        return 201;
                    })
                    direLight2.shadowBias = 0.2;
                    direLight2.shadowDarkness = 0.6;

                    var position2 = wd.Vector3.create(1, 2, 1);
                    light2.transform.position = position2;


                    director._init();

                    setDrawShadowMapShaderAndProgram();
                    director._loopBody();


                    expect(program.sendUniformData.withArgs("u_vpMatrixFromLight[0]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_vpMatrixFromLight[1]")).toCalledOnce();

                    expect(program.sendUniformData.withArgs("u_twoDShadowSize[0]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowSize[0]").firstCall.args[2]).toEqual([100, 200]);
                    expect(program.sendUniformData.withArgs("u_twoDShadowSize[1]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowSize[1]").firstCall.args[2]).toEqual([101, 201]);

                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[0]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[0]").firstCall.args[2]).toEqual(0.1);
                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[1]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[1]").firstCall.args[2]).toEqual(0.2);

                    expect(program.sendUniformData.withArgs("u_twoDShadowDarkness[0]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowDarkness[0]").firstCall.args[2]).toEqual(0.5);
                    expect(program.sendUniformData.withArgs("u_twoDShadowDarkness[1]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDShadowDarkness[1]").firstCall.args[2]).toEqual(0.6);

                    expect(program.sendUniformData.withArgs("u_twoDLightPos[0]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDLightPos[0]").firstCall.args[2]).toEqual(position1);
                    expect(program.sendUniformData.withArgs("u_twoDLightPos[1]")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_twoDLightPos[1]").firstCall.args[2]).toEqual(position2);
                });

                it("test change glsl data", function () {
                    var direLight1 = light.getComponent(wd.DirectionLight);
                    var direLight2 = light2.getComponent(wd.DirectionLight);

                    direLight1.shadowBias = 0.1;

                    direLight2.shadowBias = 0.2;


                    director._init();

                    setDrawShadowMapShaderAndProgram();
                    director._loopBody();


                    direLight1.shadowBias = 1.1;

                    direLight2.shadowBias = 1.2;

                    director._loopBody();


                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[0]").secondCall.args[2]).toEqual(1.1);
                    expect(program.sendUniformData.withArgs("u_twoDShadowBias[1]").secondCall.args[2]).toEqual(1.2);
                });
            });

            describe("if renderList is empty, not draw shadow map", function(){
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).cast = true;

                    director._init();
                });

                it("if renderList is empty, send u_isTwoDRenderListEmpty:1", function(){
                    sphere.getComponent(wd.Shadow).cast = false;

                    setDrawShadowMapShaderAndProgram();

                    director._loopBody();


                    expect(program.sendUniformData.withArgs("u_isTwoDRenderListEmpty[0]", sinon.match.any, 1)).toCalledOnce();
                });
                it("else, not send", function(){
                    setDrawShadowMapShaderAndProgram();

                    director._loopBody();


                    expect(program.sendUniformData.withArgs("u_isTwoDRenderListEmpty[0]")).not.toCalled();
                });
            });
        });

        it("the binded shadowMap when build shadow map and the binded shadowMap when draw shadow map are the same one", function () {
            director._init();

            var shadowMap = shadowTool.getBuildShadowMap();

            sandbox.stub(shadowMap, "bindToUnit");


            director.scene.gameObjectScene.render(renderer);


            expect(shadowMap.bindToUnit).toCalledOnce();

            renderer.render();

            expect(shadowMap.bindToUnit).toCalledTwice();
        });

        describe("test object with children", function() {
            var part1, part2;

            function judgeShadowMapCount(object, count){
                expect(shadowTool.getDefaultMapManager(object).getTwoDShadowMapList().getCount()).toEqual(count);
                //expect(shadowTool.getBuildShadowMapMapManager(wd.EShadowLayer.DEFAULT).getTwoDShadowMapList().getCount()).toEqual(count);
            }

            beforeEach(function () {
                part1 = prepareTool.createBox();
                part2 = prepareTool.createBox();

                part1.addChild(part2);

                sphere.addChild(part1);
            });

            //it("optimize:children should share the build-shadow-map shader of its parent which contain Shadow component", function () {
            //    director._init();
            //
            //    var sphereBuildShadowMapShader = sphere.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP);
            //
            //    expect(part1.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP) === sphereBuildShadowMapShader).toBeTruthy();
            //    expect(part2.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP) === sphereBuildShadowMapShader).toBeTruthy();
            //});

            it("all objects should contain only one twoD shadow map", function () {
                director._init();

                judgeShadowMapCount(sphere, 1);
                judgeShadowMapCount(part1, 1);
                judgeShadowMapCount(part2, 1);
            });

            describe("container object(which has no geometry) shouldn't be involved in any thing about shadow so that it should not cause error", function(){
                it("test first level object has no geometry", function () {
                    sphere.removeComponent(wd.Geometry);

                    expect(function(){
                        director._init();
                    }).not.toThrow();
                });
                it("test children has no geometry", function () {
                    part1.removeComponent(wd.Geometry);

                    expect(function(){
                        director._init();
                    }).not.toThrow();
                });
                it("test first level object has no geometry but its children has geometry, its children should be involved in shadow", function () {
                    sphere.removeComponent(wd.Geometry);

                    director._init();

                    judgeShadowMapCount(part1, 1);
                    judgeShadowMapCount(part2, 1);
                });
            });

            it("all objects should share the one shadowMap", function () {
                director._init();
                var shadowMap = shadowTool.getBuildShadowMap();
                sandbox.stub(shadowMap, "bindToUnit");


                director.scene.gameObjectScene.render(renderer);

                expect(shadowMap.bindToUnit.callCount).toEqual(1);


                renderer.render();

                expect(shadowMap.bindToUnit.callCount).toEqual(1 + 3);
            });

            it("all objects should be drawed only twice(one for build shadow map, one for draw shadow map)", function(){
                sandbox.spy(sphere, "render");
                sandbox.spy(part1, "render");
                sandbox.spy(part2, "render");

                director._init();


                director.scene.gameObjectScene.render(renderer);

                expect(sphere.render).toCalledTwice();
                expect(part1.render).toCalledTwice();
                expect(part2.render).toCalledTwice();
            });
        });



        describe("add/remove shadow gameObject at runtime", function(){
            var shader, program;

            function setBuildShadowMapShaderAndProgram(obj, handleProgramFunc) {
                shadowTool.setTwoDBuildShadowMapShaderAndProgramHelper(sandbox, obj, handleProgramFunc, function(s, p){
                    shader = s;
                    program = p;
                })
            }

            beforeEach(function(){
                director._init();


                director.scene.gameObjectScene.render(renderer);
                renderer.render();
            });

            describe("add shadow gameObject at runtime", function () {
                var sphere2;

                beforeEach(function(){
                    sphere2 = createSphere();
                    sphere2.name = "sphere22";

                    director.scene.addChild(sphere2);
                    sphere2.init();
                });

                describe("test build shadow map", function () {
                    it("send u_vpMatrixFromLight,u_mMatrix,u_vMatrix,u_pMatrix,a_position", function () {

                        setBuildShadowMapShaderAndProgram(sphere2, function (program) {
                            sandbox.stub(program, "sendAttributeData");
                            sandbox.stub(program, "sendUniformData");
                        });





                        director.scene.gameObjectScene.render(renderer);



                        expect(program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledTwice();
                        //expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        //expect(program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        //expect(program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                        //expect(program.sendAttributeData.withArgs("a_position")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                    });
                    it("bind shadow map", function () {
                        var shadowMap = shadowTool.getBuildShadowMap(0);

                        sandbox.stub(shadowMap, "bindToUnit");

                        sandbox.stub(shadowMap, "sendData");


                        director.scene.gameObjectScene.render(renderer);


                        expect(shadowMap.bindToUnit).toCalledOnce();
                        expect(shadowMap.sendData).not.toCalled();
                    });
                });

                describe("test draw shadow map", function(){
                    beforeEach(function(){
                    });

                    it("bind the shadow maps", function () {
                        var twoDShadowMapList = shadowTool.getDefaultMapManager(sphere2).getTwoDShadowMapList();

                        expect(twoDShadowMapList.getCount()).toEqual(1);

                        var shadowMap1 = twoDShadowMapList.getChild(0);
                        sandbox.stub(shadowMap1, "bindToUnit");


                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();

                        expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 2);
                    });
                });
            });

            describe("remove shadow gameObject at runtime", function () {
                describe("test build shadow map", function () {
                    //it("not send u_vpMatrixFromLight,u_mMatrix,u_vMatrix,u_pMatrix,a_position", function () {
                    //
                    //    setBuildShadowMapShaderAndProgram(sphere, function (program) {
                    //        sandbox.stub(program, "sendAttributeData");
                    //        sandbox.stub(program, "sendUniformData");
                    //    });
                    //
                    //    director.scene.removeChild(sphere);
                    //
                    //
                    //
                    //
                    //    director.scene.gameObjectScene.render(renderer);
                    //
                    //
                    //
                    //    expect(program.sendUniformData.withArgs("u_vpMatrixFromLight")).not.toCalled();
                    //});
                    it("not bind shadow map", function () {
                        var shadowMap = shadowTool.getBuildShadowMap(0);

                        sandbox.stub(shadowMap, "bindToUnit");

                        sandbox.stub(shadowMap, "sendData");

                        director.scene.removeChild(sphere);


                        director.scene.gameObjectScene.render(renderer);


                        expect(shadowMap.bindToUnit).not.toCalled();
                    });
                });

                describe("test draw shadow map", function(){
                    beforeEach(function(){
                    });

                    it("if scene has no objects with the same layer, not bind and send shadow map", function () {
                        var twoDShadowMapList = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                        var shadowMap1 = twoDShadowMapList.getChild(0);
                        sandbox.stub(shadowMap1, "bindToUnit");

                        var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere);
                        var program1 = data1.program;


                        director.scene.removeChild(sphere);


                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();

                        expect(shadowMap1.bindToUnit.callCount).toEqual(0);
                        //expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                        expect(program1.sendUniformData).not.toCalled();
                    });

                    it("if scene only has one object with the same layer which receive shadow, still bind and send shadow map" +
                        "(otherwise it will cause the 'instance_octree_shadow_layer sample->if not show sphere2(whose shadow layer is diferent from the instance), it's dark' bug)", function () {
                        var sphere2;
                        var shadowMap1;
                        var program1;

                        sphere2 = createSphere();
                        var shadow2 = sphere2.getComponent(wd.Shadow);
                        shadow2.cast = false;
                        shadow2.receive = true;

                        director.scene.addChild(sphere2);
                        sphere2.init();



                        director.scene.removeChild(sphere);


                        var twoDShadowMapList = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();

                        shadowMap1 = twoDShadowMapList.getChild(0);
                        sandbox.stub(shadowMap1, "bindToUnit");

                        var data1 = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                        program1 = data1.program;




                        director.scene.gameObjectScene.render(renderer);
                        renderer.render();




                        expect(shadowMap1.bindToUnit.callCount).toEqual(1);
                        expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                    });
                    //it("if scene has other objects with the same layer which cast shadow, bind and send shadow map", function () {
                    //
                    //});
                });
            });

            describe("remove and add shadow gameObject", function(){
                beforeEach(function(){

                });

                it("", function(){

                });
            });
        });



        describe("fix bug", function(){
            var shader;
            var program;

            function setDrawShadowMapShaderAndProgram(obj){
                var data = shadowTool.getDrawShadowMapShaderAndProgramHelper(sandbox, obj);

                shader = data.shader;
                program = data.program;

                sandbox.stub(program, "sendStructureData");
            }

            beforeEach(function(){

            });

            it("test if the renderList is empty, then in the next loop it is not empty", function(){
                sandbox.spy(sphere, "render");

                director._init();

                director.scene.removeChild(sphere);


                director.scene.gameObjectScene.render(renderer);
                expect(sphere.render.callCount).toEqual(0);

                director.scene.addChild(sphere);

                director.scene.gameObjectScene.render(renderer);

                expect(sphere.render.callCount).toEqual(2);
            });

            describe("fix 'instance_octree_shadow_layer sample->if not show sphere2(whose shadow layer is diferent from the instance), it's dark' bug", function(){
                /*!
                 reason:
                 if no objects render in one shadow map(not build shadow map), the shadow map will still be drawed and the visibility from the shadow map is all 0.0.
                 */

                beforeEach(function(){
                    director._init();
                    sandbox.stub(director.scene.gameObjectScene.getComponent(wd.ShadowManager), "getShadowRenderListByLayer").returns(wdCb.Collection.create());


                    setDrawShadowMapShaderAndProgram(sphere);

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();
                });

                describe("still draw the shadow map(because of the glsl limit(can't change the shadow map count in 'for'))", function(){
                    beforeEach(function(){
                    });

                    it("not send glsl data", function(){
                        expect(program.sendStructureData.withArgs("u_vpMatrixFromLight[0]")).not.toCalled();
                    });
                    it("send shadow map data", function () {
                        expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, sinon.match.number)).toCalledOnce();
                    });

                });

                it("modify fs glsl->unpackDepth function", function () {
                    expect(glslTool.contain(shader.fsSource, "if(rgbaDepth == vec4(0.0)){")).toBeTruthy();
                });
            });

            it("if only has the object which receive shadow, it shouldn't send glsl data when draw shadow map", function () {
                director.scene.removeChild(sphere);

                var sphereOnlyReceive = shadowTool.createSphere();
                sphereOnlyReceive.name = "sphereOnlyReceive";
                var shadow = sphereOnlyReceive.getComponent(wd.Shadow);
                shadow.cast = false;
                shadow.receive = true;


                director.scene.addChild(sphereOnlyReceive);

                director._init();
                setDrawShadowMapShaderAndProgram(sphereOnlyReceive);




                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(program.sendStructureData.withArgs("u_vpMatrixFromLight[0]")).not.toCalled();
            });
        });


        describe("optimize", function(){
            beforeEach(function(){
            });

            it("if renderList is empty, not bind texture and not bind/unbind frameBuffer", function(){
                director._init();

                var bindCountWhenInit = deviceManager.gl.bindFramebuffer.callCount;

                var shadowMap = shadowTool.getBuildShadowMap();

                sandbox.stub(shadowMap, "bindToUnit");


                director.scene.removeChild(sphere);

                director.scene.gameObjectScene.render(renderer);

                expect(shadowMap.bindToUnit).not.toCalled();
                expect(deviceManager.gl.bindFramebuffer.callCount).toEqual(bindCountWhenInit);
            });
        });
    });
});

