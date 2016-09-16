describe("ShaderLibSpec", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("can change glsl source in runtime", function () {
        beforeEach(function () {
        });

        describe("use shadowMap->pcf as example", function () {
            var scene;
            var cmd, program, material;
            var shader;

            beforeEach(function () {
                scene = wd.Director.getInstance().scene;

                material = new wd.LightMaterial();

                cmd = new wd.QuadCommand();

                program = {
                    use: sandbox.stub(),
                    initWithShader: sandbox.stub(),
                    sendUniformData: sandbox.stub(),
                    sendAttributeBuffer: sandbox.stub(),
                    sendAttributeBufferFromCustomShader: sandbox.stub(),
                    sendUniformDataFromCustomShader: sandbox.stub()
                };




                scene.shadowMap.softType = wd.EShadowMapSoftType.PCF;
                shader = wd.CommonShader.create();
                shader.program = program;
                Lib = wd.TwoDShadowMapShaderLib;
                lib = Lib.create();
                shader.addLib(lib);
                shader.init();

                scene.glslData.addChild(wd.EShaderGLSLData.TWOD_SHADOWMAP, wdCb.Collection.create());
            });

            it("if SceneDispatcher.shadowMap.softType === PCF, glsl add 'define SHADOWMAP_TYPE_PCF'", function () {
                shader.update(cmd, material);

                expect(shader.fsSource).toContain("define SHADOWMAP_TYPE_PCF");
            });
            it("pcf can be opened or closed at runtime", function () {
                shader.update(cmd, material);

                scene.shadowMap.softType = wd.EShadowMapSoftType.NONE;

                shader.update(cmd, material);

                expect(shader.fsSource).not.toContain("define SHADOWMAP_TYPE_PCF");
            });
            //it("optimize:only when definition data change that program will reset shader", function(){
            //    shader.update(cmd, material);
            //
            //    shader.update(cmd, material);
            //
            //    scene.shadowMap.softType = wd.EShadowMapSoftType.NONE;
            //
            //    shader.update(cmd, material);
            //
            //    expect(program.initWithShader).toCalledTwice();
            //});
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


        var cmd = new wd.QuadCommand();
        sandbox.stub(cmd, "buffers", {
            hasChild:sandbox.stub().returns(true),
            getChild:sandbox.stub()
        });
        //cmd.mMatrix = wd.Matrix4.create();
        //cmd.vMatrix = wd.Matrix4.create();
        //cmd.pMatrix = wd.Matrix4.create();



        material1.definitionData = shaderDefinitionData;
        material1.init();

        sandbox.stub(material1.program, "sendUniformData");
        sandbox.stub(material1.program, "sendAttributeBuffer");

        material1.updateShader(cmd);





        material2.definitionData = shaderDefinitionData;
        material2.init();

        sandbox.stub(material2.program, "sendUniformData");
        sandbox.stub(material2.program, "sendAttributeBuffer");

        material2.updateShader(cmd);



        expect(material1.program.sendAttributeBuffer.withArgs("a_color")).toCalledOnce();
        expect(material2.program.sendAttributeBuffer.withArgs("a_color")).toCalledOnce();
    });
});

