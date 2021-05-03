

import * as Most from "most";
import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../service/atom/OptionService.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as AssetIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/AssetIMGUIAPI.js";
import * as ManageIMGUIAPI$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/ManageIMGUIAPI.js";
import * as SkinAllIMGUIService$Wonderjs from "../../../../service/record/all/imgui/SkinAllIMGUIService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CustomControlAllIMGUIService$Wonderjs from "../../../../service/record/all/imgui/CustomControlAllIMGUIService.js";
import * as ExtendIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/ExtendIMGUIRenderWorkerService.js";
import * as ImageBitmapRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/ImageBitmapRenderWorkerService.js";
import * as RecordIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/RecordIMGUIRenderWorkerService.js";

function _getFlipY(state) {
  return false;
}

function execJob(param, e, stateData) {
  var data = MessageService$Wonderjs.getRecord(e);
  var imguiData = data.imguiData;
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(imguiData.fntData) || OptionService$Wonderjs.isJsonSerializedValueNone(imguiData.bitmapImageData);
  if (match) {
    return Most.just(e);
  } else {
    var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
    var extendData = imguiData.extendData;
    var customControlData = extendData.customControlData;
    var funcMap = Curry._1(ExtendIMGUIRenderWorkerService$Wonderjs.ExtendData[/* CustomControl */0][/* deserializeFuncMap */1], customControlData.funcMap);
    var skinData = extendData.skinData;
    var allSkinDataMap = Curry._1(ExtendIMGUIRenderWorkerService$Wonderjs.ExtendData[/* Skin */1][/* deserializeAllSkinDataMap */1], skinData.allSkinDataMap);
    return Most.map((function (param) {
                  return e;
                }), Most.fromPromise(ImageBitmapRenderWorkerService$Wonderjs.createImageBitmapFromImageData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(imguiData.bitmapImageData), _getFlipY, state).then((function (imageBitmap) {
                            var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                            var imguiRecord = AssetIMGUIAPI$WonderImgui.setFntData(JSON.parse(OptionService$Wonderjs.unsafeGetJsonSerializedValue(imguiData.fntData)), AssetIMGUIAPI$WonderImgui.setBitmap(imageBitmap, RecordIMGUIRenderWorkerService$Wonderjs.getRecord(state)));
                            state[/* imguiRecord */29] = imguiRecord;
                            return Promise.resolve(StateRenderWorkerService$Wonderjs.setState(stateData, state));
                          }))).concat(Most.fromPromise(Most.reduce((function (customImageArr, imageData) {
                                return ArrayService$Wonderjs.push(imageData, customImageArr);
                              }), /* array */[], Most.mergeArray(imguiData.customTextureSourceDataArr.map((function (param) {
                                        var imageType = param[2];
                                        var id = param[1];
                                        return Most.fromPromise(ImageBitmapRenderWorkerService$Wonderjs.createImageBitmapFromImageData(param[0], _getFlipY, state).then((function (imageBitmap) {
                                                          return Promise.resolve(/* tuple */[
                                                                      imageBitmap,
                                                                      id,
                                                                      imageType
                                                                    ]);
                                                        })));
                                      })))).then((function (customImageArr) {
                              var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                              state[/* imguiRecord */29] = SkinAllIMGUIService$Wonderjs.mergeAllSkinDataMapsToWonderImguiIMGUIRecord(allSkinDataMap, CustomControlAllIMGUIService$Wonderjs.registerAllCustomControlsToWonderImguiIMGUIRecord(funcMap, ManageIMGUIAPI$WonderImgui.init(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), /* tuple */[
                                            imguiData.canvasWidth,
                                            imguiData.canvasHeight
                                          ], AssetIMGUIAPI$WonderImgui.setCustomImageArr(customImageArr, state[/* imguiRecord */29]))));
                              return Promise.resolve(StateRenderWorkerService$Wonderjs.setState(stateData, state));
                            })))));
  }
}

export {
  _getFlipY ,
  execJob ,
  
}
/* most Not a pure module */
