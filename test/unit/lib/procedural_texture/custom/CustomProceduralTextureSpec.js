describe("CustomProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        texture = new wd.CustomProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function () {
    });


    describe("init", function() {
        it("add CustomProceduralRenderTargetRenderer to scene", function () {
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.CustomProceduralRenderTargetRenderer));
        });
        it("create mapManager->textures->glTexture", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            texture.mapManager.addMap(wd.ImageTexture.create({}));

            texture.init();

            expect(gl.createTexture).toCalledOnce();
        });
    });

    describe("getSamplerName", function(){
        it("get sampler name by unit index", function(){
            expect(texture.getSamplerName(0)).toEqual("u_sampler2D0");
            expect(texture.getSamplerName(1)).toEqual("u_sampler2D1");
        });
    });
    
    describe("read", function(){
        var shaderConfig, shaderConfigId;
        var map;

        beforeEach(function(){
            shaderConfigId = "id";

            shaderConfig = {
                "uniforms": {
                    "u_dirtAmplifier": {
                        "type": "FLOAT_1",
                        "value": "6.0"
                    },
                    "u_dirtSampler": {
                        "type": "SAMPLER_2D",
                        "textureId": "dirt"
                    }
                },
                "fsSourceId": "fs"
            };


            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            wd.LoaderManager.getInstance().get.withArgs(shaderConfigId).returns(shaderConfig);


            map = new wd.ImageTexture();

            wd.LoaderManager.getInstance().get.withArgs("dirt").returns(map);
        });
        
        it("read fs source", function(){
            var fsSource = "void main(){};";
            wd.LoaderManager.getInstance().get.withArgs("fs").returns(fsSource);

            texture.read(shaderConfigId);

            expect(texture.fsSource).toEqual(fsSource);
        });

        describe("read renderRate", function () {
            it("the default value should be 0", function(){
                texture.read(shaderConfigId);

                expect(texture.renderRate).toEqual(0);
            });
            it("test read", function () {
                var renderRate = 2;
                shaderConfig.renderRate = renderRate;

                texture.read(shaderConfigId);

                expect(texture.renderRate).toEqual(renderRate);
            });
        });

        it("add correspond maps of sampler2D uniform data", function () {
            sandbox.stub(texture.mapManager, "addMap");

            texture.read(shaderConfigId);

            expect(texture.mapManager.addMap).toCalledWith(map, {
                samplerVariableName: "u_dirtSampler"
            });
        });
        it("save other uniform data", function () {
            texture.read(shaderConfigId);

            expect(texture.uniformMap.getChildren()).toEqual({
                "u_dirtAmplifier": {
                    "type": "FLOAT_1",
                    "value": "6.0"
                }
            });
        });
    });

    describe("clone", function(){
        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        });

        it("shallow clone uniformMap", function () {
            var shaderData ={
                type:wd.EVariableType.FLOAT_1,
                value:0.2,
                textureId:"textureId"
            };
            var uniformMap = wdCb.Hash.create({
                "u_a": shaderData
            });

            cloneTool.extend(texture, {
uniformMap:uniformMap
            });

            var result = texture.clone();

            expect(result.uniformMap === texture.uniformMap).toBeFalsy();
            expect(result.uniformMap.getChild("u_a")).toEqual(shaderData);
        });
        it("clone maps", function () {
            var map1 = wd.ImageTexture.create({});
            var resultMap1 = wd.ImageTexture.create({b:1});
            sandbox.stub(map1, "clone").returns(resultMap1);


            var map2 = wd.ImageTexture.create({a:1});
            var resultMap2 = wd.ImageTexture.create({b:2});
            sandbox.stub(map2, "clone").returns(resultMap2);


            texture.mapManager.addMap(map1);
            texture.mapManager.addMap(map2);


            var result = texture.clone();

            expect(result.mapManager === texture.mapManager).toBeFalsy();
            expect(result.mapManager.getMapList().getChildren()).toEqual([resultMap1, resultMap2]);
        });
        it("clone data", function () {
            var fsSource = "aaa",
                isAnimate = true;

            cloneTool.extend(texture, {
                fsSource: fsSource,
                isAnimate: isAnimate
            });

            var result = texture.clone();

            expect(result.fsSource).toEqual(fsSource);
        });
    })
});

