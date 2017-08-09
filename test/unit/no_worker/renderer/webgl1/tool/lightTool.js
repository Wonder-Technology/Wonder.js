var lightTool = (function () {
    return {
        resetData: function(){
            wd.initWebGL1LightData(wd.AmbientLightData, wd.DirectionLightData, wd.WebGL1PointLightData);
        }
    }
}());

