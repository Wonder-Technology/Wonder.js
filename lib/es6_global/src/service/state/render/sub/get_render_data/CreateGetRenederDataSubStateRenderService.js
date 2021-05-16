

import * as OperateRenderJobDataService$Wonderjs from "../../../../record/render/jobData/OperateRenderJobDataService.js";

function createState(state) {
  return /* record */[
          /* cameraRecord */state[/* cameraRecord */6],
          /* basicMaterialRecord */state[/* basicMaterialRecord */7],
          /* lightMaterialRecord */state[/* lightMaterialRecord */8],
          /* directionLightRecord */state[/* directionLightRecord */14],
          /* pointLightRecord */state[/* pointLightRecord */15],
          /* transformRecord */state[/* transformRecord */16],
          /* jobDataRecord : record */[/* outlineData : record */[/* outlineColor */OperateRenderJobDataService$Wonderjs.getOutlineColor(state[/* jobDataRecord */24])]],
          /* globalTempRecord */state[/* globalTempRecord */19]
        ];
}

export {
  createState ,
  
}
/* No side effect */
