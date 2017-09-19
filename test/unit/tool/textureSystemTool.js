var TextureSystemTool = YYC.Class({
    Public: {
        getIsNeedUpdate:wd.getTextureIsNeedUpdate,
        setIsNeedUpdate:wd.setTextureIsNeedUpdate,

        isNeedUpdate: function (texture) {
            return wd.TextureData.isNeedUpdates[texture.index] === 0;
        }
    }
});

var textureSystemTool = new TextureSystemTool();

YYC.Tool.extend.extend(textureSystemTool, textureTool);
