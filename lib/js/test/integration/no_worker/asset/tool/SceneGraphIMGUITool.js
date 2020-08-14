'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ExecIMGUITool$Wonderjs = require("../../../../tool/service/imgui/ExecIMGUITool.js");
var SerializeAllIMGUIService$Wonderjs = require("../../../../../src/service/record/all/imgui/SerializeAllIMGUIService.js");
var SetAssetIMGUIMainService$Wonderjs = require("../../../../../src/service/state/main/imgui/SetAssetIMGUIMainService.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");

function buildExtendData($staropt$star, $staropt$star$1, param) {
  var funcMap = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  var allSkinDataMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  return /* record */[
          /* customControlData : record */[/* funcMap */SerializeAllIMGUIService$Wonderjs.CustomControl[/* serializeFuncMap */0](funcMap)],
          /* skinData : record */[/* allSkinDataMap */SerializeAllIMGUIService$Wonderjs.Skin[/* serializeAllSkinDataMap */0](allSkinDataMap)]
        ];
}

function getSettedAssetCustomImageDataArrForTest(state) {
  return SetAssetIMGUIMainService$Wonderjs.getSettedAssetCustomImageDataArr(state).map((function (param) {
                return /* tuple */[
                        param[0].byteLength,
                        param[1],
                        param[2]
                      ];
              }));
}

function buildFakeFntName(param) {
  return "fnt";
}

function buildFakeFntContent(param) {
  return "info face=\"Lato-Regular\" size=64 bold=0 italic=0 charset=\"\" unicode=1 stretchH=100 smooth=1 aa=2 padding=0,0,0,0 spacing=0,0\ncommon lineHeight=77 base=63 scaleW=512 scaleH=512 pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0\npage id=0 file=\"lato.png\"\nchars count=0";
}

function buildAssetData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var fntName = $staropt$star !== undefined ? $staropt$star : "fnt";
  var fntContent = $staropt$star$1 !== undefined ? $staropt$star$1 : "info face=\"Lato-Regular\" size=64 bold=0 italic=0 charset=\"\" unicode=1 stretchH=100 smooth=1 aa=2 padding=0,0,0,0 spacing=0,0\ncommon lineHeight=77 base=63 scaleW=512 scaleH=512 pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0\npage id=0 file=\"lato.png\"\nchars count=0";
  var bitmapName = $staropt$star$2 !== undefined ? $staropt$star$2 : "bitmap";
  var bitmapBufferView = $staropt$star$3 !== undefined ? $staropt$star$3 : 0;
  var customImages = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
  return /* record */[
          /* fontData *//* record */[
            /* fntData : record */[
              /* name */fntName,
              /* content */fntContent
            ],
            /* bitmapData : record */[
              /* name */bitmapName,
              /* bufferView */bitmapBufferView
            ]
          ],
          /* customImagesData *//* record */[/* customImages */customImages]
        ];
}

function buildEmptyAssetData(param) {
  return /* record */[
          /* fontData */undefined,
          /* customImagesData */undefined
        ];
}

function buildExecFuncDataArr($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "exec";
  var customData = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : -1;
  var execOrder = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var func = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : ExecIMGUITool$Wonderjs.buildEmptyExecFunc(/* () */0);
  return SerializeAllIMGUIService$Wonderjs.Exec[/* serializeWonderExecFuncDataArr */4](/* array */[/* record */[
                /* execFunc */func,
                /* customData */customData,
                /* execOrder */execOrder,
                /* name */name
              ]]);
}

function buildExecDataToOneExecFuncData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "exec";
  var customData = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : -1;
  var execOrder = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var func = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : ExecIMGUITool$Wonderjs.buildEmptyExecFunc(/* () */0);
  return /* record */[/* execFuncDataArr */buildExecFuncDataArr(name, Caml_option.some(customData), execOrder, Caml_option.some(func), /* () */0)];
}

exports.buildExtendData = buildExtendData;
exports.getSettedAssetCustomImageDataArrForTest = getSettedAssetCustomImageDataArrForTest;
exports.buildFakeFntName = buildFakeFntName;
exports.buildFakeFntContent = buildFakeFntContent;
exports.buildAssetData = buildAssetData;
exports.buildEmptyAssetData = buildEmptyAssetData;
exports.buildExecFuncDataArr = buildExecFuncDataArr;
exports.buildExecDataToOneExecFuncData = buildExecDataToOneExecFuncData;
/* ExecIMGUITool-Wonderjs Not a pure module */
