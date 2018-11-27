

import * as Most from "most";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ImageUtils$Wonderjs from "../utils/ImageUtils.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as AssembleUtils$Wonderjs from "../utils/AssembleUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as BatchCreateSystem$Wonderjs from "./BatchCreateSystem.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as SetIMGUIFuncSystem$Wonderjs from "./SetIMGUIFuncSystem.js";
import * as BatchOperateWholeSystem$Wonderjs from "./BatchOperateWholeSystem.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BuildRootGameObjectSystem$Wonderjs from "./BuildRootGameObjectSystem.js";

function _getArrayBuffer(binBuffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */1];
  return binBuffer.slice(byteOffset, byteOffset + match[/* byteLength */2] | 0);
}

function _buildImageArray(isLoadImage, param, binBuffer) {
  var bufferViews = param[/* bufferViews */8];
  var images = param[/* images */4];
  var blobObjectUrlImageArr = /* array */[];
  var imageUint8ArrayDataMap = SparseMapService$WonderCommonlib.createEmpty(/* () */0);
  var match = !isLoadImage;
  if (match) {
    return Promise.resolve(/* tuple */[
                blobObjectUrlImageArr,
                imageUint8ArrayDataMap
              ]);
  } else {
    var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(images);
    return Most.drain(Most.mergeArray(match$1 ? blobObjectUrlImageArr : ArrayService$Wonderjs.reduceOneParamValidi((function (streamArr, param, imageIndex) {
                              var mimeType = param[/* mimeType */2];
                              var name = param[/* name */0];
                              var arrayBuffer = _getArrayBuffer(binBuffer, param[/* bufferView */1], bufferViews);
                              SparseMapService$WonderCommonlib.set(imageIndex, /* tuple */[
                                    mimeType,
                                    new Uint8Array(arrayBuffer)
                                  ], imageUint8ArrayDataMap);
                              return ArrayService$Wonderjs.push(Most.tap((function (image) {
                                                ImageUtils$Wonderjs.setImageName(image, name);
                                                blobObjectUrlImageArr[imageIndex] = image;
                                                return /* () */0;
                                              }), AssembleUtils$Wonderjs.buildLoadImageStream(arrayBuffer, mimeType, "load image error. imageIndex: " + (String(imageIndex) + ""))), streamArr);
                            }), /* array */[], OptionService$Wonderjs.unsafeGetJsonSerializedValue(images)))).then((function () {
                  return Promise.resolve(/* tuple */[
                              blobObjectUrlImageArr,
                              imageUint8ArrayDataMap
                            ]);
                }));
  }
}

function _buildBufferArray(buffers, binBuffer) {
  Contract$WonderLog.requireCheck((function () {
          var bufferLen = buffers.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("has only one buffer", "has " + (String(bufferLen) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](bufferLen, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return /* array */[binBuffer];
}

function _checkWDB(dataView) {
  Contract$WonderLog.requireCheck((function () {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Source file to be a WDB (wd Binary) model", "not"), (function () {
                  var match = DataViewCommon$Wonderjs.getUint32_1(0, dataView);
                  return Contract$WonderLog.Operators[/* = */0](match[0], 1179937896);
                }));
          var match = DataViewCommon$Wonderjs.getUint32_1(4, dataView);
          var readVersion = match[0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("Only WDB version 1 is supported", "Detected version: " + (String(readVersion) + "")), (function () {
                        return Contract$WonderLog.Operators[/* = */0](readVersion, 1);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return dataView;
}

function assembleWDBData(wd, binBuffer, param, state) {
  var isRenderLight = param[3];
  var isActiveCamera = param[2];
  var isBindEvent = param[1];
  var isSetIMGUIFunc = param[0];
  var buffers = wd[/* buffers */7];
  return Most.fromPromise(_buildImageArray(param[4], wd, binBuffer).then((function (imageDataTuple) {
                    var hasIMGUIFunc = !OptionService$Wonderjs.isJsonSerializedValueNone(wd[/* scene */1][/* imgui */2]);
                    var match = isSetIMGUIFunc && hasIMGUIFunc;
                    var state$1 = match ? SetIMGUIFuncSystem$Wonderjs.setIMGUIFunc(wd, state) : state;
                    var match$1 = BatchOperateWholeSystem$Wonderjs.batchOperate(wd, imageDataTuple, _buildBufferArray(buffers, binBuffer), /* tuple */[
                          isBindEvent,
                          isActiveCamera
                        ], BatchCreateSystem$Wonderjs.batchCreate(isRenderLight, wd, state$1));
                    var match$2 = BuildRootGameObjectSystem$Wonderjs.build(wd, /* tuple */[
                          match$1[0],
                          match$1[2]
                        ]);
                    return Promise.resolve(/* tuple */[
                                match$2[0],
                                /* tuple */[
                                  match$1[1],
                                  hasIMGUIFunc
                                ],
                                match$2[1]
                              ]);
                  })));
}

function assemble(wdb, configTuple, state) {
  var match = BufferUtils$Wonderjs.decodeWDB(wdb, _checkWDB);
  return assembleWDBData(JSON.parse(match[0]), match[2], configTuple, state);
}

export {
  _getArrayBuffer ,
  _buildImageArray ,
  _buildBufferArray ,
  _checkWDB ,
  assembleWDBData ,
  assemble ,
  
}
/* most Not a pure module */
