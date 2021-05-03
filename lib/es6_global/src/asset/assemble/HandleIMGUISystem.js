

import * as Most from "most";
import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as AssembleCommon$Wonderjs from "./AssembleCommon.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ExecIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ExecIMGUIMainService.js";
import * as StateDataMainService$Wonderjs from "../../service/state/main/state/StateDataMainService.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as SerializeAllIMGUIService$Wonderjs from "../../service/record/all/imgui/SerializeAllIMGUIService.js";
import * as SetAssetIMGUIMainService$Wonderjs from "../../service/state/main/imgui/SetAssetIMGUIMainService.js";

function _setExtendData(param, state) {
  return Curry._2(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* setAllSkinDataMap */1], SerializeAllIMGUIService$Wonderjs.Skin[/* deserializeAllSkinDataMap */1](param[/* skinData */1][/* allSkinDataMap */0]), Curry._2(ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* setFuncMap */1], SerializeAllIMGUIService$Wonderjs.CustomControl[/* deserializeFuncMap */1](param[/* customControlData */0][/* funcMap */0]), state));
}

function _setFontData(fontData, param, binBuffer, state) {
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(fontData);
  if (match) {
    return state;
  } else {
    var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(fontData);
    var bitmapData = match$1[/* bitmapData */1];
    var fntData = match$1[/* fntData */0];
    return SetAssetIMGUIMainService$Wonderjs.setSettedAssetBitmapData(bitmapData[/* name */0], AssembleCommon$Wonderjs.getArrayBuffer(binBuffer, bitmapData[/* bufferView */1], param[/* bufferViews */9]), SetAssetIMGUIMainService$Wonderjs.setSettedAssetFntData(fntData[/* name */0], fntData[/* content */1], state));
  }
}

function _setCustomImagesData(customImagesData, param, binBuffer, state) {
  var bufferViews = param[/* bufferViews */9];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(customImagesData);
  if (match) {
    return state;
  } else {
    var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(customImagesData);
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  return SetAssetIMGUIMainService$Wonderjs.addSettedAssetCustomImageData(/* tuple */[
                              AssembleCommon$Wonderjs.getArrayBuffer(binBuffer, param[/* bufferView */1], bufferViews),
                              param[/* id */0],
                              param[/* mimeType */2]
                            ], state);
                }), state, match$1[/* customImages */0]);
  }
}

function _setAndInitAssetData(param, wd, binBuffer, state) {
  return SetAssetIMGUIMainService$Wonderjs.initSettedAssets(_setCustomImagesData(param[/* customImagesData */1], wd, binBuffer, _setFontData(param[/* fontData */0], wd, binBuffer, state)));
}

function _addAllExecFuncData(execFuncDataArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                return ExecIMGUIMainService$Wonderjs.addExecFuncData(param[/* name */3], param[/* customData */1], param[/* execOrder */2], param[/* execFunc */0], state);
              }), state, SerializeAllIMGUIService$Wonderjs.Exec[/* deserializeExecFuncDataArrToWonderType */5](execFuncDataArr));
}

function _setExecData(param, state) {
  return _addAllExecFuncData(param[/* execFuncDataArr */0], ExecIMGUIMainService$Wonderjs.clearExecFuncDataArr(state));
}

function _handle(wd, binBuffer, state) {
  var match = OptionService$Wonderjs.unsafeGetJsonSerializedValue(wd[/* scene */1][/* imgui */2]);
  return _setAndInitAssetData(match[/* assetData */0], wd, binBuffer, _setExtendData(match[/* extendData */2], _setExecData(match[/* execData */1], state)));
}

function getHasIMGUIData(wd) {
  return !OptionService$Wonderjs.isJsonSerializedValueNone(wd[/* scene */1][/* imgui */2]);
}

function handleIMGUI(isHandleIMGUI, wd, binBuffer, state) {
  var hasIMGUIData = getHasIMGUIData(wd);
  var match = isHandleIMGUI && hasIMGUIData;
  return Most.map((function (state) {
                StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, state);
                return /* () */0;
              }), match ? _handle(wd, binBuffer, state) : Most.just(state));
}

export {
  _setExtendData ,
  _setFontData ,
  _setCustomImagesData ,
  _setAndInitAssetData ,
  _addAllExecFuncData ,
  _setExecData ,
  _handle ,
  getHasIMGUIData ,
  handleIMGUI ,
  
}
/* most Not a pure module */
