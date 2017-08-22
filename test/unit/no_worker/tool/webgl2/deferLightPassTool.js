var deferLightPassTool = (function () {
    return {
        resetData: function () {
            return wd.initDeferLightPassData(wd.DeferDirectionLightPassData, wd.DeferPointLightPassData);
        }
    }
})();
