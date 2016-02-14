describe("shaderLibSpec", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("can change glsl source in runtime", function () {
        beforeEach(function () {
        });

        describe("use shadowMap->pcf as example", function () {
            var scene;
            var quadCmd, program, material;
            var shader;

            beforeEach(function () {
                scene = wd.Director.getInstance().scene;

                material = new wd.LightMaterial();

                quadCmd = new wd.QuadCommand();

                program = {
                    use: sandbox.stub(),
                    initWithShader: sandbox.stub(),
                    sendUniformData: sandbox.stub(),
                    sendAttributeData: sandbox.stub(),
                    sendAttributeDataFromCustomShader: sandbox.stub(),
                    sendUniformDataFromCustomShader: sandbox.stub()
                };




                scene.shadowMap.softType = wd.EShadowMapSoftType.PCF;
                shader = new wd.Shader();
                shader.program = program;
                Lib = wd.TwoDShadowMapShaderLib;
                lib = Lib.create();
                shader.addLib(lib);
                shader.init();
            });

            it("if SceneDispatcher.shadowMap.softType === PCF, glsl add 'define SHADOWMAP_TYPE_PCF'", function () {
                shader.update(quadCmd, material);

                expect(shader.fsSource).toContain("define SHADOWMAP_TYPE_PCF");
            });
            it("pcf can be opened or closed in runtime", function () {
                shader.update(quadCmd, material);

                scene.shadowMap.softType = wd.EShadowMapSoftType.NONE;

                shader.update(quadCmd, material);

                expect(shader.fsSource).not.toContain("define SHADOWMAP_TYPE_PCF");
            });
            it("optimize:only when definition data change that program will reset shader", function(){
                shader.update(quadCmd, material);

                shader.update(quadCmd, material);

                scene.shadowMap.softType = wd.EShadowMapSoftType.NONE;

                shader.update(quadCmd, material);

                expect(program.initWithShader).toCalledTwice();
            });
        });
    });

    it("materials' shader lib are independent", function(){
        var material1 = wd.ShaderMaterial.create();
        var material2 = wd.ShaderMaterial.create();

        var shaderDefinitionData = {
            attributes: {
                "a_color": {
                    type: wd.EVariableType.FLOAT_3,
                    value: [
                        1, 0, 0, 1,
                        1, 0, 0, 1,
                        0, 1, 0, 1,
                        0, 0, 1, 1
                    ]
                }
            },
            uniforms: {
            }
        };


        var quadCmd = new wd.QuadCommand();
        sandbox.stub(quadCmd, "buffers", {
            hasChild:sandbox.stub().returns(true),
            getChild:sandbox.stub()
        });
        //quadCmd.mMatrix = wd.Matrix4.create();
        //quadCmd.vMatrix = wd.Matrix4.create();
        //quadCmd.pMatrix = wd.Matrix4.create();
        sandbox.stub(material1.program, "sendUniformData");
        sandbox.stub(material1.program, "sendAttributeData");

        sandbox.stub(material2.program, "sendUniformData");
        sandbox.stub(material2.program, "sendAttributeData");



        material1.shader.read(shaderDefinitionData);
        material1.init();
        material1.updateShader(quadCmd);

        material2.shader.read(shaderDefinitionData);
        material2.init();
        material2.updateShader(quadCmd);

        expect(material1.program.sendAttributeData.withArgs("a_color")).toCalledOnce();
        expect(material2.program.sendAttributeData.withArgs("a_color")).toCalledOnce();
    });
});

