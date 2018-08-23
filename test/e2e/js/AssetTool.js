var AssetTool = (function () {
    return {
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


        createLightsAndCamera: function (state) {
            var isCreateLight =
                wd.getAllDirectionLightComponents(state).length === 0 && wd.getAllPointLightComponents(state).length === 0;

            var isCreateCamera =
                wd.getAllBasicCameraViewComponents(state).length === 0;

            if (!isCreateLight) {
                return state;
            }


            var state = LightTool.setAmbientLight(state);



            var record = LightTool.createDirectionLight(state);
            var state = record[0];
            var directionLightObj = record[1];



            var transform = wd.unsafeGetGameObjectTransformComponent(directionLightObj, state);

            state = wd.setTransformLocalPosition(transform, [-10, 0, 20], state);



            var light = wd.unsafeGetGameObjectDirectionLightComponent(directionLightObj, state);

            var state = wd.setDirectionLightColor(light, [1.0, 1.0, 1.0], state);




            var record = LightTool.createPointLight(state);
            var state = record[0];
            var pointLightObj = record[1];



            var transform = wd.unsafeGetGameObjectTransformComponent(pointLightObj, state);

            state = wd.setTransformLocalPosition(transform, [5, 0, 25], state);



            if (isCreateCamera) {

                var data = LightBoxesTool.createCamera(state);
                var state = data[0];
                var camera = data[1];


                var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                // state = wd.setTransformLocalPosition(transform, [0, 5, 10], state);




                var [state, cameraController] = wd.createArcballCameraController(state);

                var state =
                    wd.setArcballCameraControllerDistance(cameraController, 50, state);

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

        loadWholeWDB: function (wdbPath, state, testFunc) {
            return wd.loadWholeWDB(wdbPath, state).forEach(function ([state, gameObject]) {
                testFunc([state, gameObject])
            })
            // .then(function () {
            //     if (!!completeFunc) {
            //         return completeFunc()
            //     }
            // })
        },
        loadStreamWDB: function (wdbPath, state, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc) {
            return wd.loadStreamWDB(wdbPath, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state).drain()
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