describe("MapManager", function() {
    var sandbox = null;
    var Manager = null;
    var manager = null;
    var gl;

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
        it("test add common texture asset", function(){
            var asset = wd.ImageTextureAsset.create({});
            asset.format = wd.ETextureFormat.RGBA;

            manager.addMap(asset);

            expect(manager.getMap(0)).toBeInstanceOf(wd.ImageTexture);
            expect(manager.getMap(0).format).toEqual(asset.format);
        });
        it("test add compressed texture asset", function(){
            var asset = wd.CompressedTextureAsset.create({});
            asset.format = wd.ETextureFormat.RGBA;

            manager.addMap(asset);

            expect(manager.getMap(0)).toBeInstanceOf(wd.CompressedTexture);
            expect(manager.getMap(0).format).toEqual(asset.format);
        });
        it("test add common texture and compressed texture", function(){
            var asset1 = wd.ImageTextureAsset.create({});
            var asset2 = wd.CompressedTextureAsset.create({});
            var twoTexture = wd.ImageTexture.create(asset1);
            var compressedTexture = wd.CompressedTexture.create(asset2);

            manager.addMap(twoTexture);
            manager.addMap(compressedTexture);

            expect(manager.getMap(0)).toBeInstanceOf(wd.ImageTexture);
            expect(manager.getMap(1)).toBeInstanceOf(wd.CompressedTexture);
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
            var asset = {
                asset: wd.CompressedTextureAsset.create({})
            };
            var texture1 = wd.CubemapTexture.create(
                [asset,asset, asset, asset, asset, asset ]
            );
            manager.setEnvMap(texture1);

            var asset1 = wd.ImageTextureAsset.create({});
            var asset2 = wd.CompressedTextureAsset.create({});
            var twoTexture = wd.ImageTexture.create(asset1);
            var compressedTexture = wd.CompressedTexture.create(asset2);

            manager.addMap(twoTexture);
            manager.addMap(compressedTexture);

            sandbox.stub(texture1, "dispose");
            sandbox.stub(twoTexture, "dispose");
            sandbox.stub(compressedTexture, "dispose");

            manager.dispose();

            expect(texture1.dispose).toCalledOnce();
            expect(twoTexture.dispose).toCalledOnce();
            expect(compressedTexture.dispose).toCalledOnce();
            expect(manager._textures.getCount()).toEqual(0);
        });
    });
    
    describe("sendData", function(){
        var diffuseMap,
            twoDMap,
            twoDShadowMap,
            cubemapShadowMap;
        var program;

        beforeEach(function(){
            diffuseMap = new wd.CompressedTexture();
            manager.addMap(diffuseMap, {
                samplerVariableName: "diffuseSampler"
            });

            twoDMap = wd.ImageTexture.create();
            manager.addMap(twoDMap);

            twoDShadowMap = wd.TwoDShadowMapTexture.create();
            manager.addMap(twoDShadowMap, {
                samplerData: 0
            });

            cubemapShadowMap = wd.CubemapShadowMapTexture.create();
            manager.addMap(cubemapShadowMap, {
                samplerData: 1
            });

            manager._getMapList().forEach(function(texture){
                sandbox.stub(texture, "bindToUnit");
                sandbox.stub(texture, "sendData");
            });


            program = new wd.Program();

            gl.getUniformLocation.returns(null);
        });
        
        it("if sampler is not in glsl, return", function(){
            manager.sendData(program);

            expect(diffuseMap.bindToUnit).not.toCalled();
        });

        describe("else", function(){
            var pos1 = 100,
                pos2 = 200,
                pos3 = 300,
                pos4 = 400;

            beforeEach(function(){
                gl.getUniformLocation.onCall(0).returns(pos1);
                gl.getUniformLocation.onCall(1).returns(pos2);
                gl.getUniformLocation.onCall(2).returns(pos3);
                gl.getUniformLocation.onCall(3).returns(pos4);
            });

            it("bind texture", function(){
                manager.sendData(program);

                expect(diffuseMap.bindToUnit).toCalledWith(0);
                expect(twoDMap.bindToUnit).toCalledWith(1);
                expect(twoDShadowMap.bindToUnit).toCalledWith(2);
                expect(cubemapShadowMap.bindToUnit).toCalledWith(3);
            });
            it("send texture data", function(){
                manager.sendData(program);

                expect(diffuseMap.sendData).toCalledWith(program);
                expect(twoDMap.bindToUnit).toCalledWith(1);
                expect(twoDShadowMap.bindToUnit).toCalledWith(2);
                expect(cubemapShadowMap.bindToUnit).toCalledWith(3);
            });
        });
    });
});
