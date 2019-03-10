var AssetTool = (function () {
    function computeLoadingPercent(
        loadedIMGUIByteLength,
        totalByteLength
    ) {
        return loadedIMGUIByteLength >= totalByteLength ? 100 : Math.ceil(loadedIMGUIByteLength / totalByteLength * 100);
    }

    return {
        showOrCreateLoadingInfo: function (
            loadedIMGUIByteLength,
            totalByteLength,
        ) {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;


            document.querySelector("#logo").style.display = "inline";

            var dom = document.querySelector("#loading");


            dom.style.cssText = 'position:absolute;top:' + windowHeight * 0.55 + 'px;left:' + windowWidth * 0.4 + 'px;width:' + windowWidth * (0.6 - 0.4) + 'px;height:50px;font-size:80px; color:bisque; text-align: center;';




            document.querySelector("#text")
                .innerHTML = String(computeLoadingPercent(

                    loadedIMGUIByteLength,
                    totalByteLength
                )) + '%';
        },
        removeLoadingInfo: function () {
            document.querySelector("#loading").remove();
        },
        addChild: function (parentGameObject, childGameObject, state) {
            var parentTransform =
                wd.unsafeGetGameObjectTransformComponent(
                    parentGameObject, state
                );

            var childTransform =
                wd.unsafeGetGameObjectTransformComponent(
                    childGameObject, state
                );

            var state =
                wd.setTransformParentKeepOrder(
                    parentTransform, childTransform, state
                );

            return state;
        },
        addChildren: function (parentGameObject, childGameObjectArr, state) {
            return childGameObjectArr.reduce((state, childGameObject) => {
                return AssetTool.addChild(parentGameObject, childGameObject, state)
            }, state);
        },
        getChildren: function (gameObject, state) {
            return wd.unsafeGetTransformChildren(
                wd.unsafeGetGameObjectTransformComponent(gameObject, state),
                state

            ).map((transform) => {
                return wd.unsafeGetTransformGameObject(transform, state)
            });
        },
        getAllChildren: function (gameObject, state) {
            function _get(result, children, state) {
                return children.reduce((result, child) => {
                    return _get(result, AssetTool.getChildren(child, state), state)

                }, result.concat(children));

            };

            return _get([], AssetTool.getChildren(gameObject, state), state);
        },


        createLightsAndCamera: function (state) {
            var isCreateLight =
                wd.getAllDirectionLightComponents(state).length === 0 && wd.getAllPointLightComponents(state).length === 0;

            var isCreateCamera =
                wd.getAllBasicCameraViewComponents(state).length === 0;

            if (!isCreateLight) {
                return state;
            }


            var state = LightTool.setAmbientLight(state);



            var [state, directionLightObj] = LightTool.createDirectionLight(state);
            var transform = wd.unsafeGetGameObjectTransformComponent(directionLightObj, state);

            var state = wd.setTransformLocalEulerAngles(transform, [45, 180, 0], state);




            // var transform = wd.unsafeGetGameObjectTransformComponent(directionLightObj, state);

            // state = wd.setTransformLocalEulerAngles(transform, [-45, 45, 0], state);



            var light = wd.unsafeGetGameObjectDirectionLightComponent(directionLightObj, state);

            var state = wd.setDirectionLightColor(light, [1.0, 1.0, 1.0], state);




            // var record = LightTool.createPointLight(state);
            // var state = record[0];
            // var pointLightObj = record[1];



            // var transform = wd.unsafeGetGameObjectTransformComponent(pointLightObj, state);

            // state = wd.setTransformLocalPosition(transform, [5, 0, 25], state);



            if (isCreateCamera) {

                var data = LightBoxesTool.createCamera(state);
                var state = data[0];
                var camera = data[1];


                var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                // state = wd.setTransformLocalPosition(transform, [0, 5, 10], state);




                var [state, cameraController] = wd.createArcballCameraController(state);

                var state =
                    wd.setArcballCameraControllerDistance(cameraController, 10, state);

                var state =
                    wd.bindArcballCameraControllerEvent(
                        cameraController, state
                    );


                var state = wd.addGameObjectArcballCameraControllerComponent(camera, cameraController, state);




                var state =
                    wd.activeBasicCameraView(
                        wd.unsafeGetGameObjectBasicCameraViewComponent(
                            camera, state
                        ), state
                    );
            }

            return state;
        },
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
        loadWholeWDB: function (wdbPath, handleWhenLoadingFunc, testFunc, state) {
            return wd.loadWholeWDB(wdbPath, true, true, true, true, true, handleWhenLoadingFunc, state).forEach(function ([state, imageUint8ArrayMap, gameObject]) {
                testFunc([state, imageUint8ArrayMap, gameObject])
            })
        },
        loadStreamWDB: function (wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state) {
            return wd.loadStreamWDB(wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state).drain()
        },
        loadIMGUIAsset: function (fntFilePath, bitmapFilePath, customTextureSourceDataArr, handleWhenDoneFunc, state) {
            return wd.loadIMGUIAsset(
                fntFilePath,
                bitmapFilePath,
                customTextureSourceDataArr,
                (a, b) => { },
                state)
                .then((state) => {
                    return handleWhenDoneFunc(state)
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