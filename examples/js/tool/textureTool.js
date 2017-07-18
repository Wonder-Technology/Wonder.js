var textureTool = (function () {
    return {
        create:wd.createTexture,
        dispose:wd.disposeTexture,
        getSource:wd.getTextureSource,
        setSource:wd.setTextureSource,
        getWidth:wd.getTextureWidth,
        setWidth:wd.setTextureWidth,
        getHeight:wd.getTextureHeight,
        setHeight:wd.setTextureHeight,
        getIsNeedUpdate:wd.getTextureIsNeedUpdate,
        setIsNeedUpdate:wd.setTextureIsNeedUpdate
    }
})()

