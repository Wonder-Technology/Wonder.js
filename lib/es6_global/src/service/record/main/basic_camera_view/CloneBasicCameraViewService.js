

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateBasicCameraViewService$Wonderjs from "./CreateBasicCameraViewService.js";

function handleCloneComponent(_, countRangeArr, record) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, _) {
                var match = CreateBasicCameraViewService$Wonderjs.create(param[0]);
                return /* tuple */[
                        match[0],
                        ArrayService$Wonderjs.push(match[1], param[1])
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
