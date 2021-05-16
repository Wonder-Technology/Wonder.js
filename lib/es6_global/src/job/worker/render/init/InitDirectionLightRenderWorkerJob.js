

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../../service/record/render_worker/setting/BufferRenderWorkerSettingService.js";
import * as CreateTypeArrayAllDirectionLightService$Wonderjs from "../../../../service/record/all/light/direction/CreateTypeArrayAllDirectionLightService.js";
import * as RecordDirectionLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/direction/RecordDirectionLightRenderWorkerService.js";

function _createRecordWithCreatedTypeArrays(buffer, count, index, state) {
  var match = CreateTypeArrayAllDirectionLightService$Wonderjs.createTypeArrays(buffer, count);
  state[/* directionLightRecord */21] = /* record */[
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
  state[/* directionLightRecord */21] = /* record */[
    /* index */init[/* index */0],
    /* directionMap */init[/* directionMap */1],
    /* renderLightArr */directionLightData.renderLightArr,
    /* colors */init[/* colors */3],
    /* intensities */init[/* intensities */4]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var settingRecord = state[/* settingRecord */1];
                var data = MessageService$Wonderjs.getRecord(e);
                var directionLightData = data.directionLightData;
                var buffer = directionLightData.buffer;
                var count = BufferRenderWorkerSettingService$Wonderjs.unsafeGetPointLightCount(settingRecord);
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
