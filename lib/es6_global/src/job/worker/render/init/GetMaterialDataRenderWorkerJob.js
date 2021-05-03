

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var basicMaterialData = data.basicMaterialData;
                state[/* basicMaterialRecord */12] = /* record */[
                  /* shaderIndices */undefined,
                  /* colors */undefined,
                  /* isDepthTests */undefined,
                  /* alphas */undefined,
                  /* index */basicMaterialData.index,
                  /* disposedIndexArray */basicMaterialData.disposedIndexArray,
                  /* isSourceInstanceMap */basicMaterialData.isSourceInstanceMap
                ];
                var lightMaterialData = data.lightMaterialData;
                state[/* lightMaterialRecord */13] = /* record */[
                  /* shaderIndices */undefined,
                  /* diffuseColors */undefined,
                  /* specularColors */undefined,
                  /* shininess */undefined,
                  /* diffuseTextureIndices */undefined,
                  /* specularTextureIndices */undefined,
                  /* index */lightMaterialData.index,
                  /* disposedIndexArray */lightMaterialData.disposedIndexArray,
                  /* isSourceInstanceMap */lightMaterialData.isSourceInstanceMap
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
