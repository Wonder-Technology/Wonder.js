var TextureSystemTool = YYC.Class({
    Public: {
        getIsNeedUpdate:wd.getTextureIsNeedUpdate,
        setIsNeedUpdate:wd.setTextureIsNeedUpdate,

        isNeedUpdate: function (texture) {
            return wd.TextureData.isNeedUpdates[texture.index] === 0;
        },
        createTexture: function (source) {
            var texture = textureTool.create();

            if(!!source){
                textureSystemTool.setSource(texture, source);
            }

            return texture;
        },
        getImageData: function (source, width, height) {
            return wd.getImageData(source, width, height, wd.DomQuery);
        },
        prepareSendData: function (gl, name, pos) {
            var pos = pos !== undefined ? pos : 0,
                name = name || "u_sampler2D";

            gl.getUniformLocation.withArgs(sinon.match.any, name).returns(pos);
        }
    }
});

var textureSystemTool = new TextureSystemTool();

YYC.Tool.extend.extend(textureSystemTool, textureTool);
