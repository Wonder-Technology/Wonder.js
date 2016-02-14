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
        testTool.clearInstance();
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

                expect(program.sendUniformData).toCalledWith("u_directionLights[0].position", wd.EVariableType.FLOAT_3, wd.DirectionLight.defaultPosition);
                expect(program.sendUniformData).toCalledWith("u_directionLights[1].position", wd.EVariableType.FLOAT_3, wd.Vector3.create(1, 0, 0));
            });
        });

        describe("send point light's range", function(){
            it("if range === null, send ShaderChunk.NULL; else, send range", function(){
                var light1 = createPointLight(function(light){
                });
                var light2 = createPointLight(function(light){
                    light.getComponent(wd.PointLight).range = 1;
                });

                scene.addChild(light1);
                scene.addChild(light2);


                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_pointLights[0].range", wd.EVariableType.FLOAT_1, wd.ShaderChunk.NULL);
                expect(program.sendUniformData).toCalledWith("u_pointLights[1].range", wd.EVariableType.FLOAT_1, 1);
            });
        });

        it("send u_normalMatrix", function(){
            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData).toCalledWith("u_normalMatrix", wd.EVariableType.FLOAT_MAT3, mMatrix.copy().invertTo3x3().transpose());
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

