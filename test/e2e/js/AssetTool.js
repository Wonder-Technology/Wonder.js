var AssetTool = (function () {
    return {
        load: function (jsonPathArr, nextFunc, completeFunc) {
            return wd.load(jsonPathArr).forEach(function (state) {
                if (!!nextFunc) {
                    nextFunc(state)
                }
            }).then(function () {
                if (!!completeFunc) {
                    return completeFunc()
                }
            })
        }
        // TODO add loadImage
    }
})()