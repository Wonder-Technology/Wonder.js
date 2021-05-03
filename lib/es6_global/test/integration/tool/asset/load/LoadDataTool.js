

import * as Most from "most";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as LoaderManagerSystem$Wonderjs from "../../../../../src/asset/LoaderManagerSystem.js";

function load(jsonPathArr, fetchFunc, $staropt$star, param) {
  var nextFunc = $staropt$star !== undefined ? $staropt$star : (function (record) {
        return /* () */0;
      });
  return Most.forEach(nextFunc, LoaderManagerSystem$Wonderjs.loadConfig(jsonPathArr, fetchFunc, MainStateTool$Wonderjs.getStateData(/* () */0)));
}

function buildFakeFetchJsonResponse(jsonStr) {
  return Promise.resolve({
              json: (function (param) {
                  return Promise.resolve(JSON.parse(jsonStr));
                })
            });
}

export {
  load ,
  buildFakeFetchJsonResponse ,
  
}
/* most Not a pure module */
