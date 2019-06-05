

import * as OperateRenderJobDataService$Wonderjs from "../../../record/render/jobData/OperateRenderJobDataService.js";

function createState(state) {
  var jobDataRecord = state[/* jobDataRecord */22];
  return /* record */[
          /* cameraRecord */state[/* cameraRecord */6],
          /* basicMaterialRecord */state[/* basicMaterialRecord */7],
          /* lightMaterialRecord */state[/* lightMaterialRecord */8],
          /* directionLightRecord */state[/* directionLightRecord */12],
          /* pointLightRecord */state[/* pointLightRecord */13],
          /* transformRecord */state[/* transformRecord */14],
          /* jobDataRecord : record */[
            /* outlineData : record */[/* outlineColor */OperateRenderJobDataService$Wonderjs.getOutlineColor(jobDataRecord)],
            /* skyboxData : record */[/* cubeTexture */OperateRenderJobDataService$Wonderjs.getSkyboxCubeTexture(jobDataRecord)]
          ],
          /* globalTempRecord */state[/* globalTempRecord */17]
        ];
}

export {
  createState ,
  
}
/* No side effect */
