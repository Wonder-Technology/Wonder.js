

import * as Most from "most";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as FetchCommon$Wonderjs from "./FetchCommon.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as StateDataMainService$Wonderjs from "../service/state/main/state/StateDataMainService.js";
import * as AssembleWholeWDBSystem$Wonderjs from "./assemble/AssembleWholeWDBSystem.js";
import * as OperateLoadMainService$Wonderjs from "../service/state/main/load/OperateLoadMainService.js";

function load(wdbPath, param, param$1, state) {
  var handleWhenLoadingFunc = param$1[1];
  var isLoadImage = param[4];
  var isRenderLight = param[3];
  var isActiveCamera = param[2];
  var isBindEvent = param[1];
  var isHandleIMGUI = param[0];
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, OperateLoadMainService$Wonderjs.markCanExecScriptAllEventFunction(false, state));
  return Most.map((function (param) {
                return /* tuple */[
                        OperateLoadMainService$Wonderjs.markCanExecScriptAllEventFunction(true, param[0]),
                        param[1],
                        param[2]
                      ];
              }), Most.flatMap((function (wdb) {
                    return AssembleWholeWDBSystem$Wonderjs.assemble(wdb, /* tuple */[
                                isHandleIMGUI,
                                isBindEvent,
                                isActiveCamera,
                                isRenderLight,
                                isLoadImage
                              ], state);
                  }), Most.fromPromise(param$1[0](wdbPath).then((function (response) {
                              Curry._2(handleWhenLoadingFunc, FetchCommon$Wonderjs.getContentLength(response), wdbPath);
                              return Promise.resolve(response);
                            })).then((function (prim) {
                            return prim.arrayBuffer();
                          })))));
}

export {
  load ,
  
}
/* most Not a pure module */
