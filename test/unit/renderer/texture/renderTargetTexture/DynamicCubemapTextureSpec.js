describe("DynamicCubemapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var gl;

    function setGeometry(texture, geometry){
        texture.material = {
            geometry: geometry
        };
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.DynamicCubemapTexture;
        texture = new Texture();

        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        testTool.extend(dy.DeviceManager.getInstance().gl, {
            TEXTURE_CUBE_MAP_POSITIVE_X:0,
            TEXTURE_CUBE_MAP_NEGATIVE_X:1,
            TEXTURE_CUBE_MAP_POSITIVE_Y:2,
            TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
            TEXTURE_CUBE_MAP_POSITIVE_Z:4,
            TEXTURE_CUBE_MAP_NEGATIVE_Z:5
        });

        gl = dy.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("sendData", function(){
        it("send cube sampler", function(){
            var program = {
                sendUniformData: sandbox.stub()
            };
            sandbox.stub(texture, "sendSamplerVariable");

            texture.sendData(program, 0);

            expect(texture.sendSamplerVariable).toCalledWith(dy.VariableType.SAMPLER_CUBE, program, 0);
        });
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
        it("return webglTexture", function(){
            expect(texture.createEmptyTexture()).toEqual(glTexture);
        });
    });
});

