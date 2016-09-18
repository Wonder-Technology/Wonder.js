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

    describe("clone", function(){
        it("clone map", function() {
            var bumpMap = wd.ImageTexture.create({});
            var resultBumpMap = wd.ImageTexture.create({a: 1});
            sandbox.stub(bumpMap, "clone").returns(resultBumpMap);

            var refractionMap = wd.ImageTexture.create({});
            var resultRefractionMap = wd.ImageTexture.create({a: 1});
            sandbox.stub(refractionMap, "clone").returns(resultRefractionMap);

            var reflectionMap = wd.ImageTexture.create({});
            var resultReflectionMap = wd.ImageTexture.create({a: 1});
            sandbox.stub(reflectionMap, "clone").returns(resultReflectionMap);


            cloneTool.extend(material, {
                bumpMap:bumpMap,
                refractionMap: refractionMap,
                reflectionMap: reflectionMap
            });


            var result = material.clone();

            expect(result.mapManager === material.mapManager).toBeFalsy();
            expect(result.bumpMap).toEqual(resultBumpMap);
            expect(result.refractionMap).toEqual(resultRefractionMap);
            expect(result.reflectionMap).toEqual(resultReflectionMap);
            expect(result.reflectionMap).toEqual(resultReflectionMap);
        });
        it("clone wind,wave", function () {
            var wind = wd.WaterWindModel.create();
            wind.time = 10;
            wind.speed = 20;
            wind.direction = wd.Vector2.create(1,1);


            var wave = wd.WaterWaveModel.create();
            wave.height = 0.23;
            wave.length = 0.2;


            cloneTool.extend(material, {
                wind:wind,
                wave:wave
            });

            var result = material.clone();

            expect(result.wind === material.wind).toBeFalsy();
            expect(result.wind).toEqual(material.wind);

            expect(result.wave === material.wave).toBeFalsy();
            expect(result.wave).toEqual(material.wave);
        });
        it("clone data", function () {
            var fresnelLevel = 0.3,
                reflectionLevel = 0.2,
                refractionLevel = 0.1;

            cloneTool.extend(material, {
                    fresnelLevel: fresnelLevel,
                    reflectionLevel: reflectionLevel,
                refractionLevel: refractionLevel
            });

            var result = material.clone();

            expect(result.fresnelLevel).toEqual(fresnelLevel)
            expect(result.reflectionLevel).toEqual(reflectionLevel)
            expect(result.refractionLevel).toEqual(refractionLevel)
        });
    });

    describe("integration test", function () {
        var cmd;
        var bumpMap, reflectionMap, refractionMap;

        beforeEach(function () {
            //wd.Director.getInstance().scene = wd.SceneDispatcher.create();

            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            cmd = rendererTool.createSingleDrawCommand(sandbox);

            cmd.material = material;
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
                shaderTool.spyProgram(sandbox, material);





                material.updateShader(cmd);


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
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);




                expect(material.program.sendStructureData).toCalledWith("u_waveData.length", wd.EVariableType.FLOAT_1, 0.8);
                expect(material.program.sendStructureData).toCalledWith("u_waveData.height", wd.EVariableType.FLOAT_1, 0.5);
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("test uniform data", function(){
                    material.init();

                    material.updateShader(cmd);

                    shaderTool.judgeGLSLUniformData(material.shader.fsSource, "u_waveData");
                });
            });
        });
    });
});

