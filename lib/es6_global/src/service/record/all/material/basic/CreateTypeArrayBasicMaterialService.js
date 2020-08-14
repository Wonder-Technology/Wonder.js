

import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferBasicMaterialService$Wonderjs from "./BufferBasicMaterialService.js";

function createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial) {
  return /* tuple */[
          new Uint32Array(buffer, ShaderIndicesService$Wonderjs.getShaderIndicesOffset(basicMaterialCount), ShaderIndicesService$Wonderjs.getShaderIndicesLength(basicMaterialCount)),
          new Float32Array(buffer, BufferBasicMaterialService$Wonderjs.getColorsOffset(basicMaterialCount), BufferBasicMaterialService$Wonderjs.getColorsLength(basicMaterialCount)),
          new Uint32Array(buffer, BufferBasicMaterialService$Wonderjs.getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial), BufferBasicMaterialService$Wonderjs.getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial)),
          new Uint8Array(buffer, BufferBasicMaterialService$Wonderjs.getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial), BufferBasicMaterialService$Wonderjs.getMapUnitsLength(basicMaterialCount)),
          new Uint8Array(buffer, BufferBasicMaterialService$Wonderjs.getIsDepthTestsOffset(basicMaterialCount, textureCountPerMaterial), BufferBasicMaterialService$Wonderjs.getIsDepthTestsLength(basicMaterialCount)),
          new Float32Array(buffer, BufferBasicMaterialService$Wonderjs.getAlphasOffset(basicMaterialCount, textureCountPerMaterial), BufferBasicMaterialService$Wonderjs.getAlphasLength(basicMaterialCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
