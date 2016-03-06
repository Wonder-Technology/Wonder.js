describe("CustomProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.CustomProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function(){
        it("add CustomProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.CustomProceduralRenderTargetRenderer));
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
});

