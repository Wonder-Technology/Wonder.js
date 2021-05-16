

import * as Most from "most";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as FetchCommon$Wonderjs from "./FetchCommon.js";
import * as AssembleUtils$Wonderjs from "./utils/AssembleUtils.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as ConvertStreamSystem$Wonderjs from "./converter/ConvertStreamSystem.js";
import * as StateDataMainService$Wonderjs from "../service/state/main/state/StateDataMainService.js";
import * as ReadStreamChunkSystem$Wonderjs from "./loader/ReadStreamChunkSystem.js";
import * as AssembleWholeWDBSystem$Wonderjs from "./assemble/AssembleWholeWDBSystem.js";
import * as OperateLoadMainService$Wonderjs from "../service/state/main/load/OperateLoadMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _handleNotSupportStreamLoad(response, wdbPath, param, state) {
  var handleWhenLoadWholeWDBFunc = param[1];
  var handleWhenLoadingFunc = param[0];
  Log$WonderLog.warn("your browser does not seem to have the Streams API yet, fallback to load whole wdb");
  return response.arrayBuffer().then((function (wdb) {
                  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateLoadMainService$Wonderjs.markCanExecScriptAllEventFunction(false, state));
                  Curry._3(handleWhenLoadingFunc, wdb.byteLength, FetchCommon$Wonderjs.getContentLength(response), wdbPath);
                  return Promise.resolve(wdb);
                })).then((function (wdb) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
                var state$1 = OperateLoadMainService$Wonderjs.markCanExecScriptAllEventFunction(true, state);
                return Most.drain(Most.tap((function (param) {
                                    return Curry._3(handleWhenLoadWholeWDBFunc, param[0], param[1], param[2]);
                                  }), AssembleWholeWDBSystem$Wonderjs.assemble(wdb, /* tuple */[
                                      true,
                                      true,
                                      true,
                                      true,
                                      true
                                    ], state$1))).then((function (param) {
                              return Promise.resolve(/* () */0);
                            }));
              }));
}

function _streamLoad(response, param, param$1, state) {
  var handleWhenDoneFunc = param$1[2];
  var handleBeforeStartLoopFunc = param$1[1];
  var handleWhenLoadingFunc = param$1[0];
  var default11Image = param[1];
  var wdbPath = param[0];
  var contentLength = FetchCommon$Wonderjs.getContentLength(response);
  var totalUint8Array = new Uint8Array(contentLength);
  new ReadableStream({
        start: (function (controller) {
            var reader = FetchCommon$Wonderjs.getReader(response);
            return ReadStreamChunkSystem$Wonderjs.read(/* tuple */[
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
                        /* array */[],
                        totalUint8Array
                      ], /* tuple */[
                        undefined,
                        /* array */[],
                        undefined,
                        0,
                        /* array */[],
                        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                      ], reader);
          })
      });
  return Promise.resolve(/* () */0);
}

function load(wdbPath, param, state) {
  var handleWhenLoadWholeWDBFunc = param[4];
  var handleWhenDoneFunc = param[3];
  var handleBeforeStartLoopFunc = param[2];
  var handleWhenLoadingFunc = param[1];
  var fetchFunc = param[0];
  var match = ConvertStreamSystem$Wonderjs.getDefault11ImageUint8ArrayData(/* () */0);
  return Most.flatMap((function (image) {
                return Most.fromPromise(fetchFunc(wdbPath).then((function (response) {
                                  var match = !response.ok;
                                  if (match) {
                                    var status = response.status;
                                    var statusText = response.statusText;
                                    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("streamLoad", "" + (String(status) + (" " + (String(statusText) + ""))), "", "", ""));
                                  } else {
                                    var match$1 = !FetchCommon$Wonderjs.isSupportStreamLoad(response);
                                    if (match$1) {
                                      return _handleNotSupportStreamLoad(response, wdbPath, /* tuple */[
                                                  handleWhenLoadingFunc,
                                                  handleWhenLoadWholeWDBFunc
                                                ], state);
                                    } else {
                                      return _streamLoad(response, /* tuple */[
                                                  wdbPath,
                                                  image
                                                ], /* tuple */[
                                                  handleWhenLoadingFunc,
                                                  handleBeforeStartLoopFunc,
                                                  handleWhenDoneFunc,
                                                  handleWhenLoadWholeWDBFunc
                                                ], state);
                                    }
                                  }
                                })));
              }), AssembleUtils$Wonderjs.buildLoadImageStream(match[0].buffer, match[1], match[2]));
}

export {
  _handleNotSupportStreamLoad ,
  _streamLoad ,
  load ,
  
}
/* most Not a pure module */
