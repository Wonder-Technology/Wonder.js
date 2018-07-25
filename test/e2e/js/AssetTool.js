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
        loadIMGUIAsset: function (fntFilePath, bitmapFilePath, customTextureSourceDataArr, state, testFunc) {
            return wd.loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, state)
                .then((state) => {
                    return testFunc(state)
                })
        },
        loadGLB: function (glbPath) {
            return window.fetch(glbPath)
                .then((response) => response.arrayBuffer())
        },
        download: function (content, filename, mimeType) {
            var blob = null;

            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';

            if (!!!mimeType || mimeType.length === 0) {
                blob = new Blob([content]);
            }
            else {
                blob = new Blob([content], { type: mimeType });
            }

            eleLink.href = URL.createObjectURL(blob);

            document.body.appendChild(eleLink);
            eleLink.click();

            document.body.removeChild(eleLink);
        }
    }
})()