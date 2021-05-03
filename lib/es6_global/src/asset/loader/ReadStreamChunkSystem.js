

import * as Most from "most";
import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "./../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as FetchExtend$Wonderjs from "../../external/FetchExtend.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as HandleIMGUISystem$Wonderjs from "../assemble/HandleIMGUISystem.js";
import * as LoadStreamWDBUtil$Wonderjs from "../utils/LoadStreamWDBUtil.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ConvertStreamSystem$Wonderjs from "../converter/ConvertStreamSystem.js";
import * as DirectorMainService$Wonderjs from "../../service/state/main/director/DirectorMainService.js";
import * as StateDataMainService$Wonderjs from "../../service/state/main/state/StateDataMainService.js";
import * as AssembleStreamWDBSystem$Wonderjs from "../assemble/AssembleStreamWDBSystem.js";
import * as LoadStreamWDBBinBufferSystem$Wonderjs from "./LoadStreamWDBBinBufferSystem.js";

function _readReader (reader){
  return reader.read();
  };

function _close (controller){
  controller.close();
  };

function _getTotalLoadedByteLength(loadedUint8ArrayArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (byteLength, loadedUint8Array) {
                return byteLength + loadedUint8Array.byteLength | 0;
              }), 0, loadedUint8ArrayArr);
}

function _getAllChunkLengths(allChunkLengths, totalLoadedByteLength, param) {
  if (allChunkLengths !== undefined) {
    return allChunkLengths;
  } else {
    var dataView = LoadStreamWDBUtil$Wonderjs.buildLoadedDataView(totalLoadedByteLength, /* tuple */[
          param[0],
          param[1]
        ]);
    var match = DataViewCommon$Wonderjs.getUint32_1(BufferUtils$Wonderjs.getHeaderByteLength(/* () */0), dataView);
    var match$1 = DataViewCommon$Wonderjs.getUint32_1(BufferUtils$Wonderjs.getHeaderByteLength(/* () */0) + BufferUtils$Wonderjs.getWDBChunkHeaderByteLength(/* () */0) | 0, dataView);
    var match$2 = DataViewCommon$Wonderjs.getUint32_1((BufferUtils$Wonderjs.getHeaderByteLength(/* () */0) + BufferUtils$Wonderjs.getWDBChunkHeaderByteLength(/* () */0) | 0) + BufferUtils$Wonderjs.getWDBChunkHeaderByteLength(/* () */0) | 0, dataView);
    return /* tuple */[
            match[0],
            match$1[0],
            match$2[0]
          ];
  }
}

function _getStreamChunkData(streamChunkArr, chunkLengthData, totalLoadedByteLength, param) {
  var match = streamChunkArr.length > 0;
  if (match) {
    return streamChunkArr;
  } else {
    var dataView = LoadStreamWDBUtil$Wonderjs.buildLoadedDataView(totalLoadedByteLength, /* tuple */[
          param[0],
          param[1]
        ]);
    return ConvertStreamSystem$Wonderjs.getStreamChunkArr(chunkLengthData, dataView);
  }
}

function _getJsonChunkStr(jsonChunkLength, totalLoadedByteLength, param) {
  var dataView = LoadStreamWDBUtil$Wonderjs.buildLoadedDataView(totalLoadedByteLength, /* tuple */[
        param[0],
        param[1]
      ]);
  return BufferUtils$Wonderjs.getWDBJsonChunkStr(jsonChunkLength, dataView.buffer);
}

function _getBinBuffer(param, totalLoadedByteLength, totalUint8Array) {
  return new Uint8Array(totalUint8Array.buffer, (BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + BufferUtils$Wonderjs.alignedLength(param[0]) | 0) + BufferUtils$Wonderjs.alignedLength(param[1]) | 0, param[2]).buffer;
}

function _assembleAndStartLoop(assembleData, param, handleBeforeStartLoopFunc, state) {
  if (assembleData !== undefined) {
    return /* tuple */[
            state,
            assembleData
          ];
  } else {
    var match = AssembleStreamWDBSystem$Wonderjs.assemble(JSON.parse(_getJsonChunkStr(param[0], param[1], param[2])), param[3], state);
    var match$1 = match[3];
    var match$2 = match[2];
    var rootGameObject = match[1];
    var state$1 = Curry._2(handleBeforeStartLoopFunc, match[0], rootGameObject);
    DirectorMainService$Wonderjs.start(state$1);
    return /* tuple */[
            StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData),
            /* tuple */[
              rootGameObject,
              /* tuple */[
                match$2[0],
                match$2[1],
                match$2[2]
              ],
              /* tuple */[
                match$1[0],
                match$1[1],
                match$1[2]
              ]
            ]
          ];
  }
}

function _isLoadHeader(totalLoadedByteLength) {
  return totalLoadedByteLength < BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0);
}

function _computeHeaderJsonStreamChunkTotalByteLength(jsonChunkLength, streamChunkLength) {
  return (BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + BufferUtils$Wonderjs.alignedLength(jsonChunkLength) | 0) + BufferUtils$Wonderjs.alignedLength(streamChunkLength) | 0;
}

function _isLoadBinBufferChunk(headerJsonStreamChunkTotalByteLength, totalLoadedByteLength) {
  return Caml_obj.caml_greaterequal(totalLoadedByteLength, headerJsonStreamChunkTotalByteLength);
}

function _isLoadStreamChunk(jsonChunkLength, totalLoadedByteLength) {
  return totalLoadedByteLength >= (BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + jsonChunkLength | 0);
}

function _getTotalNeedLoadedByteLength(allChunkLengths, totalLoadedByteLength, param) {
  var allChunkLengths$1 = _getAllChunkLengths(allChunkLengths, totalLoadedByteLength, /* tuple */[
        param[0],
        param[1]
      ]);
  return ((BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + BufferUtils$Wonderjs.alignedLength(allChunkLengths$1[0]) | 0) + BufferUtils$Wonderjs.alignedLength(allChunkLengths$1[1]) | 0) + BufferUtils$Wonderjs.alignedLength(allChunkLengths$1[2]) | 0;
}

function _handleDone(controller, assembleData, param, handleWhenDoneFunc) {
  var totalUint8Array = param[2];
  var loadedUint8ArrayArr = param[1];
  var allChunkLengths = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("totalUint8Array should >= loaded data", "not"), (function (param) {
                  var totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);
                  return Contract$WonderLog.Operators[/* >= */7](totalUint8Array.byteLength, totalLoadedByteLength);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("load all data", "not"), (function (param) {
                        var totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);
                        return Contract$WonderLog.Operators[/* = */0](totalLoadedByteLength, _getTotalNeedLoadedByteLength(allChunkLengths, totalLoadedByteLength, /* tuple */[
                                        loadedUint8ArrayArr,
                                        totalUint8Array
                                      ]));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);
  var allChunkLengths$1 = _getAllChunkLengths(allChunkLengths, totalLoadedByteLength, /* tuple */[
        loadedUint8ArrayArr,
        totalUint8Array
      ]);
  var jsonChunkLength = allChunkLengths$1[0];
  return Most.drain(HandleIMGUISystem$Wonderjs.handleIMGUI(true, JSON.parse(_getJsonChunkStr(jsonChunkLength, totalLoadedByteLength, /* tuple */[
                            loadedUint8ArrayArr,
                            totalUint8Array
                          ])), _getBinBuffer(/* tuple */[
                        jsonChunkLength,
                        allChunkLengths$1[1],
                        allChunkLengths$1[2]
                      ], totalLoadedByteLength, totalUint8Array), StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData))).then((function (param) {
                _close(controller);
                if (assembleData !== undefined) {
                  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, Curry._2(handleWhenDoneFunc, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData), assembleData[0]));
                  return Promise.resolve(/* () */0);
                } else {
                  Log$WonderLog.error(Log$WonderLog.buildErrorMessage("read", "assembleData should exist, but actually is none", "", "", ""));
                  return Promise.resolve(/* () */0);
                }
              }));
}

function read(param, param$1, param$2, reader) {
  var loadBlobImageMap = param$2[5];
  var loadedStreamChunkArrWhichNotHasAllData = param$2[4];
  var nextStreamChunkIndex = param$2[3];
  var assembleData = param$2[2];
  var streamChunkArr = param$2[1];
  var allChunkLengths = param$2[0];
  var totalUint8Array = param$1[1];
  var loadedUint8ArrayArr = param$1[0];
  var handleWhenDoneFunc = param[4];
  var handleBeforeStartLoopFunc = param[3];
  var match = param[2];
  var handleWhenLoadingFunc = match[2];
  var wdbPath = match[1];
  var contentLength = match[0];
  var controller = param[1];
  var default11Image = param[0];
  return _readReader(reader).then((function (streamData) {
                var match = FetchExtend$Wonderjs.isDone(streamData);
                if (match) {
                  return _handleDone(controller, assembleData, /* tuple */[
                              allChunkLengths,
                              loadedUint8ArrayArr,
                              totalUint8Array
                            ], handleWhenDoneFunc);
                } else {
                  return _handleLoading(streamData, /* tuple */[
                              default11Image,
                              controller,
                              /* tuple */[
                                contentLength,
                                wdbPath,
                                handleWhenLoadingFunc
                              ],
                              handleBeforeStartLoopFunc,
                              handleWhenDoneFunc
                            ], /* tuple */[
                              loadedUint8ArrayArr,
                              totalUint8Array
                            ], /* tuple */[
                              allChunkLengths,
                              streamChunkArr,
                              assembleData,
                              nextStreamChunkIndex,
                              loadedStreamChunkArrWhichNotHasAllData,
                              loadBlobImageMap
                            ], reader);
                }
              }));
}

function _handleLoadBinBufferChunk(param, param$1, param$2, param$3, reader) {
  var allChunkLengths = param$3[0];
  var totalUint8Array = param$2[1];
  var loadedUint8ArrayArr = param$2[0];
  var handleWhenDoneFunc = param$1[4];
  var handleBeforeStartLoopFunc = param$1[3];
  var match = param$1[2];
  var handleWhenLoadingFunc = match[2];
  var wdbPath = match[1];
  var contentLength = match[0];
  var controller = param$1[1];
  var default11Image = param$1[0];
  var totalLoadedByteLength = param[2];
  var jsonChunkLength = param[0];
  var streamChunkArr = _getStreamChunkData(param$3[1], /* tuple */[
        jsonChunkLength,
        param[1]
      ], totalLoadedByteLength, /* tuple */[
        loadedUint8ArrayArr,
        totalUint8Array
      ]);
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  var match$1 = _assembleAndStartLoop(param$3[2], /* tuple */[
        jsonChunkLength,
        totalLoadedByteLength,
        /* tuple */[
          loadedUint8ArrayArr,
          totalUint8Array
        ],
        default11Image
      ], handleBeforeStartLoopFunc, state);
  return LoadStreamWDBBinBufferSystem$Wonderjs.handleBinBufferData(/* tuple */[
                param[3],
                totalLoadedByteLength,
                /* tuple */[
                  loadedUint8ArrayArr,
                  totalUint8Array
                ]
              ], /* tuple */[
                param$3[3],
                streamChunkArr,
                param$3[4],
                param$3[5]
              ], match$1[1], match$1[0]).then((function (param) {
                StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, param[0]);
                return read(/* tuple */[
                            default11Image,
                            controller,
                            /* tuple */[
                              contentLength,
                              wdbPath,
                              handleWhenLoadingFunc
                            ],
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc
                          ], /* tuple */[
                            loadedUint8ArrayArr,
                            totalUint8Array
                          ], /* tuple */[
                            allChunkLengths,
                            param[1],
                            param[2],
                            param[3],
                            param[4],
                            param[5]
                          ], reader);
              }));
}

function _handleLoading(streamData, param, param$1, param$2, reader) {
  var loadBlobImageMap = param$2[5];
  var loadedStreamChunkArrWhichNotHasAllData = param$2[4];
  var nextStreamChunkIndex = param$2[3];
  var assembleData = param$2[2];
  var streamChunkArr = param$2[1];
  var allChunkLengths = param$2[0];
  var totalUint8Array = param$1[1];
  var handleWhenDoneFunc = param[4];
  var handleBeforeStartLoopFunc = param[3];
  var match = param[2];
  var handleWhenLoadingFunc = match[2];
  var wdbPath = match[1];
  var contentLength = match[0];
  var controller = param[1];
  var default11Image = param[0];
  var value = streamData.value;
  var loadedUint8ArrayArr = ArrayService$Wonderjs.push(value, param$1[0]);
  var totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);
  Curry._3(handleWhenLoadingFunc, totalLoadedByteLength, contentLength, wdbPath);
  var match$1 = totalLoadedByteLength < BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0);
  if (match$1) {
    return read(/* tuple */[
                default11Image,
                controller,
                /* tuple */[
                  contentLength,
                  wdbPath,
                  handleWhenLoadingFunc
                ],
                handleBeforeStartLoopFunc,
                handleWhenDoneFunc
              ], /* tuple */[
                loadedUint8ArrayArr,
                totalUint8Array
              ], /* tuple */[
                allChunkLengths,
                streamChunkArr,
                assembleData,
                nextStreamChunkIndex,
                loadedStreamChunkArrWhichNotHasAllData,
                loadBlobImageMap
              ], reader);
  } else {
    var allChunkLengths$1 = _getAllChunkLengths(allChunkLengths, totalLoadedByteLength, /* tuple */[
          loadedUint8ArrayArr,
          totalUint8Array
        ]);
    var streamChunkLength = allChunkLengths$1[1];
    var jsonChunkLength = allChunkLengths$1[0];
    var headerJsonStreamChunkTotalByteLength = _computeHeaderJsonStreamChunkTotalByteLength(jsonChunkLength, streamChunkLength);
    var match$2 = Caml_obj.caml_greaterequal(totalLoadedByteLength, headerJsonStreamChunkTotalByteLength);
    if (match$2) {
      return _handleLoadBinBufferChunk(/* tuple */[
                  jsonChunkLength,
                  streamChunkLength,
                  totalLoadedByteLength,
                  headerJsonStreamChunkTotalByteLength
                ], /* tuple */[
                  default11Image,
                  controller,
                  /* tuple */[
                    contentLength,
                    wdbPath,
                    handleWhenLoadingFunc
                  ],
                  handleBeforeStartLoopFunc,
                  handleWhenDoneFunc
                ], /* tuple */[
                  loadedUint8ArrayArr,
                  totalUint8Array
                ], /* tuple */[
                  allChunkLengths$1,
                  streamChunkArr,
                  assembleData,
                  nextStreamChunkIndex,
                  loadedStreamChunkArrWhichNotHasAllData,
                  loadBlobImageMap
                ], reader);
    } else {
      return read(/* tuple */[
                  default11Image,
                  controller,
                  /* tuple */[
                    contentLength,
                    wdbPath,
                    handleWhenLoadingFunc
                  ],
                  handleBeforeStartLoopFunc,
                  handleWhenDoneFunc
                ], /* tuple */[
                  loadedUint8ArrayArr,
                  totalUint8Array
                ], /* tuple */[
                  allChunkLengths$1,
                  streamChunkArr,
                  assembleData,
                  nextStreamChunkIndex,
                  loadedStreamChunkArrWhichNotHasAllData,
                  loadBlobImageMap
                ], reader);
    }
  }
}

export {
  _readReader ,
  _close ,
  _getTotalLoadedByteLength ,
  _getAllChunkLengths ,
  _getStreamChunkData ,
  _getJsonChunkStr ,
  _getBinBuffer ,
  _assembleAndStartLoop ,
  _isLoadHeader ,
  _computeHeaderJsonStreamChunkTotalByteLength ,
  _isLoadBinBufferChunk ,
  _isLoadStreamChunk ,
  _getTotalNeedLoadedByteLength ,
  _handleDone ,
  read ,
  _handleLoadBinBufferChunk ,
  _handleLoading ,
  
}
/* most Not a pure module */
