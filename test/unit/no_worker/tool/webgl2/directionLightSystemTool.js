var DirectionLightSystemTool= YYC.AClass(DirectionLightSystemToolBase, {
    Public: {
        getData:function () {
            return wd.WebGL2DirectionLightData;
        }
    }
});

var directionLightSystemTool = new DirectionLightSystemTool();
