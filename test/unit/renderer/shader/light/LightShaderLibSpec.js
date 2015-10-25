describe("LightShaderLib", function () {
        var sandbox = null;
        var Lib = null;
        var lib = null;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            Lib = dy.LightShaderLib;
            lib = new Lib();
        });
        afterEach(function () {
            sandbox.restore();
        });

    describe("sendShaderVariables", function(){
        var quadCmd,program,material;
        var stage,camera;
        var mMatrix;

        function createDirectionLight(onSetLight){
            var light = new dy.GameObject();
            light.addComponent(dy.DirectionLight.create());

            onSetLight(light);

            return light;
        }

        beforeEach(function(){
            stage = dy.Director.getInstance().stage;

            camera = new dy.GameObject();
            sandbox.stub(stage, "camera", camera);

            material = new dy.LightMaterial();

            quadCmd = new dy.QuadCommand();
            sandbox.stub(quadCmd.buffers, "hasChild").returns(false);

            mMatrix = dy.Matrix4.create().translate(1, 2, 3);

            sandbox.stub(quadCmd, "mMatrix", mMatrix);

            program = new dy.Program();
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        });

        it("send a_normal if has buffer", function(){
            var normalBuffer = {};
            quadCmd.buffers.hasChild.withArgs("normalBuffer").returns(true);
            sandbox.stub(quadCmd.buffers, "getChild").withArgs("normalBuffer").returns(normalBuffer);

            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendAttributeData).toCalledWith("a_normal", dy.VariableType.BUFFER, normalBuffer);
        });
        it("send u_normalMatrix", function(){
            lib.sendShaderVariables(program, quadCmd, material);

            expect(program.sendUniformData).toCalledWith("u_normalMatrix", dy.VariableType.FLOAT_MAT3, mMatrix.copy().invertTo3x3().transpose());
        });

        describe("send direction light's position", function(){
            it("if its position is zero point, send the default position; else, send it", function(){
                var light1 = createDirectionLight(function(light){
                    light.transform.translate(0, 0, 0);
                })
                var light2 = createDirectionLight(function(light){
                    light.transform.translate(1, 0, 0);
                })

                stage.addChild(light1);
                stage.addChild(light2);


                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_directionLights[0].position", dy.VariableType.FLOAT_3, dy.DirectionLight.defaultPosition);
                expect(program.sendUniformData).toCalledWith("u_directionLights[1].position", dy.VariableType.FLOAT_3, dy.Vector3.create(1, 0, 0));
            });
        });
    });
});

