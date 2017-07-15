var pointLightTool = (function () {
    return {
        create:wd.createPointLight,
        setColor:wd.setPointLightColor,
        setIntensity:wd.setPointLightIntensity,
        setConstant:wd.setPointLightConstant,
        setQuadratic:wd.setPointLightQuadratic,
        setRange:wd.setPointLightRange,
        setRangeLevel:wd.setPointLightRangeLevel,
        getGameObject:wd.getPointLightGameObject,
        getPosition:wd.getPointLightPosition
    }
})()

