var SettingTool = (function () {
    return {
        setSetting: function (fontTexUvForWhite, state) {
            return wd.setSetting(
                {
                    "textColor": [1.0, 1.0, 1.0],
                    "buttonSetting": {
                        "buttonColor": [0.5, 0.5, 0.5],
                        "hoverButtonColor": [0.5, 0.0, 1.0],
                        "clickButtonColor": [0.5, 1.0, 0.0]
                    },
                    "radioButtonSetting": {

                        "radioButtonOuterColor": [0.3, 0.3, 0.3],
                        "radioButtonInnerColor":



                            [0.15, 0.15, 0.15],


                        "radioButtonOuterColorHover":
                            [0.33, 0.33, 0.33],


                        "radioButtonInnerColorHover":

                            [0.15, 0.15, 0.15],

                        "radioButtonCircleSegments":

                            9,

                        "radioButtonInnerRadius": 0.6,

                        "radioButtonOuterRadius":
                            1.0
                    },
                    "checkboxSetting": {

                        "checkboxOuterColor": [0.3, 0.3, 0.3],
                        "checkboxInnerColor":



                            [0.15, 0.15, 0.15],


                        "checkboxOuterColorHover":
                            [0.33, 0.33, 0.33],


                        "checkboxInnerColorHover":

                            [0.15, 0.15, 0.15],


                        "checkboxInnerSizeRatio": 0.6,

                        "checkboxOuterSizeRatio":
                            1.0
                    },
                    "sliderSetting": {

                        "sliderBackgroundColor": [0.3, 0.3, 0.3],
                        "sliderFillColor":



                            [0.15, 0.15, 0.15],


                        "sliderBackgroundColorHover":
                            [0.33, 0.33, 0.33],


                        "sliderFillColorHover":

                            [0.15, 0.15, 0.15],
                    },


                    "fontTexUvForWhite": fontTexUvForWhite
                }, state
            );
        }
    }
})()