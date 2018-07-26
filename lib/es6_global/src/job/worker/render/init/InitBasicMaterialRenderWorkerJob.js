

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../../service/state/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as InitMaterialRenderWorkerJobUtils$Wonderjs from "./utils/InitMaterialRenderWorkerJobUtils.js";
import * as CreateTypeArrayBasicMaterialService$Wonderjs from "../../../../service/record/all/material/basic/CreateTypeArrayBasicMaterialService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/RecordBasicMaterialRenderWorkerService.js";
import * as CreateInitBasicMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/CreateInitBasicMaterialStateRenderWorkerService.js";

function _createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial, state) {
  var match = CreateTypeArrayBasicMaterialService$Wonderjs.createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial);
  var basicMaterialRecord = RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  state[/* basicMaterialRecord */12] = /* record */[
    /* shaderIndices */Js_primitive.some(match[0]),
    /* colors */Js_primitive.some(match[1]),
    /* textureIndices */Js_primitive.some(match[2]),
    /* mapUnits */Js_primitive.some(match[3]),
    /* index */basicMaterialRecord[/* index */4],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */5],
    /* isSourceInstanceMap */basicMaterialRecord[/* isSourceInstanceMap */6]
  ];
  return state;
}

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var basicMaterialData = data.basicMaterialData;
                var basicMaterialCount = data.bufferData.basicMaterialCount;
                var textureCountPerMaterial = data.bufferData.textureCountPerMaterial;
                StateRenderWorkerService$Wonderjs.setState(stateData, InitMaterialRenderWorkerJobUtils$Wonderjs.initMaterials(/* tuple */[
                          CreateInitBasicMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState,
                          InitInitBasicMaterialService$Wonderjs.init
                        ], RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state)[/* isSourceInstanceMap */6], _createTypeArrays(basicMaterialData.buffer, basicMaterialCount, textureCountPerMaterial, state)));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
