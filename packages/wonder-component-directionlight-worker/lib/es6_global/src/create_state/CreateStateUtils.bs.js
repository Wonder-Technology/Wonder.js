

import * as CreateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/directionlight/CreateTypeArrayDirectionLightUtils.bs.js";

function createState(isDebug, directionLightCount, buffer) {
  var match = CreateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils.createTypeArrays(buffer, directionLightCount);
  return {
          config: {
            isDebug: isDebug
          },
          colors: match[0],
          intensities: match[1]
        };
}

export {
  createState ,
  
}
/* No side effect */
