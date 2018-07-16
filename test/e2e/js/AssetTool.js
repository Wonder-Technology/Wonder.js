var AssetTool = (function () {
    return {
        loadConfig: function (jsonPathArr, nextFunc, completeFunc) {
            return wd.loadConfig(jsonPathArr).forEach(function (state) {
                if (!!nextFunc) {
                    nextFunc(state)
                }
            }).then(function () {
                if (!!completeFunc) {
                    return completeFunc()
                }
            })
        },

        loadWDB: function (wdbPath, state, testFunc) {
            return wd.loadWDB(wdbPath, state).forEach(function ([state, gameObject]) {
                testFunc([state, gameObject])
            })
            // .then(function () {
            //     if (!!completeFunc) {
            //         return completeFunc()
            //     }
            // })
        },
        loadGLB: function (glbPath) {
            return window.fetch(glbPath)
                .then((response) => response.arrayBuffer())
        }
    }
})()