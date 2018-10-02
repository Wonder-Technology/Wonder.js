var DemoImguiTool = (function () {
    return {
        bindEvent: function (getIsShowPanelFunc, state) {
            var state = wd.onCustomGlobalEvent(
                wd.getPointDragEventName(),
                100,
                (event, state) => {
                    var pointEvent = wd.getCustomEventUserData(event);



                    var [x, y] = wd.getPointEventLocationInViewOfEvent(pointEvent);



                    var [regionX, regionY, regionWidth, regionHeight] = DemoImguiTool.getIMGUIRegion(window.innerWidth, window.innerHeight);

                    if (
                        getIsShowPanelFunc(state) === true &&
                        x >= regionX && y >= regionY
                    ) {
                        document.exitPointerLock();

                        return [
                            state,
                            wd.stopPropagationCustomEvent(event)
                        ]
                    }

                    return [state, event];
                },
                state
            );

            return state;
        },
        getIMGUIRegion: function (screenWidth, screenHeight) {
            return [screenWidth / 1.8, 10, screenWidth - screenWidth / 1.8, screenHeight]
        },
        buildImguiFunc: function (api, fps, screenWidth, screenHeight, getIMGUIRegionFunc, state) {
            var intervalX = screenWidth / 5;
            var intervalY = screenHeight / 4;

            var controlWidth = screenWidth / 5;
            var controlHeight = screenHeight / 8;


            var boxColorArr = [0.0, 0.5, 0.5];


            var x = 20;

            var [regionX, regionY, regionWidth, regionHeight] = getIMGUIRegionFunc(screenWidth, screenHeight);


            var state = api.beginGroup([regionX, regionY], state);


            var state = api.box([0, 0, regionWidth, regionHeight], boxColorArr, state);


            var state = api.beginGroup([0, 0], state);

            var state = api.label(
                [x, 0, 300, 50], "fps: " + Math.round(fps), 0, state
            );


            var state = api.endGroup(state);


            var state = api.beginGroup([0, 80], state);


            var [state, selectIndex_radioButton] = api.radioButton(
                [
                    [

                        [x, 0, controlWidth, controlHeight], "truck"

                    ],
                    [

                        [x + intervalX, 0, controlWidth, controlHeight],
                        "box"

                    ]
                ],
                0,
                "group1",
                state
            );



            var [state, selectIndex_checkbox1] = api.checkbox(
                [x, intervalY, controlWidth * 2, controlHeight],
                true,
                "has specular light",
                state
            );

            // var [state, selectIndex_checkbox2] = api.checkbox(
            //     [intervalX, 200, 400, 100],
            //     true,
            //     "checkbox2",
            //     state
            // );








            var [state, isSelected_shininess, value_shininess] = api.sliderFloat(
                [
                    [x, intervalY * 2, controlWidth / 2 * 2, controlHeight],
                    controlWidth / 2 * 2
                ],
                [
                    0.0, 64.0, 2
                ],
                [
                    32.0, "shininess"
                ],
                state
            );







            // var state = api.image(
            //     [x, intervalY * 3, controlWidth / 3, controlHeight / 3], [0, 0, 1, 1], "wonder", state
            // );


            var state = api.image(
                [x + intervalX / 2, intervalY * 3, controlWidth / 3, controlHeight / 3], [0, 0, 1, 1], "1", state
            );



            var state = api.image(
                [x + intervalX / 2 * 2, intervalY * 3, controlWidth / 3, controlHeight / 3], [0, 0, 1, 1], "2", state
            );

            var state = api.endGroup(state);

            var state = api.endGroup(state);

            return [state, selectIndex_radioButton, selectIndex_checkbox1, value_shininess];
        }
    }
})()