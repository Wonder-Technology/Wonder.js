

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateTypeArrayTransformService$Wonderjs from "../../../../service/record/all/transform/CreateTypeArrayTransformService.js";

function _createTypeArrays(buffer, count, state) {
  var match = CreateTypeArrayTransformService$Wonderjs.createTypeArrays(buffer, count);
  state[/* transformRecord */16] = /* record */[
    /* localToWorldMatrices */match[0],
    /* localPositions */match[1],
    /* localRotations */match[2],
    /* localScales */match[3],
    /* localToWorldMatrixCacheMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* normalMatrixCacheMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var transformData = data.transformData;
                var buffer = transformData.buffer;
                var count = data.bufferData.transformCount;
                StateRenderWorkerService$Wonderjs.setState(stateData, _createTypeArrays(buffer, count, state));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
