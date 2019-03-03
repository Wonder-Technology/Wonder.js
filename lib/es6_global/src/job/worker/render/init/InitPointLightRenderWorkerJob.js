

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../../service/record/render_worker/setting/BufferRenderWorkerSettingService.js";
import * as CreateTypeArrayPointLightService$Wonderjs from "../../../../service/record/all/light/point/CreateTypeArrayPointLightService.js";
import * as RecordPointLightRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/light/point/RecordPointLightRenderWorkerService.js";

function _createRecordWithCreatedTypeArrays(buffer, count, index, state) {
  var match = CreateTypeArrayPointLightService$Wonderjs.createTypeArrays(buffer, count);
  state[/* pointLightRecord */20] = /* record */[
    /* index */index,
    /* positionMap */undefined,
    /* renderLightArr */undefined,
    /* colors */match[0],
    /* intensities */match[1],
    /* constants */match[2],
    /* linears */match[3],
    /* quadratics */match[4],
    /* ranges */match[5]
  ];
  return state;
}

function _getData(pointLightData, state) {
  var init = RecordPointLightRenderWorkerService$Wonderjs.getRecord(state);
  state[/* pointLightRecord */20] = /* record */[
    /* index */init[/* index */0],
    /* positionMap */init[/* positionMap */1],
    /* renderLightArr */pointLightData.renderLightArr,
    /* colors */init[/* colors */3],
    /* intensities */init[/* intensities */4],
    /* constants */init[/* constants */5],
    /* linears */init[/* linears */6],
    /* quadratics */init[/* quadratics */7],
    /* ranges */init[/* ranges */8]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var settingRecord = state[/* settingRecord */1];
                var data = MessageService$Wonderjs.getRecord(e);
                var pointLightData = data.pointLightData;
                var buffer = pointLightData.buffer;
                var count = BufferRenderWorkerSettingService$Wonderjs.unsafeGetPointLightCount(settingRecord);
                StateRenderWorkerService$Wonderjs.setState(stateData, _getData(pointLightData, _createRecordWithCreatedTypeArrays(buffer, count, pointLightData.index, state)));
                return e;
              }));
}

export {
  _createRecordWithCreatedTypeArrays ,
  _getData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
