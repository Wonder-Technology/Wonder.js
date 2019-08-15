var ImguiTool = (function () {
    return {
        setSetting: function (fontTexUvForWhite, state) {
            return wd.setSetting(
                {
                    "textColor": [1.0, 1.0, 1.0],
                    // "buttonSetting": {
                    //     "buttonColor": [0.5, 0.5, 0.5],
                    //     "hoverButtonColor": [0.5, 0.0, 1.0],
                    //     "clickButtonColor": [0.5, 1.0, 0.0]
                    // },
                    // "radioButtonSetting": {

                    //     "radioButtonOuterColor": [0.3, 0.3, 0.3],
                    //     "radioButtonInnerColor":



                    //         [0.15, 0.15, 0.15],


                    //     "radioButtonOuterColorHover":
                    //         [0.33, 0.33, 0.33],


                    //     "radioButtonInnerColorHover":

                    //         [0.15, 0.15, 0.15],

                    //     "radioButtonCircleSegments":

                    //         9,

                    //     "radioButtonInnerRadius": 0.6,

                    //     "radioButtonOuterRadius":
                    //         1.0
                    // },
                    // "checkboxSetting": {

                    //     "checkboxOuterColor": [0.3, 0.3, 0.3],
                    //     "checkboxInnerColor":



                    //         [0.15, 0.15, 0.15],


                    //     "checkboxOuterColorHover":
                    //         [0.33, 0.33, 0.33],


                    //     "checkboxInnerColorHover":

                    //         [0.15, 0.15, 0.15],


                    //     "checkboxInnerSizeRatio": 0.6,

                    //     "checkboxOuterSizeRatio":
                    //         1.0
                    // },
                    // "sliderSetting": {

                    //     "sliderBackgroundColor": [0.3, 0.3, 0.3],
                    //     "sliderFillColor":



                    //         [0.15, 0.15, 0.15],


                    //     "sliderBackgroundColorHover":
                    //         [0.33, 0.33, 0.33],


                    //     "sliderFillColorHover":

                    //         [0.15, 0.15, 0.15],
                    // },


                    "fontTexUvForWhite": fontTexUvForWhite
                }, state
            );
        },
        testIMGUI: function (count, state) {
            var state = ImguiTool.setSetting([0.045, 0.012], state);


            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;


            var state = wd.setIMGUIFunc(
                null,
                (customData, api, state) => {
                    // var radioButtonWidth = 200;
                    // var radioButtonHeight = 100;

                    var intervalX = screenWidth / 2;
                    var intervalY = screenHeight / 6;

                    var controlWidth = screenWidth / 2;
                    var controlHeight = screenHeight / 6;

                    var state = state;

                    for (var i = 0; i < count; i++) {
                        var state = api.beginGroup([100, 0], state);

                        // var [state, selectIndex_radioButton] = api.radioButton(
                        //     [
                        //         [

                        //             [0, 0, controlWidth, controlHeight], "abc"

                        //         ],
                        //         [

                        //             [intervalX, 0, controlWidth, controlHeight],
                        //             "b"

                        //         ]
                        //     ],
                        //     0,
                        //     "group1",
                        //     state
                        // );




                        // var [state, selectIndex_checkbox1] = api.checkbox(
                        //     [0, intervalY, controlWidth, controlHeight],
                        //     true,
                        //     "checkbox1",
                        //     state
                        // );

                        // var [state, selectIndex_checkbox2] = api.checkbox(
                        //     [intervalX, intervalY, controlWidth, controlHeight],
                        //     false,
                        //     "checkbox2",
                        //     state
                        // );





                        // var [state, isSelected_sliderFloat, value_sliderFloat] = api.sliderFloat(
                        //     [
                        //         [0, intervalY * 2, controlWidth / 2, controlHeight],
                        //         controlWidth / 2
                        //     ],
                        //     [
                        //         0.1, 5.5, 2
                        //     ],
                        //     [
                        //         1.3, "float"
                        //     ],
                        //     state
                        // );






                        // var [state, isSelected_sliderInt, value_sliderInt] = api.sliderInt(
                        //     [
                        //         [intervalX, intervalY * 2, controlWidth / 2, controlHeight],
                        //         controlWidth / 2
                        //     ],
                        //     [
                        //         2, 7
                        //     ],
                        //     [
                        //         3, "int"
                        //     ],
                        //     state
                        // );


                        var [state, isClick_button1] = api.button(
                            [[0, intervalY * 3, controlWidth, controlHeight], "button1"],
                            null,
                            state
                        );



                        var state = api.label(
                            [intervalX, intervalY * 3, controlWidth, controlHeight], "label1", 0, state
                        );




                        var state = api.image(
                            [0, intervalY * 4, controlWidth / 2, controlHeight / 2], [0, 0, 1, 1], "1", state
                        );



                        var state = api.image(
                            [intervalX, intervalY * 4, controlWidth / 2, controlHeight / 2], [0, 0, 1, 1], "2", state
                        );


                        var state = api.endGroup(state);

                        state = state;
                    }


                    return state

                }, state);

            return state;
        }
    }
})()