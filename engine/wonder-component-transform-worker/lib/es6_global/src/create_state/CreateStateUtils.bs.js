

import * as CreateTypeArrayTransformUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/transform/CreateTypeArrayTransformUtils.bs.js";

function createState(isDebug, transformCount, buffer) {
  var match = CreateTypeArrayTransformUtils$OrillusionComponentWorkerUtils.createTypeArrays(buffer, transformCount);
  return {
          config: {
            isDebug: isDebug
          },
          localToWorldMatrices: match[0]
        };
}

export {
  createState ,
  
}
/* No side effect */
