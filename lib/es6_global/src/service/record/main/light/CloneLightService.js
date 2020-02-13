

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function handleCloneComponent(sourceComponent, countRangeArr, param, record) {
  var setDataFunc = param[2];
  var createFunc = param[0];
  var dataTuple = param[1](sourceComponent, record);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = Curry._1(createFunc, param[0]);
                var index = match[1];
                var record = setDataFunc(index, dataTuple, match[0]);
                return /* tuple */[
                        record,
                        ArrayService$Wonderjs.push(index, param[1])
                      ];
              }), /* tuple */[
              record,
              /* array */[]
            ], countRangeArr);
}

export {
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
