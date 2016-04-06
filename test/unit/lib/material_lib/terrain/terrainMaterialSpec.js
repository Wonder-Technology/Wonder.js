describe("terrain material", function() {
    var sandbox = null;

    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.TerrainMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default values", function () {
    });

    it("if not define mapDataList, should not error when init", function () {
        expect(function(){
            material.init();
        }).not.toThrow();
    });
    
    describe("mapDataList(setter)", function(){
        beforeEach(function(){
        });
        
        it("require that the height range shouldn't overlap", function(){
            testTool.openContractCheck(sandbox);

            expect(function(){
                material.layer.mapDataList = wdCb.Collection.create([
                    {
                        minHeight:10,
                        maxHeight:20,
                        diffuseMap:{}
                    },
                    {
                        minHeight:20,
                        maxHeight:50,
                        diffuseMap:{}
                    }
                ]);
            }).not.toThrow();

            expect(function(){
                material.layer.mapDataList = wdCb.Collection.create([
                    {
                        minHeight:10,
                        maxHeight:20,
                        diffuseMap:{}
                    },
                    {
                        minHeight:19,
                        maxHeight:50,
                        diffuseMap:{}
                    }
                ]);
            }).toThrow();
        });
    });

    describe("integration test", function(){
        var quadCmd;
        var map1,map2,map3;

        beforeEach(function(){
            sandbox.spy(material.program, "sendUniformData");
            sandbox.spy(material.program, "sendAttributeData");
            sandbox.spy(material.program, "sendStructureData");


            wd.Director.getInstance().scene = wd.SceneDispatcher.create();

            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create()


            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;
        });

        describe("test map", function(){
            beforeEach(function(){

            });

            it("test bind and send map data", function(){
                map1 = wd.ImageTexture.create();
                map2 = wd.ImageTexture.create();
                map3 = wd.ImageTexture.create();


                sandbox.stub(map1, "bindToUnit");
                sandbox.stub(map2, "bindToUnit");
                sandbox.stub(map3, "bindToUnit");

                sandbox.stub(map1, "update");
                sandbox.stub(map2, "update");
                sandbox.stub(map3, "update");



                material.layer.mapDataList = wdCb.Collection.create([
                    {
                        minHeight:10,
                        maxHeight:20,
                        diffuseMap:map1
                    },
                    {
                        minHeight:20,
                        maxHeight:50,
                        diffuseMap:map2
                    }
                ]);



                material.diffuseMap = map3;





                material.init();





                sandbox.stub(map1, "getSamplerName").returns("u_sampler1");
                sandbox.stub(map2, "getSamplerName").returns("u_sampler2");
                sandbox.stub(map3, "getSamplerName").returns("u_sampler3");



                material.updateShader(quadCmd);



                expect(map3.bindToUnit).toCalledWith(0);
                expect(map1.bindToUnit).toCalledWith(1);
                expect(map2.bindToUnit).toCalledWith(2);

                expect(map3.update).toCalledOnce();
                expect(map1.update).toCalledOnce();
                expect(map2.update).toCalledOnce();

                expect(map3.update).toCalledBefore(map1.update);
                expect(map1.update).toCalledBefore(map2.update);







                expect(material.program.sendUniformData).toCalledWith("u_sampler3", wd.EVariableType.SAMPLER_2D, 0);
                expect(material.program.sendUniformData).not.toCalledWith("u_sampler1", wd.EVariableType.SAMPLER_2D, 1);
                expect(material.program.sendUniformData).not.toCalledWith("u_sampler2", wd.EVariableType.SAMPLER_2D, 2);

                expect(material.program.sendUniformData).toCalledWith("u_layerSampler2Ds[0]", wd.EVariableType.SAMPLER_ARRAY, [1,2]);
            });

            describe("test set procedural map to be layer map", function(){
                beforeEach(function(){
                    map1 = wd.ImageTexture.create();
                    map2 = wd.MarbleProceduralTexture.create();
                    map3 = wd.ImageTexture.create();


                    sandbox.stub(map1, "init");
                    sandbox.stub(map2, "init");
                    sandbox.stub(map3, "init");



                    material.layer.mapDataList = wdCb.Collection.create([
                        {
                            minHeight:10,
                            maxHeight:20,
                            diffuseMap:map1
                        },
                        {
                            minHeight:20,
                            maxHeight:50,
                            diffuseMap:map2
                        }
                    ]);

                    material.diffuseMap = map3;
                });

                it("init procedural map", function(){
                    material.init();

                    expect(map1.init).toCalledOnce();
                    expect(map2.init).toCalledOnce();
                    expect(map3.init).toCalledOnce();
                });
            });
        });

        describe("send glsl data", function(){
            beforeEach(function(){
                map1 = wd.ImageTexture.create();
                map2 = wd.MarbleProceduralTexture.create();
            });

            it("send u_layerHeightDatas data", function () {
                material.layer.mapDataList = wdCb.Collection.create([
                    {
                        minHeight:10,
                        maxHeight:20,
                        diffuseMap:map1
                    },
                    {
                        minHeight:20,
                        maxHeight:50,
                        diffuseMap:map2
                    }
                ]);


                material.init();



                material.updateShader(quadCmd);




                expect(material.program.sendStructureData).toCalledWith("u_layerHeightDatas[0].minHeight", wd.EVariableType.FLOAT_1, 10);
                expect(material.program.sendStructureData).toCalledWith("u_layerHeightDatas[0].maxHeight", wd.EVariableType.FLOAT_1, 20);

                expect(material.program.sendStructureData).toCalledWith("u_layerHeightDatas[1].minHeight", wd.EVariableType.FLOAT_1, 20);
                expect(material.program.sendStructureData).toCalledWith("u_layerHeightDatas[1].maxHeight", wd.EVariableType.FLOAT_1, 50);
            });

            describe("send a_texCoord", function () {
                it("send it even material has no map expect layer map", function () {
                    material.layer.mapDataList = wdCb.Collection.create([
                        {
                            minHeight:10,
                            maxHeight:20,
                            diffuseMap:map1
                        },
                        {
                            minHeight:20,
                            maxHeight:50,
                            diffuseMap:map2
                        }
                    ]);



                    material.init();



                    quadCmd.buffers.getChild.withArgs(wd.EBufferDataType.TEXCOORD).returns([0.1,0.2]);





                    material.updateShader(quadCmd);


                    expect(material.program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
                });
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("define LAYER_COUNT", function(){
                    material.layer.mapDataList = wdCb.Collection.create([
                        {
                            minHeight:10,
                            maxHeight:20,
                            diffuseMap:map1
                        },
                        {
                            minHeight:20,
                            maxHeight:50,
                            diffuseMap:map2
                        }
                    ]);



                    material.init();

                    material.updateShader(quadCmd);


                    expect(shaderTool.judgeGLSLDefine(material.shader.fsSource, "LAYER_COUNT", 2));
                });
            });
        });
    });
});

