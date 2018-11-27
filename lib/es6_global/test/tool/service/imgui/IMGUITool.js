

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ManageIMGUIAPI$Wonderjs from "../../../../src/api/imgui/ManageIMGUIAPI.js";
import * as RecordIMGUIService$WonderImgui from "../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/RecordIMGUIService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/ManageIMGUIMainService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";

function buildEmptyIMGUIFuncStr() {
  return "function (customData, apiJsObj, record){ return record; }";
}

function buildSettingJsObj($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, $staropt$star$19, $staropt$star$20, $staropt$star$21, _) {
  var textColor = $staropt$star !== undefined ? $staropt$star : /* array */[
      1,
      1,
      1
    ];
  var buttonColor = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[
      1,
      0.5,
      0.3
    ];
  var hoverButtonColor = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[
      1,
      0.5,
      0.3
    ];
  var clickButtonColor = $staropt$star$3 !== undefined ? $staropt$star$3 : /* array */[
      1,
      0.5,
      0.3
    ];
  var radioButtonOuterColor = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[
      1,
      0.5,
      0.3
    ];
  var radioButtonInnerColor = $staropt$star$5 !== undefined ? $staropt$star$5 : /* array */[
      1,
      0.5,
      0.3
    ];
  var radioButtonOuterColorHover = $staropt$star$6 !== undefined ? $staropt$star$6 : /* array */[
      1,
      0.5,
      0.3
    ];
  var radioButtonInnerColorHover = $staropt$star$7 !== undefined ? $staropt$star$7 : /* array */[
      1,
      0.5,
      0.3
    ];
  var radioButtonCircleSegments = $staropt$star$8 !== undefined ? $staropt$star$8 : 9;
  var radioButtonInnerRadius = $staropt$star$9 !== undefined ? $staropt$star$9 : 0.9;
  var radioButtonOuterRadius = $staropt$star$10 !== undefined ? $staropt$star$10 : 0.6;
  var checkboxOuterColor = $staropt$star$11 !== undefined ? $staropt$star$11 : /* array */[
      1,
      0.5,
      0.3
    ];
  var checkboxInnerColor = $staropt$star$12 !== undefined ? $staropt$star$12 : /* array */[
      1,
      0.5,
      0.3
    ];
  var checkboxOuterColorHover = $staropt$star$13 !== undefined ? $staropt$star$13 : /* array */[
      1,
      0.5,
      0.3
    ];
  var checkboxInnerColorHover = $staropt$star$14 !== undefined ? $staropt$star$14 : /* array */[
      1,
      0.5,
      0.3
    ];
  var checkboxInnerSizeRatio = $staropt$star$15 !== undefined ? $staropt$star$15 : 0.9;
  var checkboxOuterSizeRatio = $staropt$star$16 !== undefined ? $staropt$star$16 : 0.6;
  var sliderBackgroundColor = $staropt$star$17 !== undefined ? $staropt$star$17 : /* array */[
      1,
      0.5,
      0.3
    ];
  var sliderFillColor = $staropt$star$18 !== undefined ? $staropt$star$18 : /* array */[
      0.2,
      0.5,
      0.3
    ];
  var sliderBackgroundColorHover = $staropt$star$19 !== undefined ? $staropt$star$19 : /* array */[
      1,
      0.5,
      0.3
    ];
  var sliderFillColorHover = $staropt$star$20 !== undefined ? $staropt$star$20 : /* array */[
      1,
      0.5,
      0.3
    ];
  var fontTexUvForWhite = $staropt$star$21 !== undefined ? $staropt$star$21 : /* array */[
      0.5,
      0
    ];
  return {
          textColor: textColor,
          buttonSetting: {
            buttonColor: buttonColor,
            hoverButtonColor: hoverButtonColor,
            clickButtonColor: clickButtonColor
          },
          radioButtonSetting: {
            radioButtonOuterColor: radioButtonOuterColor,
            radioButtonInnerColor: radioButtonInnerColor,
            radioButtonOuterColorHover: radioButtonOuterColorHover,
            radioButtonInnerColorHover: radioButtonInnerColorHover,
            radioButtonCircleSegments: radioButtonCircleSegments,
            radioButtonInnerRadius: radioButtonInnerRadius,
            radioButtonOuterRadius: radioButtonOuterRadius
          },
          checkboxSetting: {
            checkboxOuterColor: checkboxOuterColor,
            checkboxInnerColor: checkboxInnerColor,
            checkboxOuterColorHover: checkboxOuterColorHover,
            checkboxInnerColorHover: checkboxInnerColorHover,
            checkboxInnerSizeRatio: checkboxInnerSizeRatio,
            checkboxOuterSizeRatio: checkboxOuterSizeRatio
          },
          sliderSetting: {
            sliderBackgroundColor: sliderBackgroundColor,
            sliderFillColor: sliderFillColor,
            sliderBackgroundColorHover: sliderBackgroundColorHover,
            sliderFillColorHover: sliderFillColorHover
          },
          fontTexUvForWhite: fontTexUvForWhite
        };
}

function setTextColorSetting(textColor, state) {
  var setting = buildSettingJsObj(textColor, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          ManageIMGUIAPI$Wonderjs.setSetting(setting, state),
          setting
        ];
}

function setButtonColorSetting(param, state) {
  var setting = buildSettingJsObj(undefined, param[0], param[1], param[2], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          ManageIMGUIAPI$Wonderjs.setSetting(setting, state),
          setting
        ];
}

var getIOData = RecordIMGUIMainService$Wonderjs.getIOData;

function setIOData(ioData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */41];
  newrecord[/* imguiRecord */41] = /* record */[
    /* ioData */ioData,
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */init[/* wonderImguiIMGUIRecord */2]
  ];
  return newrecord;
}

function setControlData(controlData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* imguiRecord */41];
  newrecord[/* imguiRecord */41] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */RecordIMGUIService$WonderImgui.setControlData(controlData, RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state))
  ];
  return newrecord;
}

var getIMGUIFunc = ManageIMGUIMainService$Wonderjs.getIMGUIFunc;

var getCustomData = ManageIMGUIMainService$Wonderjs.getCustomData;

var getWonderIMGUIRecord = RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord;

export {
  buildEmptyIMGUIFuncStr ,
  getIMGUIFunc ,
  getCustomData ,
  getWonderIMGUIRecord ,
  buildSettingJsObj ,
  setTextColorSetting ,
  setButtonColorSetting ,
  getIOData ,
  setIOData ,
  setControlData ,
  
}
/* ManageIMGUIAPI-Wonderjs Not a pure module */
