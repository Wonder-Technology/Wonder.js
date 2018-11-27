

import * as BufferMeshRendererService$Wonderjs from "../../main/meshRenderer/BufferMeshRendererService.js";

function createTypeArrays(buffer, meshRendererCount) {
  return /* tuple */[
          new Uint8Array(buffer, BufferMeshRendererService$Wonderjs.getDrawModesOffset(meshRendererCount), BufferMeshRendererService$Wonderjs.getDrawModesLength(meshRendererCount)),
          new Uint8Array(buffer, BufferMeshRendererService$Wonderjs.getIsRendersOffset(meshRendererCount), BufferMeshRendererService$Wonderjs.getIsRendersLength(meshRendererCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferMeshRendererService-Wonderjs Not a pure module */
