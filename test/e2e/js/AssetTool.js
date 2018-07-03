var AssetTool = (function () {
    return {
        test: function(value){
throw new Error("zzz");
        },
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
        },

        loadWDB: function (wdbPath, testFunc) {
            return wd.loadWDB(wdbPath).forEach(function ([state, gameObject]) {
                testFunc([state, gameObject])
            })
            // .then(function () {
            //     if (!!completeFunc) {
            //         return completeFunc()
            //     }
            // })
        }
    }
})()