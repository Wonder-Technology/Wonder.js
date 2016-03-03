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

    describe("getProceduralMap", function(){
        beforeEach(function(){
        });

        it("get first procedural map", function(){
            var proceduralTexture = wd.MarbleProceduralTexture.create();
            manager.addMap(proceduralTexture);

            expect(manager.getProceduralMap()).toEqual(proceduralTexture);
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

    describe("_getAllMapArr", function(){
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
                var list1 = manager._getAllMapArr();
                var list2 = manager._getAllMapArr();

                expect(list1 === list2).toBeTruthy();
                expect(manager._mapTable.toArray).toCalledOnce();
            });

            describe("if texture dirty, not cache", function(){
                beforeEach(function(){

                });

                it("addMap make texture dirty", function(){
                    var texture2 = wd.ImageTexture.create({});
                    var list1 = manager._getAllMapArr();

                    manager.addMap(texture2);

                    var list2 = manager._getAllMapArr();

                    expect(manager._mapTable.toArray).toCalledTwice();
                });
                it("removeAllChildren make texture dirty", function(){
                    var list1 = manager._getAllMapArr();

                    manager.removeAllChildren();

                    var list2 = manager._getAllMapArr();

                    expect(manager._mapTable.toArray).toCalledTwice();
                });
                it("set empty envMap make texture dirty", function(){
                    var list1 = manager._getAllMapArr();

                    manager.setEnvMap(null);

                    var list2 = manager._getAllMapArr();

                    expect(manager._mapTable.toArray).toCalledTwice();
                });
            });
        });
    });
    
    describe("update", function(){
        beforeEach(function(){
            addAllTypeMaps();
        });

        it("update twoDTexture,compressTexture,envMap", function () {
            sandbox.stub(twoDTexture, "update");
            sandbox.stub(compressedTexture, "update");
            sandbox.stub(cubemapTexture, "update");

            manager.update();

            expect(twoDTexture.update).toCalledOnce();
            expect(compressedTexture.update).toCalledOnce();
            expect(cubemapTexture.update).toCalledOnce();
        });
        it("not update proceduralMap,mirrorMap,shadowMap", function(){
            proceduralTexture.update = sandbox.stub();
            mirrorTexture.update = sandbox.stub();
            twoDShadowMap.update = sandbox.stub();
            cubemapShadowMap.update = sandbox.stub();

            manager.update();

            expect(proceduralTexture.update).not.toCalled();
            expect(mirrorTexture.update).not.toCalled();
            expect(twoDShadowMap.update).not.toCalled();
            expect(cubemapShadowMap.update).not.toCalled();
        });
    });
    
    describe("sendData", function(){
        var program;

        beforeEach(function(){
            program = new wd.Program();
            var shader = wd.CommonShader.create();
            program.initWithShader(shader);
        });

        it("if count of maps is 1, bind texture and not send texture data", function () {
            var map = new wd.ImageTexture();
            sandbox.stub(map, "bindToUnit");
            sandbox.stub(map, "sendData");
            manager.addMap(map)

            manager.sendData(program);

            expect(map.bindToUnit).toCalledWith(0);
            expect(map.sendData).not.toCalled();
        });

        describe("else", function(){
            beforeEach(function(){
                addAllTypeMaps();

                stubAllTypeMaps(function(texture){
                    sandbox.stub(texture, "bindToUnit");
                    sandbox.stub(texture, "sendData");
                })
            });

            it("if sampler is not in glsl, return", function(){
                gl.getUniformLocation.returns(null);

                manager.sendData(program);

                expect(twoDTexture.bindToUnit).not.toCalled();
            });

            describe("else", function(){
                var pos1 = 100,
                    pos2 = 200,
                    pos3 = 300,
                    pos4 = 400,
                    pos5 = 500,
                    pos6 = 600,
                    pos7 = 700;

                beforeEach(function(){
                    gl.getUniformLocation.onCall(0).returns(pos1);
                    gl.getUniformLocation.onCall(1).returns(pos2);
                    gl.getUniformLocation.onCall(2).returns(pos3);
                    gl.getUniformLocation.onCall(3).returns(pos4);
                    gl.getUniformLocation.onCall(4).returns(pos5);
                    gl.getUniformLocation.onCall(5).returns(pos6);
                    gl.getUniformLocation.onCall(6).returns(pos7);
                });

                it("bind texture", function(){
                    manager.sendData(program);

                    expect(twoDTexture.bindToUnit).toCalledWith(0);
                    expect(compressedTexture.bindToUnit).toCalledWith(1);
                        expect(proceduralTexture.bindToUnit).toCalledWith(2);
                        expect(mirrorTexture.bindToUnit).toCalledWith(3);
                        expect(twoDShadowMap.bindToUnit).toCalledWith(4);
                        expect(cubemapShadowMap.bindToUnit).toCalledWith(5);
                    expect(cubemapTexture.bindToUnit).toCalledWith(6);
                });
                it("send texture data", function(){
                    manager.sendData(program);

                    expect(twoDTexture.sendData).toCalledWith(program, pos1, 0);
                    expect(compressedTexture.sendData).toCalledWith(program, pos2, 1);
                    expect(proceduralTexture.sendData).toCalledWith(program, pos3, 2);
                    expect(mirrorTexture.sendData).toCalledWith(program, pos4, 3);
                    expect(twoDShadowMap.sendData).toCalledWith(program, pos5, 4);
                    expect(cubemapShadowMap.sendData).toCalledWith(program, pos6, 5);
                    expect(cubemapTexture.sendData).toCalledWith(program, pos7, 6);
                });
            });
        });
    });
});
