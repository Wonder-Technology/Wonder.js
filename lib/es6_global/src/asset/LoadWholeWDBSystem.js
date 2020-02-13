

import * as Most from "most";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as FetchCommon$Wonderjs from "./FetchCommon.js";
import * as AssembleWholeWDBSystem$Wonderjs from "./assemble/AssembleWholeWDBSystem.js";

function load(wdbPath, param, param$1, state) {
  var handleWhenLoadingFunc = param$1[1];
  var isLoadImage = param[4];
  var isRenderLight = param[3];
  var isActiveCamera = param[2];
  var isBindEvent = param[1];
  var isSetIMGUIFunc = param[0];
  return Most.flatMap((function (wdb) {
                return AssembleWholeWDBSystem$Wonderjs.assemble(wdb, /* tuple */[
                            isSetIMGUIFunc,
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
                      }))));
}

export {
  load ,
  
}
/* most Not a pure module */
