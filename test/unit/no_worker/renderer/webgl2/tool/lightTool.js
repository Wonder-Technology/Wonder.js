var lightTool = (function () {
    return {
        resetData: function(){
            wd.initWebGL2LightData(wd.AmbientLightData, wd.WebGL2DirectionLightData, wd.WebGL2PointLightData);
        }
    }
}());

