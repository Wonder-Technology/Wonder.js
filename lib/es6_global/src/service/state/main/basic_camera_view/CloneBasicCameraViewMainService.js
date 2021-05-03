

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ActiveBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/ActiveBasicCameraViewService.js";
import * as CreateBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/CreateBasicCameraViewService.js";

function handleCloneComponent(sourceComponent, countRangeArr, state) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = CreateBasicCameraViewService$Wonderjs.create(param[0]);
          var index = match[1];
          var record = ActiveBasicCameraViewService$Wonderjs.unactive(index, match[0]);
          return /* tuple */[
                  record,
                  ArrayService$Wonderjs.push(index, param[1])
                ];
        }), /* tuple */[
        basicCameraViewRecord,
        /* array */[]
      ], countRangeArr);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* basicCameraViewRecord */13] = match[0], newrecord),
          match[1]
        ];
}

export {
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
