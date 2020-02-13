

import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferAllBasicMaterialService$Wonderjs from "./BufferAllBasicMaterialService.js";

function createTypeArrays(buffer, basicMaterialCount) {
  return /* tuple */[
          new Uint32Array(buffer, ShaderIndicesService$Wonderjs.getShaderIndicesOffset(basicMaterialCount), ShaderIndicesService$Wonderjs.getShaderIndicesLength(basicMaterialCount)),
          new Float32Array(buffer, BufferAllBasicMaterialService$Wonderjs.getColorsOffset(basicMaterialCount), BufferAllBasicMaterialService$Wonderjs.getColorsLength(basicMaterialCount)),
          new Uint8Array(buffer, BufferAllBasicMaterialService$Wonderjs.getIsDepthTestsOffset(basicMaterialCount), BufferAllBasicMaterialService$Wonderjs.getIsDepthTestsLength(basicMaterialCount)),
          new Float32Array(buffer, BufferAllBasicMaterialService$Wonderjs.getAlphasOffset(basicMaterialCount), BufferAllBasicMaterialService$Wonderjs.getAlphasLength(basicMaterialCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
