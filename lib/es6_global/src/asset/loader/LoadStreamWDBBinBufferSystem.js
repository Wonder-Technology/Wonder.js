

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as LoadStreamWDBUtil$Wonderjs from "../utils/LoadStreamWDBUtil.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs from "./LoadStreamWDBSetBinBufferChunkDataSystem.js";
import * as LoadStreamWDBBuildBinBufferChunkDataSystem$Wonderjs from "./LoadStreamWDBBuildBinBufferChunkDataSystem.js";

function _computeCompleteStreamChunkTotalLoadedAlignedByteLength(headerJsonStreamChunkTotalByteLength, nextStreamChunkIndex, streamChunkArr) {
  return headerJsonStreamChunkTotalByteLength + ArrayService$WonderCommonlib.reduceOneParam((function (chunkByteLength, param) {
                return chunkByteLength + BufferUtils$Wonderjs.alignedLength(param[/* byteLength */0]) | 0;
              }), 0, streamChunkArr.slice(0, nextStreamChunkIndex)) | 0;
}

function _isLoadCompleteNextStreamChunkData(totalLoadedByteLength, completeStreamChunkTotalLoadedAlignedByteLength, nextStreamChunkIndex, streamChunkArr) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("nextStreamChunkIndex not out of bounds", "out"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](nextStreamChunkIndex, streamChunkArr.length - 1 | 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = streamChunkArr[nextStreamChunkIndex];
  return totalLoadedByteLength >= (completeStreamChunkTotalLoadedAlignedByteLength + BufferUtils$Wonderjs.alignedLength(match[/* byteLength */0]) | 0);
}

function handleBinBufferData(param, param$1, assembleData, state) {
  var match = assembleData[2];
  var match$1 = match[2];
  var imageCubemapTextureIndices = match$1[1];
  var cubemapTextureArr = match$1[0];
  var match$2 = match[1];
  var imageBasicSourceTextureIndices = match$2[1];
  var basicSourceTextureArr = match$2[0];
  var match$3 = assembleData[1];
  var gameObjectGeometrys = match$3[2];
  var geometryGameObjects = match$3[1];
  var geometryArr = match$3[0];
  var loadBlobImageMap = param$1[3];
  var loadedStreamChunkArrWhichNotHasAllData = param$1[2];
  var streamChunkArr = param$1[1];
  var nextStreamChunkIndex = param$1[0];
  var match$4 = param[2];
  var totalLoadedByteLength = param[1];
  var completeStreamChunkTotalLoadedAlignedByteLength = _computeCompleteStreamChunkTotalLoadedAlignedByteLength(param[0], nextStreamChunkIndex, streamChunkArr);
  var match$5 = !_isLoadCompleteNextStreamChunkData(totalLoadedByteLength, completeStreamChunkTotalLoadedAlignedByteLength, nextStreamChunkIndex, streamChunkArr);
  if (match$5) {
    return new Promise((function (resolve, reject) {
                  return resolve(/* tuple */[
                              state,
                              streamChunkArr,
                              assembleData,
                              nextStreamChunkIndex,
                              loadedStreamChunkArrWhichNotHasAllData,
                              loadBlobImageMap
                            ]);
                }));
  } else {
    return LoadStreamWDBBuildBinBufferChunkDataSystem$Wonderjs.buildBinBufferChunkData(nextStreamChunkIndex, loadedStreamChunkArrWhichNotHasAllData, completeStreamChunkTotalLoadedAlignedByteLength, totalLoadedByteLength, LoadStreamWDBUtil$Wonderjs.buildLoadedDataView(totalLoadedByteLength, /* tuple */[
                      match$4[0],
                      match$4[1]
                    ]).buffer, streamChunkArr, loadBlobImageMap, match[0]).then((function (param) {
                  var state$1 = LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs.setBinBufferChunkData(param[0], /* tuple */[
                        geometryArr,
                        geometryGameObjects,
                        gameObjectGeometrys
                      ], /* tuple */[
                        /* tuple */[
                          basicSourceTextureArr,
                          imageBasicSourceTextureIndices
                        ],
                        /* tuple */[
                          cubemapTextureArr,
                          imageCubemapTextureIndices
                        ]
                      ], state);
                  return Promise.resolve(/* tuple */[
                              state$1,
                              streamChunkArr,
                              assembleData,
                              param[1],
                              param[2],
                              param[3]
                            ]);
                }));
  }
}

export {
  _computeCompleteStreamChunkTotalLoadedAlignedByteLength ,
  _isLoadCompleteNextStreamChunkData ,
  handleBinBufferData ,
  
}
/* Log-WonderLog Not a pure module */
