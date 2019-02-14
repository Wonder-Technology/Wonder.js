

import * as AliveComponentService$Wonderjs from "../component/AliveComponentService.js";
import * as DisposeMaterialMainService$Wonderjs from "../../state/main/material/DisposeMaterialMainService.js";

function getAllAliveMaterials(index, disposedIndexArray) {
  return AliveComponentService$Wonderjs.getAllAliveComponents(index, disposedIndexArray, DisposeMaterialMainService$Wonderjs.isAlive);
}

export {
  getAllAliveMaterials ,
  
}
/* AliveComponentService-Wonderjs Not a pure module */
