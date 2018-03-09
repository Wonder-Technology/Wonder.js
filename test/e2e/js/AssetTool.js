var AssetTool = (function () {
    return {
        load: function (dataDir, nextFunc, completeFunc) {
            return wd.load(dataDir).forEach(function (state) {
                if (!!nextFunc) {
                    nextFunc(state)
                }
            }).then(function () {
                if (!!completeFunc) {
                    completeFunc()
                }
            })
        }
    }
})()