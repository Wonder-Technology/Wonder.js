var PointLightSystemTool= YYC.AClass(PointLightSystemToolBase, {
    Public: {
        getData:function () {
            return wd.WebGL1PointLightData;
        }
    }
});

var pointLightSystemTool = new PointLightSystemTool();
