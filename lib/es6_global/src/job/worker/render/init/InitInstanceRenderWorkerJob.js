

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../../service/record/render_worker/setting/BufferRenderWorkerSettingService.js";
import * as CreateTypeArraySourceInstanceService$Wonderjs from "../../../../service/record/all/instance/CreateTypeArraySourceInstanceService.js";

function _createTypeArrays(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance, state) {
  var match = CreateTypeArraySourceInstanceService$Wonderjs.createTypeArrays(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance);
  var init = state[/* sourceInstanceRecord */11];
  state[/* sourceInstanceRecord */11] = /* record */[
    /* objectInstanceTransformIndexMap */init[/* objectInstanceTransformIndexMap */0],
    /* objectInstanceTransformCollections */Caml_option.some(match[0]),
    /* isTransformStatics */Caml_option.some(match[1]),
    /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
    /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
    /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var settingRecord = state[/* settingRecord */1];
                var data = MessageService$Wonderjs.getRecord(e);
                var sourceInstanceData = data.sourceInstanceData;
                var state$1 = _createTypeArrays(sourceInstanceData.buffer, BufferRenderWorkerSettingService$Wonderjs.getSourceInstanceCount(settingRecord), BufferRenderWorkerSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord), state);
                var init = state$1[/* sourceInstanceRecord */11];
                state$1[/* sourceInstanceRecord */11] = /* record */[
                  /* objectInstanceTransformIndexMap */sourceInstanceData.objectInstanceTransformIndexMap,
                  /* objectInstanceTransformCollections */init[/* objectInstanceTransformCollections */1],
                  /* isTransformStatics */init[/* isTransformStatics */2],
                  /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */3],
                  /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */4],
                  /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */5]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state$1);
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
