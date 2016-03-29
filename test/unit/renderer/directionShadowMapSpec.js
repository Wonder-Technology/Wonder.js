describe("direction shadow map", function() {
    var sandbox = null;
    var shadow = null;

    var director;
    var sphere;
    var light;

    var renderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        testTool.clearInstance();
        director = wd.Director.getInstance();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("integrate test", function(){
        function createSphere() {
            return shadowTool.createSphere();
        }

        beforeEach(function(){
            sphere = createSphere();
            //light = shadowTool.createDirectionLight([sphere]);
            light = shadowTool.createDirectionLight();

            director.scene.addChild(sphere);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });
        
        it("not allow: the first level object of gameObjectScene not contain shadow component but its children contain", function(){
            testTool.openContractCheck(sandbox);
            sphere.removeComponent(wd.Shadow);

            var child = createSphere();
            child.addComponent(wd.Shadow.create());

            sphere.addChild(child);


            expect(function(){
                director._init();

                director.scene.gameObjectScene.render(renderer);
            }).toThrow();
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
                var useShader = director.scene.useShader;

                sandbox.stub(director.scene, "useShader", function (shaderKey) {
                    useShader.call(director.scene, shaderKey);

                    var material = obj.getComponent(wd.Geometry).material;

                    shader = material.shader;
                    program = shader.program;

                    if (handleProgramFunc) {
                        handleProgramFunc(program);
                    }
                });
            }


            describe("if cast shadow", function(){
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).cast = true;
                });
                
                it("send u_vpMatrixFromLight,u_mMatrix,u_vMatrix,u_pMatrix,a_position", function () {
                    setBuildShadowMapShaderAndProgram(sphere, function (program) {
                        sandbox.stub(program, "sendAttributeData");
                        sandbox.stub(program, "sendUniformData");
                    });


                    director._init();

                    director.scene.gameObjectScene.render(renderer);


                    expect(program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_vpMatrixFromLight").firstCall.args[2]).toEqual(jasmine.any(wd.Matrix4));
                    expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                    expect(program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                    expect(program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                    expect(program.sendAttributeData.withArgs("a_position")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                });
                it("only bind and send shadow map, not bind or send other map", function () {
                    director._init();

                    var material = sphere.getComponent(wd.Geometry).material;
                    var diffuseMap = material.diffuseMap;
                    var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);

                    sandbox.stub(shadowMap, "bindToUnit");
                    sandbox.stub(diffuseMap, "bindToUnit");

                    sandbox.stub(shadowMap, "sendData");
                    sandbox.stub(diffuseMap, "sendData");


                    director.scene.gameObjectScene.render(renderer);


                    expect(shadowMap.bindToUnit).toCalledOnce();
                    expect(diffuseMap.bindToUnit).not.toCalled();
                    expect(shadowMap.sendData).toCalledOnce();
                    expect(diffuseMap.sendData).not.toCalled();
                });

                it("test send shadowMap data", function () {
                    setBuildShadowMapShaderAndProgram(sphere, function (program) {
                        sandbox.stub(program, "sendAttributeData");
                        sandbox.stub(program, "sendUniformData");
                    });


                    director._init();

                    director.scene.gameObjectScene.render(renderer);


                    expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]")).toCalledOnce();
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

        describe("draw based on shadow map", function(){
            var shader, program;

            function setDrawShadowMapShaderAndProgram(){
                var data = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere);

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
                        director._loopBody();

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
                        var data1 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, part1);
                        var data2 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, part2);

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
                            director._loopBody();

                        });

                        it("children should send shadow map data", function () {
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
                            director._loopBody();

                        });

                        it("shouldn't send shadow map data", function () {
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
        });

        it("the binded shadowMap when build shadow map and the binded shadowMap when draw based on shadow map are the same one", function () {
            director._init();

            var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);

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
                expect(shadowTool.getBuildShadowMapMapManager(object).getTwoDShadowMapList().getCount()).toEqual(count);
            }

            beforeEach(function () {
                part1 = prepareTool.createBox();
                part2 = prepareTool.createBox();

                part1.addChild(part2);

                sphere.addChild(part1);
            });

            it("optimize:children should share the build-shadow-map shader of its parent which contain Shadow component", function () {
                director._init();

                var sphereBuildShadowMapShader = sphere.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP);

                expect(part1.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP) === sphereBuildShadowMapShader).toBeTruthy();
                expect(part2.getComponent(wd.Geometry).material.getShader(wd.EShaderMapKey.BUILD_SHADOWMAP) === sphereBuildShadowMapShader).toBeTruthy();
            });

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
                var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);
                sandbox.stub(shadowMap, "bindToUnit");


                director.scene.gameObjectScene.render(renderer);

                expect(shadowMap.bindToUnit.callCount).toEqual(3);


                renderer.render();

                expect(shadowMap.bindToUnit.callCount).toEqual(6);
            });

            it("all objects should be drawed only twice(one for build shadow map, one for draw based on shadow map)", function(){
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
    });
});

