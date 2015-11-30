describe("LightShaderLib", function () {
        var sandbox = null;
        var Lib = null;
        var lib = null;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            Lib = wd.LightShaderLib;
            lib = new Lib();
        });
        afterEach(function () {
            sandbox.restore();
        });

    describe("sendShaderVariables", function(){
        var quadCmd,program,material;
        var scene,camera;
        var mMatrix;

        function createDirectionLight(onSetLight){
            var light = new wd.GameObject();
            light.addComponent(wd.DirectionLight.create());

            onSetLight(light);

            return light;
        }

        beforeEach(function(){
            scene = wd.Director.getInstance().scene;

            camera = new wd.GameObject();
            sandbox.stub(scene, "camera", camera);

            material = new wd.LightMaterial();

            quadCmd = new wd.QuadCommand();
            sandbox.stub(quadCmd, "buffers", {
                hasChild:sandbox.stub().returns(false),
                getChild:sandbox.stub()
            });

            mMatrix = wd.Matrix4.create().translate(1, 2, 3);

            sandbox.stub(quadCmd, "mMatrix", mMatrix);

            program = new wd.Program();
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

                expect(program.sendUniformData).toCalledWith("u_directionLights[0].position", wd.VariableType.FLOAT_3, wd.DirectionLight.defaultPosition);
                expect(program.sendUniformData).toCalledWith("u_directionLights[1].position", wd.VariableType.FLOAT_3, wd.Vector3.create(1, 0, 0));
            });
        });

        it("send u_normalMatrix", function(){
            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData).toCalledWith("u_normalMatrix", wd.VariableType.FLOAT_MAT3, mMatrix.copy().invertTo3x3().transpose());
        });
        it("send u_opacity", function(){
            material.opacity = 0.1;

            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData).toCalledWith("u_opacity", wd.VariableType.FLOAT_1, 0.1);
        });
    });
});

