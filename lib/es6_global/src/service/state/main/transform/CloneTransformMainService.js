

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DirtyTransformService$Wonderjs from "../../../record/main/transform/DirtyTransformService.js";
import * as CreateTransformMainService$Wonderjs from "./CreateTransformMainService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../record/main/transform/ModelMatrixTransformService.js";

function handleCloneComponent(sourceComponent, countRangeArr, state) {
  var settingRecord = state[/* settingRecord */0];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localPosition = ModelMatrixTransformService$Wonderjs.getLocalPositionTuple(sourceComponent, transformRecord[/* localPositions */3]);
  var localRotation = ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(sourceComponent, transformRecord[/* localRotations */4]);
  var localScale = ModelMatrixTransformService$Wonderjs.getLocalScaleTuple(sourceComponent, transformRecord[/* localScales */5]);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = CreateTransformMainService$Wonderjs.createWithoutMarkNotDirtyWithRecord(settingRecord, param[0]);
          var index = match[1];
          return /* tuple */[
                  ModelMatrixTransformService$Wonderjs.setLocalScaleByTuple(index, localScale, ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(index, localRotation, ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(index, localPosition, match[0]))),
                  ArrayService$Wonderjs.push(index, param[1])
                ];
        }), /* tuple */[
        transformRecord,
        /* array */[]
      ], countRangeArr);
  state[/* transformRecord */11] = DirtyTransformService$Wonderjs.mark(sourceComponent, true, match[0]);
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
