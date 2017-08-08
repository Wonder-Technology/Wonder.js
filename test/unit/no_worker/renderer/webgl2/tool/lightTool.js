var lightTool = (function () {
    return {
        resetData: function(){
            wd.initLightData(wd.AmbientLightData, wd.DirectionLightData, wd.WebGL2PointLightData);
        },
    }
}());

