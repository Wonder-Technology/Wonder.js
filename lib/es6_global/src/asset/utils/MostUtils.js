

import * as Most from "most";
import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _isFromEventStream (stream){
    var source = stream.source;
    return !!source.event && !!source.source;
  };

function concatArray(streamArr) {
  var match = streamArr.length;
  if (match !== 0) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (stream1, stream2) {
                  _isFromEventStream(stream1) === true;
                  return stream1.concat(stream2);
                }), Caml_array.caml_array_get(streamArr, 0), streamArr.slice(1));
  } else {
    return Most.just(1);
  }
}

function concatStreamFuncArray(stateData, streamFuncArr) {
  Contract$WonderLog.requireCheck((function (param) {
          var count = streamFuncArr.length;
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("stream count >= 2", "is " + (String(count) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* >= */7](count, 2);
                }));
          Contract$WonderLog.test("the first stream should be fromEvent stream", (function (param) {
                  return Contract$WonderLog.assertJsTrue(_isFromEventStream(Caml_array.caml_array_get(streamFuncArr, 0)));
                }));
          return Contract$WonderLog.test("only the first stream should be fromEvent stream", (function (param) {
                        return ArrayService$WonderCommonlib.forEach((function (stream) {
                                      return Contract$WonderLog.assertJsFalse(_isFromEventStream(stream));
                                    }), streamFuncArr.slice(1));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (stream1, streamFunc2) {
                return Most.concatMap((function (e) {
                              return Curry._2(streamFunc2, e, stateData);
                            }), stream1);
              }), Curry._2(Caml_array.caml_array_get(streamFuncArr, 0), undefined, stateData), streamFuncArr.slice(1));
}

function ignore(stream) {
  return Most.map((function (param) {
                return /* () */0;
              }), stream);
}

function concatExecStreamArr(buildStreamFuncArr) {
  var match = buildStreamFuncArr.length;
  if (match !== 0) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (stream1, buildStream2Func) {
                  var match = _isFromEventStream(stream1) === true;
                  if (match) {
                    return Most.concatMap((function (param) {
                                  return buildStream2Func();
                                }), stream1);
                  } else {
                    return Most.concatMap((function (param) {
                                  return buildStream2Func();
                                }), stream1);
                  }
                }), buildStreamFuncArr[0](), buildStreamFuncArr.slice(1));
  } else {
    return Most.just(1);
  }
}

function callStreamFunc(func) {
  return Most.flatMap((function (func) {
                return Curry._1(func, /* () */0);
              }), Most.just(func));
}

function callFunc(func) {
  return Most.map((function (func) {
                return Curry._1(func, /* () */0);
              }), Most.just(func));
}

export {
  _isFromEventStream ,
  concatArray ,
  concatStreamFuncArray ,
  ignore ,
  concatExecStreamArr ,
  callStreamFunc ,
  callFunc ,
  
}
/* most Not a pure module */
