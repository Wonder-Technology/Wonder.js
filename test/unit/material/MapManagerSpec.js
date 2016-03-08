describe("MapManager", function() {
    var sandbox = null;
    var Manager = null;
    var manager = null;
    var gl;

    var asset1,asset2,asset3;
    var twoDTexture,compressedTexture,proceduralTexture,mirrorTexture,cubemapTexture,twoDShadowMap,cubemapShadowMap;

    function addAllTypeMaps(){
        asset1 = wd.ImageTextureAsset.create({});
        asset2 = wd.CompressedTextureAsset.create({});
        twoDTexture = wd.ImageTexture.create(asset1);
        compressedTexture = wd.CompressedTexture.create(asset2);
        manager.addMap(twoDTexture);
        manager.addMap(compressedTexture);

        proceduralTexture = wd.MarbleProceduralTexture.create();
        manager.addMap(proceduralTexture);

        mirrorTexture = wd.MirrorTexture.create();
        manager.setMirrorMap(mirrorTexture);

        asset3 = {
            asset: wd.CompressedTextureAsset.create({})
        };
        cubemapTexture = wd.CubemapTexture.create(
            [asset3,asset3, asset3, asset3, asset3, asset3 ]
        );
        manager.setEnvMap(cubemapTexture);


        twoDShadowMap = wd.TwoDShadowMapTexture.create();
        manager.addMap(twoDShadowMap, {
            samplerData: 0
        });

        cubemapShadowMap = wd.CubemapShadowMapTexture.create();
        manager.addMap(cubemapShadowMap, {
            samplerData: 1
        });
    }

    function stubAllTypeMaps(stubFunc){
        [
         twoDTexture,compressedTexture,proceduralTexture,mirrorTexture,cubemapTexture,twoDShadowMap,cubemapShadowMap
        ]
            .forEach(function(texture){
                stubFunc(texture);
            })
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Manager = wd.MapManager;
        manager = new Manager();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        testTool.clearInstance();
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
            expect(mirrorTexture.dispose).toCalledOnce();
            expect(cubemapTexture.dispose).toCalledOnce();
            expect(twoDShadowMap.dispose).toCalledOnce();
            expect(cubemapShadowMap.dispose).toCalledOnce();
            expect(manager._mapTable.getCount()).toEqual(0);
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

        it("get count of maps except mirrorMap and envMap", function(){
            addAllTypeMaps();

            expect(manager.getMapCount()).toEqual(3);
        });
    });

    describe("_getAllMaps", function(){
        beforeEach(function(){
        });

        describe("test cache", function(){
            var texture;

            beforeEach(function(){
                sandbox.spy(manager._mapTable, "toArray");
                texture = wd.ImageTexture.create({});

                manager.addMap(texture);
            });

            it("if cached, return cached data", function(){
                var list1 = manager._getAllMaps();
                var list2 = manager._getAllMaps();

                expect(list1 === list2).toBeTruthy();
                expect(manager._mapTable.toArray).toCalledOnce();
            });

            describe("if texture dirty, not cache", function(){
                beforeEach(function(){

                });

                it("addMap make texture dirty", function(){
                    var texture2 = wd.ImageTexture.create({});
                    var list1 = manager._getAllMaps();

                    manager.addMap(texture2);

                    var list2 = manager._getAllMaps();

                    expect(manager._mapTable.toArray).toCalledTwice();
                });
                it("removeAllChildren make texture dirty", function(){
                    var list1 = manager._getAllMaps();

                    manager.removeAllChildren();

                    var list2 = manager._getAllMaps();

                    expect(manager._mapTable.toArray).toCalledTwice();
                });
                it("set empty envMap make texture dirty", function(){
                    var list1 = manager._getAllMaps();

                    manager.setEnvMap(null);

                    var list2 = manager._getAllMaps();

                    expect(manager._mapTable.toArray).toCalledTwice();
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

        it("send texture data", function(){
            manager.sendData(program);

            expect(twoDTexture.sendData).toCalledWith(program, samplerName, 0);
            expect(compressedTexture.sendData).toCalledWith(program, samplerName, 1);
            expect(proceduralTexture.sendData).toCalledWith(program, samplerName, 2);
            expect(mirrorTexture.sendData).toCalledWith(program, samplerName, 3);
            expect(twoDShadowMap.sendData).toCalledWith(program, samplerName, 4);
            expect(cubemapShadowMap.sendData).toCalledWith(program, samplerName, 5);
            expect(cubemapTexture.sendData).toCalledWith(program, samplerName, 6);
        });
    });

    describe("bindAndUpdate", function () {
        var program;

        beforeEach(function(){
            addAllTypeMaps();
            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "bindToUnit");
            })
            program = wd.Program.create();
            sandbox.stub(program, "getUniformLocation").returns(1);
        });

        it("bind texture only one time in one frame", function () {
            manager.bindAndUpdate();
            manager.sendData(program);

            expect(twoDTexture.bindToUnit).toCalledOnce();
            expect(cubemapShadowMap.bindToUnit).toCalledOnce();
            expect(cubemapTexture.bindToUnit).toCalledOnce();
            expect(proceduralTexture.bindToUnit).toCalledOnce();
        });
        it("bind texture every frame", function () {
            manager.bindAndUpdate();
            manager.sendData(program);

            manager.bindAndUpdate();
            manager.sendData(program);


            expect(twoDTexture.bindToUnit).toCalledTwice();
            expect(cubemapShadowMap.bindToUnit).toCalledTwice();
            expect(cubemapTexture.bindToUnit).toCalledTwice();
            expect(proceduralTexture.bindToUnit).toCalledTwice();
        });
        it("bind texture, then update texture, then bind and update the next one", function () {
            stubAllTypeMaps(function(texture){
                sandbox.stub(texture, "update");
            })

            manager.bindAndUpdate();


            expect(twoDTexture.bindToUnit).toCalledBefore(twoDTexture.update);
            expect(twoDTexture.update).toCalledBefore(compressedTexture.bindToUnit);
            expect(compressedTexture.bindToUnit).toCalledBefore(compressedTexture.update);
        });
    });
});

