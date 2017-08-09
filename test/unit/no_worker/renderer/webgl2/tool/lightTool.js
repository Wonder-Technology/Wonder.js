var lightTool = (function () {
    return {
        resetData: function(){
            wd.initWebGL2LightData(wd.AmbientLightData, wd.DirectionLightData, wd.WebGL2PointLightData);
        },
    }
}());

