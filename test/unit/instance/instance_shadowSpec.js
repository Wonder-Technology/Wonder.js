describe("instance with shadow", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var sphere1, sphere1Instance1;
    var instanceArr;
    var sphere2;

    var renderer;
    var camera;

    var light;

    function createSphere() {
        return shadowTool.createSphere();
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

        testTool.clearInstance();
    });


    describe("test direction light", function () {
        var shader;
        var program;

        beforeEach(function () {
            prepareWithoutChild();
            prepareTool.prepareForMap(sandbox);


            sphere2 = createSphere();
            sphere2.name = "sphere2";

            director.scene.addChild(sphere2);

            light = shadowTool.createDirectionLight();

            director.scene.addChild(light);
        });

        describe("test build shadow map", function () {
            beforeEach(function () {
            });

            describe("test instances", function () {
                function setBuildShadowMapShaderAndProgram(handleProgramFunc) {
                    var useShader = director.scene.useShader;

                    sandbox.stub(director.scene, "useShader", function (shaderKey) {
                        useShader.call(director.scene, shaderKey);

                        var source = instanceArr[0];
                        var material = source.getComponent(wd.Geometry).material;

                        shader = material.shader;
                        program = shader.program;

                        if (handleProgramFunc) {
                            handleProgramFunc(program);
                        }
                    });
                }

                beforeEach(function () {
                });

                it("should send the model matrix data by send 4 vec4 attribute data", function () {
                    var offsetLocation0,
                        offsetLocation1,
                        offsetLocation2,
                        offsetLocation3;

                    offsetLocation0 = 11;
                    offsetLocation1 = 12;
                    offsetLocation2 = 13;
                    offsetLocation3 = 14;
                    setBuildShadowMapShaderAndProgram(function (program) {


                        sandbox.stub(program, "sendAttributeData");
                        sandbox.stub(program, "sendUniformData");
                        sandbox.stub(program, "getAttribLocation");
                        program.getAttribLocation.withArgs("a_mVec4_0").returns(offsetLocation0);
                        program.getAttribLocation.withArgs("a_mVec4_1").returns(offsetLocation1);
                        program.getAttribLocation.withArgs("a_mVec4_2").returns(offsetLocation2);
                        program.getAttribLocation.withArgs("a_mVec4_3").returns(offsetLocation3);
                    });

                    director._init();

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();


                    expect(program.getAttribLocation.withArgs("a_mVec4_0")).toCalledOnce();
                    expect(program.getAttribLocation.withArgs("a_mVec4_1")).toCalledOnce();
                    expect(program.getAttribLocation.withArgs("a_mVec4_2")).toCalledOnce();
                    expect(program.getAttribLocation.withArgs("a_mVec4_3")).toCalledOnce();

                    expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(offsetLocation0, 1)).toCalledOnce();
                    expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(offsetLocation1, 1)).toCalledOnce();
                    expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(offsetLocation2, 1)).toCalledOnce();
                    expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(offsetLocation3, 1)).toCalledOnce();
                });
                it("should use drawElementsInstancedANGLE to batch draw", function () {
                    director._init();

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
                });

                it("glsl should contain vec4 attribute define and mMatrix should consist of these 4 vec4 datas", function () {
                    setBuildShadowMapShaderAndProgram();


                    director._init();

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();


                    expect(glslTool.contain(shader.vsSource, "attribute vec4 a_mVec4_0")).toBeTruthy();
                    expect(glslTool.contain(shader.vsSource, "mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);")).toBeTruthy();
                });
            });

            describe("test other objects", function () {
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

                it("should send u_mMatrix data", function () {
                    setBuildShadowMapShaderAndProgram(sphere2, function (program) {
                        sandbox.stub(program, "sendUniformData");
                    });


                    director._init();

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();


                    expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledOnce();
                });
                it("should use drawElements to draw", function () {
                    director._init();

                    director.scene.gameObjectScene.render(renderer);
                    renderer.render();

                    expect(gl.drawElements).toCalledTwice();
                });
                it("glsl should contain u_matrix define and mMatrix should equal the data", function () {
                    var shader;

                    shader = sphere2.getComponent(wd.Geometry).material.shader;


                    director._init();


                    expect(glslTool.contain(shader.vsSource, "uniform mat4 u_mMatrix")).toBeTruthy();
                    expect(glslTool.contain(shader.vsSource, "mat4 mMatrix = u_mMatrix")).toBeTruthy();
                });
            });
        });


        describe("if hardware not support", function () {
            beforeEach(function () {
                wd.GPUDetector.getInstance().extensionInstancedArrays = null;
            });

            it("all instances should contain only one twoD shadow map", function () {
                director._init();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                instanceArr.forEach(function (instance) {
                    expect(shadowTool.getDefaultMapManager(instance).getTwoDShadowMapList().getCount()).toEqual(1);
                    expect(shadowTool.getBuildShadowMapMapManager().getTwoDShadowMapList().getCount()).toEqual(1);
                });
            });

            describe("test multi direction lights", function() {
                var light2;

                beforeEach(function () {
                    light2 = shadowTool.createDirectionLight();

                    director.scene.addChild(light2);
                });

                describe("send u_vpMatrixFromLight,u_twoDShadowSize,u_twoDShadowBias,u_twoDShadowDarkness,u_twoDLightPos", function () {
                    it("test instances", function () {
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

                        var sphere1Program = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere1, true).program;
                        var sphere1Instance1Program = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere1Instance1).program;

                        director._loopBody(1);


                        expect(sphere1Program.sendUniformData.withArgs("u_twoDLightPos[0]").firstCall.args[2]).toEqual(position1);
                        expect(sphere1Program.sendUniformData.withArgs("u_twoDLightPos[0]").secondCall.args[2]).toEqual(position1);

                        expect(sphere1Instance1Program.sendUniformData.withArgs("u_twoDLightPos[0]").firstCall.args[2]).toEqual(position1);
                        expect(sphere1Instance1Program.sendUniformData.withArgs("u_twoDLightPos[0]").secondCall.args[2]).toEqual(position1);




                        expect(sphere1Program.sendUniformData.withArgs("u_twoDLightPos[1]").firstCall.args[2]).toEqual(position2);
                        expect(sphere1Program.sendUniformData.withArgs("u_twoDLightPos[1]").secondCall.args[2]).toEqual(position2);

                        expect(sphere1Instance1Program.sendUniformData.withArgs("u_twoDLightPos[1]").firstCall.args[2]).toEqual(position2);
                        expect(sphere1Instance1Program.sendUniformData.withArgs("u_twoDLightPos[1]").secondCall.args[2]).toEqual(position2);
                    });
                });
            });

            describe("test shadow layer", function(){
                beforeEach(function(){
                    testTool.openContractCheck(sandbox);
                });

                it("instance shadow layer should always be the same with its source object's shadow layer", function () {
                    var shadow1 = sphere1.getComponent(wd.Shadow);
                    shadow1.layer = "layer1";


                    var shadow2 = sphere1Instance1.getComponent(wd.Shadow);
                    shadow2.layer = "layer2";

                    expect(shadow2.layer).toEqual(shadow1.layer);



                    director._init();

                    var shadowMap1 = shadowTool.getBuildShadowMapMapManager("layer1").getTwoDShadowMapList().getChild(0);

                    expect(shadowTool.getBuildShadowMapRenderer("layer2")).toBeUndefined();

                    sandbox.stub(shadowMap1, "bindToUnit");


                    director.scene.gameObjectScene.render(renderer);


                    expect(shadowMap1.bindToUnit).toCalledOnce();

                    renderer.render();

                    expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 3);
                });

                //describe("test draw based on shadow map", function(){
                //    beforeEach(function(){
                //    });
                //
                //    //it("bind the shadow maps of all layers when draw shadow map", function () {
                //    //    director._init();
                //    //
                //    //    var twoDShadowMapList1 = shadowTool.getDefaultMapManager(sphere).getTwoDShadowMapList();
                //    //    var twoDShadowMapList2 = shadowTool.getDefaultMapManager(sphere2).getTwoDShadowMapList();
                //    //    var twoDShadowMapList3 = shadowTool.getDefaultMapManager(sphere3).getTwoDShadowMapList();
                //    //
                //    //    expect(twoDShadowMapList1.getCount()).toEqual(2);
                //    //    expect(twoDShadowMapList2.getCount()).toEqual(2);
                //    //    expect(twoDShadowMapList3.getCount()).toEqual(2);
                //    //
                //    //    var shadowMap1 = twoDShadowMapList1.getChild(0);
                //    //    var shadowMap2 = twoDShadowMapList1.getChild(1);
                //    //    sandbox.stub(shadowMap1, "bindToUnit");
                //    //    sandbox.stub(shadowMap2, "bindToUnit");
                //    //
                //    //
                //    //    director.scene.gameObjectScene.render(renderer);
                //    //    renderer.render();
                //    //
                //    //    expect(shadowMap1.bindToUnit.callCount).toEqual(1 + 3);
                //    //    expect(shadowMap2.bindToUnit.callCount).toEqual(2 + 3);
                //    //});
                //    it("should send shadow map data", function () {
                //        var shadow1 = sphere1.getComponent(wd.Shadow);
                //        shadow1.layer = "layer1";
                //
                //
                //        var shadow2 = sphere2.getComponent(wd.Shadow);
                //        shadow2.layer = "layer2";
                //
                //
                //
                //        director._init();
                //
                //        //setDrawShadowMapShaderAndProgram();
                //        var data1 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere1);
                //        var program1 = data1.program;
                //
                //        var data2 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere2);
                //        var program2 = data2.program;
                //
                //        //var data3 = shadowTool.setDrawShadowMapShaderAndProgramHelper(sandbox, sphere3);
                //        //var program3 = data3.program;
                //
                //
                //        director.scene.gameObjectScene.render(renderer);
                //        renderer.render();
                //
                //        expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledTwice();
                //        expect(program1.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledTwice();
                //        expect(program1.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledTwice();
                //
                //
                //        expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 0)).toCalledOnce();
                //        expect(program2.sendUniformData.withArgs("u_twoDShadowMapSampler[1]", sinon.match.any, 1)).toCalledOnce();
                //        expect(program2.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 2)).toCalledOnce();
                //    });
                //});
            });
        });
    });

    //todo test point shadow
});
