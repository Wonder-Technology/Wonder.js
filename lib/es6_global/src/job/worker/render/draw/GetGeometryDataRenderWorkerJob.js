

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordGeometryRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/geometry/RecordGeometryRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var geometryData = data.renderData.geometryData;
                var indicesTypeMap = geometryData.indicesTypeMap;
                var geometeryRecord = RecordGeometryRenderWorkerService$Wonderjs.getRecord(state);
                state[/* geometryRecord */20] = /* record */[
                  /* vertices */geometeryRecord[/* vertices */0],
                  /* texCoords */geometeryRecord[/* texCoords */1],
                  /* normals */geometeryRecord[/* normals */2],
                  /* indices16 */geometeryRecord[/* indices16 */3],
                  /* indices32 */geometeryRecord[/* indices32 */4],
                  /* verticesInfos */geometeryRecord[/* verticesInfos */5],
                  /* texCoordsInfos */geometeryRecord[/* texCoordsInfos */6],
                  /* normalsInfos */geometeryRecord[/* normalsInfos */7],
                  /* indicesInfos */geometeryRecord[/* indicesInfos */8],
                  /* indicesTypeMap */indicesTypeMap
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
