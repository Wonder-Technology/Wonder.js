describe("DynamicCubemapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.DynamicCubemapTexture;
        texture = new Texture();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        testTool.extend(wd.DeviceManager.getInstance().gl, {
            TEXTURE_CUBE_MAP_POSITIVE_X:0,
            TEXTURE_CUBE_MAP_NEGATIVE_X:1,
            TEXTURE_CUBE_MAP_POSITIVE_Y:2,
            TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
            TEXTURE_CUBE_MAP_POSITIVE_Z:4,
            TEXTURE_CUBE_MAP_NEGATIVE_Z:5
        });

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("createEmptyTexture", function(){
        var glTexture;

        beforeEach(function(){
            glTexture = {};
            gl.createTexture.returns(glTexture);

            sandbox.stub(texture, "setEmptyTexture");
        });

        it("set empty texture", function(){
            texture.createEmptyTexture();

            expect(texture.setEmptyTexture).toCalledWith(glTexture);
        });
        it("create six faces' null source", function(){
            texture.width = 100;
            texture.height = 200;

            texture.createEmptyTexture();

            expect(gl.texImage2D.getCall(0)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(1)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(2)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(3)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(4)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            expect(gl.texImage2D.getCall(5)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, 100, 200, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        });
        it("set glTexture", function(){
            var webGlTexture = {};
            gl.createTexture.returns(webGlTexture);

            texture.createEmptyTexture();

            expect(texture.glTexture).toEqual(webGlTexture);
        });
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                isUniformDataNotExistByLocation: sandbox.stub().returns(false)
            };
        });

        it("send texture sampler", function () {
            var pos1 = 100;
            program.getUniformLocation.onCall(0).returns(pos1);
            texture.mode = wd.EnvMapMode.REFLECTION;
            var material = wd.BasicMaterial.create();
            material.envMap = texture;

            material.mapManager.sendData(program);

            expect(program.getUniformLocation).toCalledWith("u_samplerCube0");
            expect(program.sendUniformData).toCalledWith(pos1, wd.VariableType.SAMPLER_CUBE, 0);
        });
    });
});

