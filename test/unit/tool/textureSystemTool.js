var TextureSystemTool = YYC.Class({
    Public: {
        getIsNeedUpdate:wd.getTextureIsNeedUpdate,
        setIsNeedUpdate:wd.setTextureIsNeedUpdate
    }
});

var textureSystemTool = new TextureSystemTool();

YYC.Tool.extend.extend(textureSystemTool, textureTool);
