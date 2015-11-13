describe("BasicTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var mapManager = null;
    var director = null;
    var gl = null;

    function buildTexture() {
        var texture = new Texture();

        texture.allocateSourceToTexture = sandbox.stub();

        return texture;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.BasicTexture;
        texture = buildTexture();
        mapManager = dy.MapManager.create();
        director = dy.Director.getInstance();
        gl = {
            TEXTURE_2D: "TEXTURE_2D",
            TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
            TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
            TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
            TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",
            RGB: "RGB",
            RGBA: "RGBA",
            UNSIGNED_BYTE: "UNSIGNED_BYTE",

            TEXTURE0: "TEXTURE0",
            TEXTURE1: "TEXTURE1",

            REPEAT: "REPEAT",
            MIRRORED_REPEAT: "MIRRORED_REPEAT",
            CLAMP_TO_EDGE: "CLAMP_TO_EDGE",

            NEAREST: "NEAREST",
            NEAREST_MIPMAP_MEAREST: "NEAREST_MIPMAP_MEAREST",
            NEAREST_MIPMAP_LINEAR: "NEAREST_MIPMAP_LINEAR",
            LINEAR: "LINEAR",
            LINEAR_MIPMAP_NEAREST: "LINEAR_MIPMAP_NEAREST",
            LINEAR_MIPMAP_LINEAR: "LINEAR_MIPMAP_LINEAR",

            bindTexture: sandbox.stub(),
            activeTexture: sandbox.stub(),
            texImage2D: sandbox.stub(),
            compressedTexImage2D: sandbox.stub(),
            pixelStorei: sandbox.stub(),
            texParameteri: sandbox.stub(),
            texParameterf: sandbox.stub(),
            generateMipmap: sandbox.stub()
        };
        testTool.extend(gl, testTool.buildFakeGl(sandbox));
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });


    describe("sendData", function(){
        var program = null;

        beforeEach(function(){
            program = {
                sendUniformData:sandbox.stub()
            };
        });

        it("send texture unit index", function(){
            texture.sendData(program, 100, 1);

            expect(program.sendUniformData.firstCall).toCalledWith(100, dy.VariableType.SAMPLER_2D, 1);
        });

        describe("if sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL", function(){
            beforeEach(function(){
                texture.width = 100;
                texture.height = 100;

                texture.sourceRegionMethod = dy.TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            });

            it("if sourceRegion is based on canvas coordinate system, convert it to webgl coordinate stystem", function(){
                texture.sourceRegionMapping = dy.TextureSourceRegionMapping.CANVAS;
                texture.sourceRegion = dy.RectRegion.create(10, 20, 50, 40);

                texture.sendData(program, 0);

                expect(testTool.getValues(program.sendUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.4, 0.5, 0.4 )));
            });
            it("else, directly set it", function(){
                texture.sourceRegionMapping = dy.TextureSourceRegionMapping.UV;
                texture.sourceRegion = dy.RectRegion.create(0.1, 0.1, 0.5, 0.6);

                texture.sendData(program, 0);

                expect(testTool.getValues(texture.sourceRegion)).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.1, 0.5, 0.6)));

            });
        });
    });

    describe("update", function(){
        beforeEach(function(){
            sandbox.stub(texture, "bindToUnit");
            sandbox.stub(dy.GPUDetector, "getInstance").returns({
                maxTextureSize: 50
            });
        });

        it("bind texture unit and active it", function(){
            texture.update(0);

            expect(texture.bindToUnit).toCalledWith(0);
        });
        it("if source's size exceed max size, then make souce to be canvas and scale the canvas", function(){
            texture.source = new Image();
            texture.source.width = 50;
            texture.source.height = 100;

            texture.update(0);

            expect(texture.source.width).toEqual(25);
            expect(texture.source.height).toEqual(50);
        });
        //todo complete the test
    });
});

