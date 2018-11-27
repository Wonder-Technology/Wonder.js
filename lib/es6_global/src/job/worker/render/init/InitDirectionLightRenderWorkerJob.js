

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as BufferDirectionLightService$Wonderjs from "../../../../service/record/main/light/direction/BufferDirectionLightService.js";
import * as CreateTypeArrayDirectionLightService$Wonderjs from "../../../../service/record/all/light/direction/CreateTypeArrayDirectionLightService.js";
import * as RecordDirectionLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/direction/RecordDirectionLightRenderWorkerService.js";

function _createRecordWithCreatedTypeArrays(buffer, count, index, state) {
  var match = CreateTypeArrayDirectionLightService$Wonderjs.createTypeArrays(buffer, count);
  state[/* directionLightRecord */19] = /* record */[
    /* index */index,
    /* directionMap */undefined,
    /* renderLightArr */undefined,
    /* colors */match[0],
    /* intensities */match[1]
  ];
  return state;
}

function _getData(directionLightData, state) {
  var init = RecordDirectionLightRenderWorkerService$Wonderjs.getRecord(state);
  state[/* directionLightRecord */19] = /* record */[
    /* index */init[/* index */0],
    /* directionMap */init[/* directionMap */1],
    /* renderLightArr */directionLightData.renderLightArr,
    /* colors */init[/* colors */3],
    /* intensities */init[/* intensities */4]
  ];
  return state;
}

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var directionLightData = data.directionLightData;
                var buffer = directionLightData.buffer;
                var count = BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0);
                StateRenderWorkerService$Wonderjs.setState(stateData, _getData(directionLightData, _createRecordWithCreatedTypeArrays(buffer, count, directionLightData.index, state)));
                return e;
              }));
}

export {
  _createRecordWithCreatedTypeArrays ,
  _getData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
