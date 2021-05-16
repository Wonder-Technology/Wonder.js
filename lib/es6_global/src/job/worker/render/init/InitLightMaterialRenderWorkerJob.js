

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../../service/state/init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as InitMaterialRenderWorkerJobUtils$Wonderjs from "./utils/InitMaterialRenderWorkerJobUtils.js";
import * as CreateTypeArrayAllLightMaterialService$Wonderjs from "../../../../service/record/all/material/light/CreateTypeArrayAllLightMaterialService.js";
import * as RecordLightMaterialRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/light/RecordLightMaterialRenderWorkerService.js";
import * as CreateInitLightMaterialStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/material/light/CreateInitLightMaterialStateRenderWorkerService.js";

function _createTypeArrays(buffer, lightMaterialCount, state) {
  var match = CreateTypeArrayAllLightMaterialService$Wonderjs.createTypeArrays(buffer, lightMaterialCount);
  var lightMaterialRecord = RecordLightMaterialRenderWorkerService$Wonderjs.getRecord(state);
  state[/* lightMaterialRecord */13] = /* record */[
    /* shaderIndices */Caml_option.some(match[0]),
    /* diffuseColors */Caml_option.some(match[1]),
    /* specularColors */Caml_option.some(match[2]),
    /* shininess */Caml_option.some(match[3]),
    /* diffuseTextureIndices */Caml_option.some(match[4]),
    /* specularTextureIndices */Caml_option.some(match[5]),
    /* index */lightMaterialRecord[/* index */6],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */7],
    /* isSourceInstanceMap */lightMaterialRecord[/* isSourceInstanceMap */8]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var lightMaterialData = data.lightMaterialData;
                var lightMaterialCount = data.bufferData.lightMaterialCount;
                StateRenderWorkerService$Wonderjs.setState(stateData, InitMaterialRenderWorkerJobUtils$Wonderjs.initMaterials(/* tuple */[
                          CreateInitLightMaterialStateRenderWorkerService$Wonderjs.createInitMaterialState,
                          InitInitLightMaterialService$Wonderjs.init
                        ], RecordLightMaterialRenderWorkerService$Wonderjs.getRecord(state)[/* isSourceInstanceMap */8], _createTypeArrays(lightMaterialData.buffer, lightMaterialCount, state)));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
