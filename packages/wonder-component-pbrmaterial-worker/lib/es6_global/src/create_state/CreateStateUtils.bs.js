

import * as CreateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/pbrmaterial/CreateTypeArrayPBRMaterialUtils.bs.js";

function createState(isDebug, pbrMaterialCount, buffer) {
  var match = CreateTypeArrayPBRMaterialUtils$OrillusionComponentWorkerUtils.createTypeArrays(buffer, pbrMaterialCount);
  return {
          config: {
            isDebug: isDebug
          },
          diffuseColors: match[0],
          speculars: match[1],
          specularColors: match[2],
          roughnesses: match[3],
          metalnesses: match[4],
          transmissions: match[5],
          iors: match[6]
        };
}

export {
  createState ,
  
}
/* No side effect */
