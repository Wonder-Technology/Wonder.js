describe("terrain material", function() {
    var sandbox = null;

    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);


        material = wd.TerrainMaterial.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("integration test", function(){
        var quadCmd;
        var map1,map2,map3;

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


            sandbox.stub(material.program, "sendUniformData");
            sandbox.stub(material.program, "sendAttributeData");


            wd.Director.getInstance().scene = wd.SceneDispatcher.create();

            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create()


            quadCmd = rendererTool.createQuadCommand(sandbox);

            quadCmd.material = material;
        });

        describe("test map", function(){
            beforeEach(function(){

            });

            describe("test bind and send map data", function(){
                it("", function () {
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



                    //todo try comment this code
                    material.diffuseMap = map3;





                    material.init();




                    material.bindTexture();


                    expect(map3.bindToUnit).toCalledWith(0);
                    expect(map1.bindToUnit).toCalledWith(1);
                    expect(map2.bindToUnit).toCalledWith(2);




                    material.updateTexture();

                    expect(map3.update).toCalledOnce();
                    expect(map1.update).toCalledOnce();
                    expect(map2.update).toCalledOnce();

                    expect(map3.update).toCalledBefore(map1.update);
                    expect(map1.update).toCalledBefore(map2.update);




                    var pos = 1;
                    sandbox.stub(material.program, "getUniformLocation").returns(pos);



                    material.updateShader(quadCmd);


                    expect(material.program.sendUniformData).toCalledWith(pos, wd.EVariableType.SAMPLER_2D, 0);
                    expect(material.program.sendUniformData).not.toCalledWith(pos, wd.EVariableType.SAMPLER_2D, 1);
                    expect(material.program.sendUniformData).not.toCalledWith(pos, wd.EVariableType.SAMPLER_2D, 2);

                    expect(material.program.sendUniformData).toCalledWith("u_layerSampler2Ds[0]", wd.EVariableType.SAMPLER_ARRAY, [1,2]);
                });
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

            });

            describe("send a_texCoord", function () {
                it("send it even material has no map expect layer map", function () {
                    map1 = wd.ImageTexture.create();
                    map2 = wd.MarbleProceduralTexture.create();
                    //map3 = wd.ImageTexture.create();


                    sandbox.stub(map1, "init");
                    sandbox.stub(map2, "init");
                    //sandbox.stub(map3, "init");



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






                    var pos = 1;
                    sandbox.stub(material.program, "getUniformLocation").returns(pos);


                    material.updateShader(quadCmd);


                    expect(material.program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
                });
            });
        });
    });
});

