var AssetSystemTool = YYC.Class({
    Public: {
        get:function (id) {
            return wd.getAsset(id);
        }
    }
});

var assetSystemTool = new AssetSystemTool();

YYC.Tool.extend.extend(assetSystemTool, assetTool);
