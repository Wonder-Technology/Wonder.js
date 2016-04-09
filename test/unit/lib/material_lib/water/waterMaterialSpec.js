describe("water material", function () {
    var sandbox = null;

    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.WaterMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    it("test default values", function () {
        expect(material.refractionLevel).toEqual(0.8);
        expect(material.reflectionLevel).toEqual(0.6);
        expect(material.fresnelLevel).toEqual(1.0);

        expect(material.wind.direction).toEqual(wd.Vector2.create(0, 1));

        expect(material.wave.height).toEqual(0.15);
        expect(material.wave.length).toEqual(0.1);
    });

    describe("bumpMap(setter)", function () {
        beforeEach(function () {
        });

        it("set bumpMap's wrapS/T to be REPEAT", function () {
            var bumpTexture = wd.ImageTextureAsset.create().toTexture();

            material.bumpMap = bumpTexture;

            expect(material.bumpMap.wrapS).toEqual(wd.ETextureWrapMode.REPEAT);
            expect(material.bumpMap.wrapT).toEqual(wd.ETextureWrapMode.REPEAT);
        });
    });

    describe("integration test", function () {
        var quadCmd;
        var bumpMap, reflectionMap, refractionMap;

        beforeEach(function () {
            sandbox.spy(material.program, "sendUniformData");
            sandbox.spy(material.program, "sendAttributeData");
            sandbox.spy(material.program, "sendStructureData");


            //wd.Director.getInstance().scene = wd.SceneDispatcher.create();

            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;
        });

        describe("test map", function () {
            beforeEach(function () {
            });

            it("test bind and send map data", function () {
                bumpMap = wd.ImageTexture.create();
                reflectionMap = wd.MirrorTexture.create();
                refractionMap = wd.RefractionTexture.create();


                sandbox.stub(bumpMap, "bindToUnit");
                sandbox.stub(reflectionMap, "bindToUnit");
                sandbox.stub(refractionMap, "bindToUnit");

                sandbox.stub(bumpMap, "update");
                sandbox.stub(reflectionMap, "update");
                sandbox.stub(refractionMap, "update");


                material.refractionMap = refractionMap;
                material.bumpMap = bumpMap;
                material.reflectionMap = reflectionMap;


                material.init();




                material.updateShader(quadCmd);


                expect(refractionMap.bindToUnit).toCalledWith(0);
                expect(bumpMap.bindToUnit).toCalledWith(1);
                expect(reflectionMap.bindToUnit).toCalledWith(2);

                expect(bumpMap.update).toCalledOnce();
                expect(refractionMap.update).not.toCalled();
                expect(reflectionMap.update).not.toCalled();







                expect(material.program.sendUniformData).toCalledWith("u_refractionMapSampler", wd.EVariableType.SAMPLER_2D, 0);
                expect(material.program.sendUniformData).toCalledWith("u_bumpMapSampler", wd.EVariableType.SAMPLER_2D, 1);
                expect(material.program.sendUniformData).toCalledWith("u_reflectionMapSampler", wd.EVariableType.SAMPLER_2D, 2);
            });
        });

        describe("send glsl data", function(){
            beforeEach(function(){
            });

            it("send u_waveData", function () {
                material.wave.height = 0.5;
                material.wave.length = 0.8;

                material.init();

                material.updateShader(quadCmd);




                expect(material.program.sendStructureData).toCalledWith("u_waveData.length", wd.EVariableType.FLOAT_1, 0.8);
                expect(material.program.sendStructureData).toCalledWith("u_waveData.height", wd.EVariableType.FLOAT_1, 0.5);
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("test uniform data", function(){
                    material.init();

                    material.updateShader(quadCmd);

                    shaderTool.judgeGLSLUniformData(material.shader.fsSource, "u_waveData");
                });
            });
        });
    });
});

