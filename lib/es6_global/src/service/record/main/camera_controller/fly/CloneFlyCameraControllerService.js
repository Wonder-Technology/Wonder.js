

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateFlyCameraControllerService$Wonderjs from "./CreateFlyCameraControllerService.js";
import * as OperateFlyCameraControllerService$Wonderjs from "./OperateFlyCameraControllerService.js";

function handleCloneComponent(sourceComponent, countRangeArr, record) {
  var moveSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetMoveSpeed(sourceComponent, record);
  var wheelSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetWheelSpeed(sourceComponent, record);
  var rotateSpeed = OperateFlyCameraControllerService$Wonderjs.unsafeGetRotateSpeed(sourceComponent, record);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = CreateFlyCameraControllerService$Wonderjs.create(param[0]);
                var index = match[1];
                return /* tuple */[
                        OperateFlyCameraControllerService$Wonderjs.setRotateSpeed(index, rotateSpeed, OperateFlyCameraControllerService$Wonderjs.setWheelSpeed(index, wheelSpeed, OperateFlyCameraControllerService$Wonderjs.setMoveSpeed(index, moveSpeed, match[0]))),
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
