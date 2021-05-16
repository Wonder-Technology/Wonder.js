

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ExecIMGUITool$Wonderjs from "./ExecIMGUITool.js";
import * as ExtendIMGUIAPI$Wonderjs from "../../../../src/api/imgui/ExtendIMGUIAPI.js";

function _addSkinData(state, color) {
  var allCustomStyleData = ExtendIMGUIAPI$Wonderjs.createAllCustomStyleData(/* () */0);
  var singleCustomStyleData = ExtendIMGUIAPI$Wonderjs.createSingleCustomStyleData(/* () */0);
  var singleCustomStyleData$1 = ExtendIMGUIAPI$Wonderjs.addCustomStyleData("color", color, singleCustomStyleData);
  var skinName = "Skin1";
  var customStyleName = "CustomStyle1";
  var allCustomStyleData$1 = ExtendIMGUIAPI$Wonderjs.addSingleCustomStyleData(customStyleName, singleCustomStyleData$1, allCustomStyleData);
  var __x = ExtendIMGUIAPI$Wonderjs.createSkinData(ExtendIMGUIAPI$Wonderjs.createDefaultButtonSkinData(/* () */0), allCustomStyleData$1);
  return /* tuple */[
          Curry._3(ExtendIMGUIAPI$Wonderjs.addSkinData, skinName, __x, state),
          /* tuple */[
            skinName,
            customStyleName
          ]
        ];
}

function addExtendData(state) {
  var customControlName = "A1";
  var match = _addSkinData(state, /* array */[
        0.5,
        1,
        2
      ]);
  var match$1 = match[1];
  var state$1 = Curry._3(ExtendIMGUIAPI$Wonderjs.registerCustomControl, customControlName, (function (customControlFuncData, showData, apiJsObj, record) {
          var drawBox = apiJsObj.drawBox;
          var parseShowData = apiJsObj.parseShowData;
          var unsafeGetSkinData = apiJsObj.unsafeGetSkinData;
          var unsafeGetSingleCustomStyleDataMap = apiJsObj.unsafeGetSingleCustomStyleDataMap;
          var unsafeGetCustomStyleData = apiJsObj.unsafeGetCustomStyleData;
          var hasSingleCustomStyleName = apiJsObj.hasSingleCustomStyleName;
          var parseSingleCustomStyleName = apiJsObj.parseSingleCustomStyleName;
          var hasCustomStyleData = apiJsObj.hasCustomStyleData;
          var match = parseShowData(showData);
          var singleCustomStyleNameNullable = match[1];
          var defaultColor = /* array */[
            0.5,
            0.1,
            0.2
          ];
          var match$1 = hasSingleCustomStyleName(singleCustomStyleNameNullable);
          var color;
          if (match$1) {
            var singleCustomStyleName = parseSingleCustomStyleName(singleCustomStyleNameNullable);
            var singleCustomStyleDataMap = unsafeGetSingleCustomStyleDataMap(singleCustomStyleName, unsafeGetSkinData(match[0], record));
            var match$2 = hasCustomStyleData("color", singleCustomStyleDataMap);
            color = match$2 ? unsafeGetCustomStyleData("color", singleCustomStyleDataMap) : defaultColor;
          } else {
            color = defaultColor;
          }
          var record$1 = drawBox(customControlFuncData, color, record);
          return /* tuple */[
                  record$1,
                  true
                ];
        }), match[0]);
  return /* tuple */[
          state$1,
          /* tuple */[
            /* tuple */[
              1,
              2,
              10,
              11
            ],
            customControlName,
            /* tuple */[
              match$1[0],
              match$1[1]
            ]
          ]
        ];
}

function addExtendDataAndSetExecFunc(state) {
  var match = addExtendData(state);
  var match$1 = match[1];
  var match$2 = match$1[2];
  return ExecIMGUITool$Wonderjs.addExecFuncData(match[0], undefined, /* tuple */[
              match$1[0],
              match$1[1],
              /* tuple */[
                match$2[0],
                match$2[1]
              ]
            ], undefined, Caml_option.some((function (customData, imguiAPIJsObj, state) {
                    var match = customData[2];
                    var match$1 = customData[0];
                    var unsafeGetCustomControl = imguiAPIJsObj.unsafeGetCustomControl;
                    var getWonderImguiIMGUIRecord = imguiAPIJsObj.getWonderImguiIMGUIRecord;
                    var setWonderImguiIMGUIRecord = imguiAPIJsObj.setWonderImguiIMGUIRecord;
                    var customControl = unsafeGetCustomControl(customData[1], state);
                    var record = getWonderImguiIMGUIRecord(state);
                    var match$2 = customControl(/* tuple */[
                          match$1[0],
                          match$1[1],
                          match$1[2],
                          match$1[3]
                        ], /* tuple */[
                          match[0],
                          match[1]
                        ], record);
                    return setWonderImguiIMGUIRecord(match$2[0], state);
                  })), /* () */0);
}

export {
  _addSkinData ,
  addExtendData ,
  addExtendDataAndSetExecFunc ,
  
}
/* ExecIMGUITool-Wonderjs Not a pure module */
