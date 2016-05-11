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

            shaderTool.stubProgram(sandbox, program);
        });

        describe("send point light data", function(){
            it("send point light's position", function(){
                var light1 = createPointLight(function(light){
                });

                light1.transform.position = wd.Vector3.create(1,2,3);

                scene.addChild(light1);


                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendVector3.withArgs("u_pointLights[0].position", light1.transform.position)).toCalledOnce();
            });
            it("send point light's range data", function(){
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

                        expect(program.sendFloat1.withArgs("u_pointLights[0].range", wd.ShaderChunk.NULL)).toCalledOnce();
                        expect(program.sendFloat1.withArgs("u_pointLights[1].range", 1)).toCalledOnce();
                    });
                });
            });
        });

        describe("send direction light data", function(){
            beforeEach(function(){
            });

            describe("send direction light's position", function(){
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

                    expect(program.sendVector3.withArgs("u_directionLights[0].position", wd.DirectionLight.defaultPosition)).toCalledOnce();
                    expect(program.sendVector3.withArgs("u_directionLights[1].position", wd.Vector3.create(1, 0, 0))).toCalledOnce();
                });
            });

            it("send direction lights' color", function(){
                var color = wd.Color.create("#aaaaaa");
                var light1 = createDirectionLight(function(light){
                    light.getComponent(wd.DirectionLight).color = color;
                });

                scene.addChild(light1);


                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendColor4.withArgs("u_directionLights[0].color", color)).toCalledOnce();
            });
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

