

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as DisposeMaterialMainService$Wonderjs from "../../state/main/material/DisposeMaterialMainService.js";

function getAllAliveMaterials(index, disposedIndexArray) {
  return ArrayService$Wonderjs.range(0, index - 1 | 0).filter((function (material) {
                return DisposeMaterialMainService$Wonderjs.isAlive(material, disposedIndexArray);
              }));
}

export {
  getAllAliveMaterials ,
  
}
/* ArrayService-Wonderjs Not a pure module */
