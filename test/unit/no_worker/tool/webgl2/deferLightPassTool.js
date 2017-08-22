var deferLightPassTool = (function () {
    return {
        resetData: function () {
            return wd.initDeferLightPassData(wd.DeferAmbientLightPassData, wd.DeferDirectionLightPassData, wd.DeferPointLightPassData);
        }
    }
})();
