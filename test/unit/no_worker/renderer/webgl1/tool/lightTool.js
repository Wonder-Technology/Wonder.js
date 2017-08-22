var lightTool = (function () {
    return {
        resetData: function(){
            wd.initWebGL1LightData(wd.AmbientLightData, wd.WebGL1DirectionLightData, wd.WebGL1PointLightData);
        },
        isDataNotDirty: function (dirtyValue) {
            return dirtyValue !== 0;
        }
    }
}());

