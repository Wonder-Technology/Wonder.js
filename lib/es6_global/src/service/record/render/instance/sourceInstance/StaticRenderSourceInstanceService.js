

import * as StaticTransformService$Wonderjs from "../../../../primitive/instance/StaticTransformService.js";
import * as MarkIsSendTransformMatrixDataService$Wonderjs from "../../../../primitive/instance/MarkIsSendTransformMatrixDataService.js";

function isTransformStatic(sourceInstance, param) {
  return StaticTransformService$Wonderjs.isTransformStatic(sourceInstance, param[/* isTransformStatics */2]);
}

function markIsSendTransformMatrixData(sourceInstance, isSend, record) {
  return /* record */[
          /* objectInstanceTransformIndexMap */record[/* objectInstanceTransformIndexMap */0],
          /* objectInstanceTransformCollections */record[/* objectInstanceTransformCollections */1],
          /* isTransformStatics */record[/* isTransformStatics */2],
          /* matrixInstanceBufferCapacityMap */record[/* matrixInstanceBufferCapacityMap */3],
          /* matrixFloat32ArrayMap */record[/* matrixFloat32ArrayMap */4],
          /* isSendTransformMatrixDataMap */MarkIsSendTransformMatrixDataService$Wonderjs.markIsSendTransformMatrixData(sourceInstance, isSend, record[/* isSendTransformMatrixDataMap */5])
        ];
}

export {
  isTransformStatic ,
  markIsSendTransformMatrixData ,
  
}
/* StaticTransformService-Wonderjs Not a pure module */
