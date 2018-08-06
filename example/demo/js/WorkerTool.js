var DemoWorkerTool = (function () {
    return {
        getOrCreateCustomData: function (customData) {
            return customData === -1 ? {} : customData;
        }
    }
})()