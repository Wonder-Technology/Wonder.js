

import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../../service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as InitMaterialRenderWorkerJobUtils$Wonderjs from "./utils/InitMaterialRenderWorkerJobUtils.js";
import * as CreateTypeArrayAllBasicMaterialService$Wonderjs from "../../../../service/record/all/material/basic/CreateTypeArrayAllBasicMaterialService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/RecordBasicMaterialRenderWorkerService.js";
import * as CreateInitBasicMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/basic/CreateInitBasicMaterialStateRenderWorkerService.js";

function _createTypeArrays(buffer, basicMaterialCount, state) {
  var match = CreateTypeArrayAllBasicMaterialService$Wonderjs.createTypeArrays(buffer, basicMaterialCount);
  var basicMaterialRecord = RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  state[/* basicMaterialRecord */12] = /* record */[
    /* shaderIndices */Caml_option.some(match[0]),
    /* colors */Caml_option.some(match[1]),
    /* isDepthTests */Caml_option.some(match[2]),
    /* alphas */Caml_option.some(match[3]),
    /* index */basicMaterialRecord[/* index */4],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */5],
    /* isSourceInstanceMap */basicMaterialRecord[/* isSourceInstanceMap */6]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var basicMaterialData = data.basicMaterialData;
                var basicMaterialCount = data.bufferData.basicMaterialCount;
                StateRenderWorkerService$Wonderjs.setState(stateData, InitMaterialRenderWorkerJobUtils$Wonderjs.initMaterials(/* tuple */[
                          CreateInitBasicMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState,
                          InitInitBasicMaterialService$Wonderjs.init
                        ], RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state)[/* isSourceInstanceMap */6], _createTypeArrays(basicMaterialData.buffer, basicMaterialCount, state)));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
