var TextureSystemTool = YYC.Class({
    Public: {
        getIsNeedUpdate:wd.getTextureIsNeedUpdate,
        setIsNeedUpdate:wd.setTextureIsNeedUpdate,

        isNeedUpdate: function (texture) {
            return wd.TextureData.isNeedUpdates[texture.index] === 0;
        },
        getImageData: function (source, width, height) {
            return wd.getImageData(source, width, height, wd.DomQuery);
        }
    }
});

var textureSystemTool = new TextureSystemTool();

YYC.Tool.extend.extend(textureSystemTool, textureTool);
