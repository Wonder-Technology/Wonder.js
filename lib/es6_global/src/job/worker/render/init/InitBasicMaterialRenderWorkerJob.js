

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../../service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as InitMaterialRenderWorkerJobUtils$Wonderjs from "./utils/InitMaterialRenderWorkerJobUtils.js";
import * as CreateTypeArrayBasicMaterialService$Wonderjs from "../../../../service/record/all/material/basic/CreateTypeArrayBasicMaterialService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/RecordBasicMaterialRenderWorkerService.js";
import * as CreateInitBasicMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/CreateInitBasicMaterialStateRenderWorkerService.js";

function _createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial, state) {
  var match = CreateTypeArrayBasicMaterialService$Wonderjs.createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial);
  var basicMaterialRecord = RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  state[/* basicMaterialRecord */12] = /* record */[
    /* shaderIndices */Caml_option.some(match[0]),
    /* colors */Caml_option.some(match[1]),
    /* textureIndices */Caml_option.some(match[2]),
    /* mapUnits */Caml_option.some(match[3]),
    /* isDepthTests */Caml_option.some(match[4]),
    /* alphas */Caml_option.some(match[5]),
    /* index */basicMaterialRecord[/* index */6],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */7],
    /* isSourceInstanceMap */basicMaterialRecord[/* isSourceInstanceMap */8]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var basicMaterialData = data.basicMaterialData;
                var basicMaterialCount = data.bufferData.basicMaterialCount;
                var textureCountPerMaterial = data.bufferData.textureCountPerMaterial;
                StateRenderWorkerService$Wonderjs.setState(stateData, InitMaterialRenderWorkerJobUtils$Wonderjs.initMaterials(/* tuple */[
                          CreateInitBasicMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState,
                          InitInitBasicMaterialService$Wonderjs.init
                        ], RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state)[/* isSourceInstanceMap */8], _createTypeArrays(basicMaterialData.buffer, basicMaterialCount, textureCountPerMaterial, state)));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
