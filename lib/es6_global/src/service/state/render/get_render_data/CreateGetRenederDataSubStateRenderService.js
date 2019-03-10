

import * as OperateRenderJobDataService$Wonderjs from "../../../record/render/jobData/OperateRenderJobDataService.js";

function createState(state) {
  return /* record */[
          /* cameraRecord */state[/* cameraRecord */6],
          /* basicMaterialRecord */state[/* basicMaterialRecord */7],
          /* lightMaterialRecord */state[/* lightMaterialRecord */8],
          /* directionLightRecord */state[/* directionLightRecord */12],
          /* pointLightRecord */state[/* pointLightRecord */13],
          /* transformRecord */state[/* transformRecord */14],
          /* jobDataRecord : record */[/* outlineData : record */[/* outlineColor */OperateRenderJobDataService$Wonderjs.getOutlineColor(state[/* jobDataRecord */22])]],
          /* globalTempRecord */state[/* globalTempRecord */17]
        ];
}

export {
  createState ,
  
}
/* No side effect */
