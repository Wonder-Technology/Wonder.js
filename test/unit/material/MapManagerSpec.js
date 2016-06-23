describe("MapManager", function() {
    var sandbox = null;
    var Manager = null;
    var manager = null;
    var gl;

    var asset1,asset2,asset3;
    var twoDTexture,compressedTexture,proceduralTexture,cubemapTexture,twoDShadowMap,cubemapShadowMap;
    var arrayMap11,arrayMap12;
    var arrayMapSamplerName;

    function addAllTypeMaps(){
        asset1 = wd.ImageTextureAsset.create({});
        asset2 = wd.CompressedTextureAsset.create({});
        twoDTexture = wd.ImageTexture.create(asset1);
        compressedTexture = wd.CompressedTexture.create(asset2);
        manager.addMap(twoDTexture);
        manager.addMap(compressedTexture);

        proceduralTexture = wd.MarbleProceduralTexture.create();
        manager.addMap(proceduralTexture);


        asset3 = {
            asset: wd.CompressedTextureAsset.create({})
        };
        cubemapTexture = wd.CubemapTexture.create(
            [asset3,asset3, asset3, asset3, asset3, asset3 ]
        );
        manager.setEnvMap(cubemapTexture);


        twoDShadowMap = wd.TwoDShadowMapTexture.create();
        manager.addTwoDShadowMap(twoDShadowMap);

        //todo modify cubeShadowMap test
        cubemapShadowMap = wd.CubemapShadowMapTexture.create();
        manager.addMap(cubemapShadowMap, {
            samplerData: 1
        });

        arrayMap11 = wd.ImageTexture.create({a:1});
        arrayMap12 = wd.ImageTexture.create({});

        arrayMapSamplerName = "u_layerSampler2Ds";

        manager.addMapArray(arrayMapSamplerName, [arrayMap11, arrayMap12]);
    }

    function stubAllTypeMaps(stubFunc){
        [
         twoDTexture,compressedTexture,proceduralTexture,cubemapTexture,twoDShadowMap,cubemapShadowMap,
            arrayMap11, arrayMap12
        ]
            .forEach(function(texture){
                stubFunc(texture);
            })
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        Manager = wd.MapManager;
        manager = Manager.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("addMap", function(){
        function getMap(index){
            return manager.getMapList().getChild(index);
        }

        it("test add common texture asset", function(){
            var asset = wd.ImageTextureAsset.create({});
            asset.format = wd.ETextureFormat.RGBA;

            manager.addMap(asset);

            expect(getMap(0)).toBeInstanceOf(wd.ImageTexture);
            expect(getMap(0).format).toEqual(asset.format);
        });
        it("test add compressed texture asset", function(){
            var asset = wd.CompressedTextureAsset.create({});
            asset.format = wd.ETextureFormat.RGBA;

            manager.addMap(asset);

            expect(getMap(0)).toBeInstanceOf(wd.CompressedTexture);
            expect(getMap(0).format).toEqual(asset.format);
        });
        it("test add common texture and compressed texture", function(){
            var asset1 = wd.ImageTextureAsset.create({});
            var asset2 = wd.CompressedTextureAsset.create({});
            var twoDTexture = wd.ImageTexture.create(asset1);
            var compressedTexture = wd.CompressedTexture.create(asset2);

            manager.addMap(twoDTexture);
            manager.addMap(compressedTexture);

            expect(getMap(0)).toBeInstanceOf(wd.ImageTexture);
            expect(getMap(1)).toBeInstanceOf(wd.CompressedTexture);
        });
    });

    it("set env map", function(){
        var asset = {
            asset: wd.CompressedTextureAsset.create({})
        };
        var texture1 = wd.CubemapTexture.create(
            [asset,asset, asset, asset, asset, asset ]
        );
        var texture2 = wd.CubemapTexture.create(
            [asset,asset, asset, asset, asset, asset ]
        );

        manager.setEnvMap(texture1);
        manager.setEnvMap(texture2);

        expect(manager.getEnvMap()).toEqual(texture2);
    });

    describe("dispose", function(){
        it("dispose all textures, clear container", function(){
            addAllTypeMaps();
            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "dispose");
            })

            manager.dispose();

            expect(twoDTexture.dispose).toCalledOnce();
            expect(compressedTexture.dispose).toCalledOnce();
            expect(proceduralTexture.dispose).toCalledOnce();
            expect(cubemapTexture.dispose).toCalledOnce();
            expect(twoDShadowMap.dispose).toCalledOnce();
            expect(cubemapShadowMap.dispose).toCalledOnce();
            expect(arrayMap11.dispose).toCalledOnce();
            expect(arrayMap12.dispose).toCalledOnce();
            expect(manager._getAllMaps().length).toEqual(0);
        });
    });

    describe("getMapList", function(){
        beforeEach(function(){
        });

        it("get BasicTexture and ProceduralTexture", function(){
            addAllTypeMaps();

            var list = manager.getMapList();

            expect(list.getCount()).toEqual(3);
            expect(list.getChildren()).toEqual([twoDTexture, compressedTexture, proceduralTexture]);
        });
        it("if no maps, return empty list", function () {
            var list = manager.getMapList();

            expect(list.getCount()).toEqual(0);
        });

    });

    describe("getMapCount", function(){
        beforeEach(function(){

        });

        it("get count of maps except reflectionMap and envMap", function(){
            addAllTypeMaps();

            expect(manager.getMapCount()).toEqual(3);
        });
    });

    describe("test cache", function(){
        function judge(testMethodName, spyFunc, expectFunc){
            describe("test cache", function(){
                var texture;

                beforeEach(function(){
                    spyFunc();
                    texture = wd.ImageTexture.create({});

                    manager.addMap(texture);
                });

                it("if cached, return cached data", function(){
                    var list1 = manager[testMethodName]();
                    var list2 = manager[testMethodName]();

                    expect(list1 === list2).toBeTruthy();
                    expect(expectFunc()).toCalledOnce();
                });

                describe("if texture dirty, not cache", function(){
                    beforeEach(function(){

                    });

                    it("addMap make texture dirty", function(){
                        var texture2 = wd.ImageTexture.create({});
                        var list1 = manager[testMethodName]();

                        manager.addMap(texture2);

                        var list2 = manager[testMethodName]();

                        expect(expectFunc()).toCalledTwice();
                    });
                    it("addMapArray make texture dirty", function(){
                        var texture1 = wd.ImageTexture.create({a:1});
                        var texture2 = wd.ImageTexture.create({});
                        var list1 = manager[testMethodName]();

                        manager.addMapArray("u_layerSampler2Ds", [texture1,texture2]);

                        var list2 = manager[testMethodName]();

                        expect(expectFunc()).toCalledTwice();
                    });
                    it("addTwoDShadowMap make texture dirty", function(){
                        var texture2 = wd.TwoDShadowMapTexture.create();
                        var list1 = manager[testMethodName]();

                        manager.addTwoDShadowMap(texture2);

                        var list2 = manager[testMethodName]();

                        expect(expectFunc()).toCalledTwice();
                    });
                    it("removeAllChildren make texture dirty", function(){
                        var list1 = manager[testMethodName]();

                        manager.removeAllChildren();

                        var list2 = manager[testMethodName]();

                        expect(expectFunc()).toCalledTwice();
                    });
                    it("set empty envMap make texture dirty", function(){
                        var list1 = manager[testMethodName]();

                        manager.setEnvMap(null);

                        var list2 = manager[testMethodName]();

                        expect(expectFunc()).toCalledTwice();
                    });
                });
            });
        }

        beforeEach(function(){
        });

        judge("_getAllMaps", function(){
            sandbox.spy(manager, "_getAllSingleMaps");
        }, function(){
            return manager._getAllSingleMaps;
        });

        judge("_getAllSingleMaps", function(){
            sandbox.spy(manager._commonMapController, "getAllMapArr");
        }, function(){
            return manager._commonMapController.getAllMapArr;
        });
    });

    describe("_getAllMaps", function(){
        beforeEach(function(){
        });

        describe("test cache", function(){
            var texture;

            function judgeIsCached(){
                expect(manager._getAllSingleMaps).toCalledOnce();
            }

            function judgeIsNotCached(){
                expect(manager._getAllSingleMaps).toCalledTwice();
            }

            beforeEach(function(){
                sandbox.spy(manager, "_getAllSingleMaps");
                texture = wd.ImageTexture.create({});

                manager.addMap(texture);
            });

            it("if cached, return cached data", function(){
                var list1 = manager._getAllMaps();
                var list2 = manager._getAllMaps();

                expect(list1 === list2).toBeTruthy();
                judgeIsCached();
            });

            describe("if texture dirty, not cache", function(){
                beforeEach(function(){

                });

                it("addMap make texture dirty", function(){
                    var texture2 = wd.ImageTexture.create({});
                    var list1 = manager._getAllMaps();

                    manager.addMap(texture2);

                    var list2 = manager._getAllMaps();

                    judgeIsNotCached();
                });
                it("addTwoDShadowMap make texture dirty", function(){
                    var texture2 = wd.TwoDShadowMapTexture.create();
                    var list1 = manager._getAllMaps();

                    manager.addTwoDShadowMap(texture2);

                    var list2 = manager._getAllMaps();

                    judgeIsNotCached();
                });
                it("removeAllChildren make texture dirty", function(){
                    var list1 = manager._getAllMaps();

                    manager.removeAllChildren();

                    var list2 = manager._getAllMaps();

                    judgeIsNotCached();
                });
                it("set empty envMap make texture dirty", function(){
                    var list1 = manager._getAllMaps();

                    manager.setEnvMap(null);

                    var list2 = manager._getAllMaps();

                    judgeIsNotCached();
                });
            });
        });
    });

    describe("sendData", function(){
        var program;
        var samplerName;

        beforeEach(function(){
            program = new wd.Program();
            var shader = wd.CommonShader.create();
            program.initWithShader(shader);

            samplerName = "u_sampler";

            addAllTypeMaps();

            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "sendData");

                sandbox.stub(texture, "getSamplerName").returns(samplerName);
            });
        });

        it("if has duplicate maps(the ones has the same samplerName), contract error", function () {
            testTool.openContractCheck(sandbox);

            var mirrorTexture2 = wd.MirrorTexture.create();
            manager.addMap(mirrorTexture2, {
                samplerVariableName: wd.VariableNameTable.getVariableName("reflectionMap")
            });

            expect(function(){
                manager.sendData(program);
            }).toThrow();
        });

        it("send single textures data", function(){
            manager.sendData(program);

            expect(twoDShadowMap.sendData).toCalledWith(program, samplerName, 0);
            expect(cubemapShadowMap.sendData).toCalledWith(program, samplerName, 5);

            expect(cubemapTexture.sendData).toCalledWith(program, samplerName, 1);
            expect(twoDTexture.sendData).toCalledWith(program, samplerName, 2);
            expect(compressedTexture.sendData).toCalledWith(program, samplerName, 3);
            expect(proceduralTexture.sendData).toCalledWith(program, samplerName, 4);
        });
        it("send array textures data", function(){
            sandbox.stub(program, "sendUniformData");

            manager.sendData(program);

            expect(program.sendUniformData).toCalledOnce();
            expect(program.sendUniformData).toCalledWith(arrayMapSamplerName + "[0]", wd.EVariableType.SAMPLER_ARRAY, [6, 7]);
        });
    });

    describe("bindAndUpdate", function () {
        var program;

        beforeEach(function(){
            testTool.openContractCheck(sandbox);

            addAllTypeMaps();
            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "bindToUnit");
            });
            program = wd.Program.create();
            sandbox.stub(program, "getUniformLocation").returns(1);
        });

        it("bind texture every frame", function () {
            manager.bindAndUpdate();
            manager.sendData(program);

            manager.bindAndUpdate();
            manager.sendData(program);


            expect(twoDTexture.bindToUnit).toCalledTwice();
            expect(twoDShadowMap.bindToUnit).toCalledTwice();
            expect(cubemapShadowMap.bindToUnit).toCalledTwice();
            expect(cubemapTexture.bindToUnit).toCalledTwice();
            expect(proceduralTexture.bindToUnit).toCalledTwice();
        });
        it("bind texture only one time in one frame", function () {
            manager.bindAndUpdate();
            manager.sendData(program);

            expect(twoDTexture.bindToUnit).toCalledOnce();
            expect(twoDShadowMap.bindToUnit).toCalledOnce();
            expect(cubemapShadowMap.bindToUnit).toCalledOnce();
            expect(cubemapTexture.bindToUnit).toCalledOnce();
            expect(proceduralTexture.bindToUnit).toCalledOnce();
        });
        it("bind texture, then update texture, then bind and update the next one", function () {
            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "update");
            });

            manager.bindAndUpdate();


            expect(twoDTexture.bindToUnit).toCalledBefore(twoDTexture.update);
            expect(twoDTexture.update).toCalledBefore(compressedTexture.bindToUnit);
            expect(compressedTexture.bindToUnit).toCalledBefore(compressedTexture.update);
        });
    });
    
    describe("removeAllChildren", function(){
        it("remove all maps", function(){
            addAllTypeMaps();

            manager.removeAllChildren();

            expect(manager._getAllMaps().length).toEqual(0);
        });
    });
});

