

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateTypeArrayAllGeometryService$Wonderjs from "../../../../service/record/all/geometry/CreateTypeArrayAllGeometryService.js";

function _createTypeArrays(buffer, param, indicesTypeMap, state) {
  var match = CreateTypeArrayAllGeometryService$Wonderjs.createTypeArrays(buffer, param[0], param[1]);
  state[/* geometryRecord */20] = /* record */[
    /* vertices */match[0],
    /* texCoords */match[1],
    /* normals */match[2],
    /* indices16 */match[3],
    /* indices32 */match[4],
    /* verticesInfos */match[5],
    /* texCoordsInfos */match[6],
    /* normalsInfos */match[7],
    /* indicesInfos */match[8],
    /* indicesTypeMap */indicesTypeMap
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var geometryData = data.geometryData;
                var buffer = geometryData.buffer;
                var indicesTypeMap = geometryData.indicesTypeMap;
                var geometryPointCount = data.bufferData.geometryPointCount;
                var geometryCount = data.bufferData.geometryCount;
                StateRenderWorkerService$Wonderjs.setState(stateData, _createTypeArrays(buffer, /* tuple */[
                          geometryPointCount,
                          geometryCount
                        ], indicesTypeMap, state));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
