describe("LightShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var quadCmd,program,material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.LightShaderLib;
        lib = new Lib();

        material = new wd.LightMaterial();
        quadCmd = new wd.QuadCommand();
        program = new wd.Program();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("sendShaderVariables", function(){
        var scene,camera;
        var mMatrix;

        function createDirectionLight(onSetLight){
            var light = wd.GameObject.create();
            light.addComponent(wd.DirectionLight.create());

            onSetLight(light);

            return light;
        }

        function createPointLight(onSetLight){
            var light = wd.GameObject.create();

            light.addComponent(wd.PointLight.create());

            onSetLight(light);

            return light;
        }

        beforeEach(function(){
            scene = wd.Director.getInstance().scene;

            camera = wd.GameObject.create();
            sandbox.stub(scene, "currentCamera", camera);

            sandbox.stub(quadCmd, "buffers", {
                hasChild:sandbox.stub().returns(false),
                getChild:sandbox.stub()
            });

            mMatrix = wd.Matrix4.create().translate(1, 2, 3);

            sandbox.stub(quadCmd, "mMatrix", mMatrix);

            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        });

        describe("send point light data", function(){
            describe("send point light's position", function(){
                it("if point light position changed, send it", function () {
                    var light1 = createPointLight(function(light){
                    });

                    light1.transform.position = wd.Vector3.create(1,2,3);

                    scene.addChild(light1);


                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_pointLights[0].position", wd.EVariableType.VECTOR_3, light1.transform.position)).toCalledOnce();
                });
                it("else, not send it", function () {
                    var light1 = createPointLight(function (light) {
                    });

                    scene.addChild(light1);

                    light1.init();


                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_pointLights[0].position", wd.EVariableType.VECTOR_3)).toCalledOnce();


                    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));




                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_pointLights[0].position", wd.EVariableType.VECTOR_3)).not.toCalledTwice();
                });
            });
            describe("send point light's range data", function(){
                it("if all of range data not changed, not send any data", function () {
                    var light1 = createPointLight(function(light){
                    });

                    light1.getComponent(wd.Light).resetGLSLDirty();

                    scene.addChild(light1);


                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_pointLights[0].range", wd.EVariableType.FLOAT_1)).not.toCalled();
                    expect(program.sendUniformData.withArgs("u_pointLights[0].constant", wd.EVariableType.FLOAT_1)).not.toCalled();
                });
                it("if any one of range data changed, send all data", function () {
                    var light1 = createPointLight(function(light){
                    });

                    var lightComponent = light1.getComponent(wd.Light);

                    lightComponent.resetGLSLDirty();

                    lightComponent.constant = 1000;

                    scene.addChild(light1);


                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_pointLights[0].range", wd.EVariableType.FLOAT_1)).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_pointLights[0].constant", wd.EVariableType.FLOAT_1)).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_pointLights[0].linear", wd.EVariableType.FLOAT_1)).toCalledOnce();
                });

                describe("test send point light's range", function(){
                    it("if range === null, send ShaderChunk.NULL; else, send range", function(){
                        var light1 = createPointLight(function(light){
                        });
                        var light2 = createPointLight(function(light){
                            light.getComponent(wd.PointLight).range = 1;
                        });

                        scene.addChild(light1);
                        scene.addChild(light2);


                        lib.sendShaderVariables(program, quadCmd, material);

                        expect(program.sendUniformData.withArgs("u_pointLights[0].range", wd.EVariableType.FLOAT_1, wd.ShaderChunk.NULL)).toCalledOnce();
                        expect(program.sendUniformData.withArgs("u_pointLights[1].range", wd.EVariableType.FLOAT_1, 1)).toCalledOnce();
                    });
                });
            });
        });

        describe("send direction light data", function(){
            beforeEach(function(){
            });

            describe("send direction light's position", function(){
                it("if direction light position not changed, not send it", function () {
                    var light1 = createDirectionLight(function(light){
                        light.transform.translate(1, 0, 0);
                    });

                    scene.addChild(light1);

                    light1.init();


                    lib.sendShaderVariables(program, quadCmd, material);


                    expect(program.sendUniformData.withArgs("u_directionLights[0].position", wd.EVariableType.VECTOR_3, light1.transform.position)).toCalledOnce();


                    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));



                    lib.sendShaderVariables(program, quadCmd, material);


                    expect(program.sendUniformData.withArgs("u_directionLights[0].position", wd.EVariableType.VECTOR_3, light1.transform.position)).not.toCalledTwice();
                });

                describe("else", function(){
                    it("if its position is zero point, send the default position; else, send it", function(){
                        var light1 = createDirectionLight(function(light){
                            light.transform.translate(0, 0, 0);
                        })
                        var light2 = createDirectionLight(function(light){
                            light.transform.translate(1, 0, 0);
                        })

                        scene.addChild(light1);
                        scene.addChild(light2);


                        lib.sendShaderVariables(program, quadCmd, material);

                        expect(program.sendUniformData.withArgs("u_directionLights[0].position", wd.EVariableType.VECTOR_3, wd.DirectionLight.defaultPosition)).toCalledOnce();
                        expect(program.sendUniformData.withArgs("u_directionLights[1].position", wd.EVariableType.VECTOR_3, wd.Vector3.create(1, 0, 0))).toCalledOnce();
                    });
                });
            });

            describe("send direction lights' color", function(){
                beforeEach(function(){
                });

                it("if direction light color not changed, not send it", function () {
                    var color = wd.Color.create("#aaaaaa");
                    var light1 = createDirectionLight(function(light){
                        light.getComponent(wd.DirectionLight).color = color;
                    });

                    scene.addChild(light1);

                    light1.init();


                    lib.sendShaderVariables(program, quadCmd, material);

                    expect(program.sendUniformData.withArgs("u_directionLights[0].color", wd.EVariableType.VECTOR_4, color.toVector4())).toCalledOnce();


                    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));




                    lib.sendShaderVariables(program, quadCmd, material);


                    expect(program.sendUniformData.withArgs("u_directionLights[0].color", wd.EVariableType.VECTOR_4, color.toVector4())).not.toCalledTwice();
                });
            });
        });

        it("reset all lights' dirty to false", function () {
            var color = wd.Color.create("#aaaaaa");
            var light1 = createDirectionLight(function(light){
                light.getComponent(wd.DirectionLight).color = color;
            });
            var light2 = createPointLight(function(light){
                light.getComponent(wd.PointLight).constant = 101;
            });

            scene.addChild(light1);
            scene.addChild(light2);


            light1.init();
            light2.init();


            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData.withArgs("u_directionLights[0].color", wd.EVariableType.VECTOR_4)).toCalledOnce();

            expect(program.sendUniformData.withArgs("u_directionLights[0].intensity", wd.EVariableType.FLOAT_1)).toCalledOnce();

            expect(program.sendUniformData.withArgs("u_pointLights[0].color", wd.EVariableType.VECTOR_4)).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_pointLights[0].intensity", wd.EVariableType.FLOAT_1)).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_pointLights[0].constant", wd.EVariableType.FLOAT_1)).toCalledOnce();


            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));







            lib.sendShaderVariables(program, quadCmd, material);


            expect(program.sendUniformData.withArgs("u_directionLights[0].color", wd.EVariableType.VECTOR_4)).not.toCalledTwice();

            expect(program.sendUniformData.withArgs("u_directionLights[0].intensity", wd.EVariableType.FLOAT_1)).not.toCalledTwice();

            expect(program.sendUniformData.withArgs("u_pointLights[0].color", wd.EVariableType.VECTOR_4)).not.toCalledTwice();
            expect(program.sendUniformData.withArgs("u_pointLights[0].intensity", wd.EVariableType.FLOAT_1)).not.toCalledTwice();
            expect(program.sendUniformData.withArgs("u_pointLights[0].constant", wd.EVariableType.FLOAT_1)).not.toCalledTwice();
        });


        it("send u_opacity", function(){
            material.opacity = 0.1;

            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData).toCalledWith("u_opacity", wd.EVariableType.FLOAT_1, 0.1);
        });

        describe("send u_lightModel", function(){
            beforeEach(function(){

            });

            it("convert string to glsl variable", function(){
                material.lightModel = wd.ELightModel.BLINN;

                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_lightModel", wd.EVariableType.NUMBER_1, 1);



                material.lightModel = wd.ELightModel.PHONG;

                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_lightModel", wd.EVariableType.NUMBER_1, 2);



                material.lightModel = wd.ELightModel.CONSTANT;

                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_lightModel", wd.EVariableType.NUMBER_1, 3);
            });
            it("not support LAMBERT", function () {
                material.lightModel = wd.ELightModel.LAMBERT;

                expect(function(){
                    lib.sendShaderVariables(program, quadCmd, material);
                }).toThrow();
            });
        });
    });


    describe("setShaderDefinition", function(){
        beforeEach(function(){
            sandbox.stub(lib, "addUniformVariable");
        });

        it("send u_lightModel", function(){
            lib.setShaderDefinition(quadCmd, material);

            var uniformVariableArr = lib.addUniformVariable.args[0][0];
            expect(uniformVariableArr.indexOf("u_lightModel") > -1).toBeTruthy();
        });
    });
});

