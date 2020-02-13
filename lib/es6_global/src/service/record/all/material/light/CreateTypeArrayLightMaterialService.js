

import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferLightMaterialService$Wonderjs from "./BufferLightMaterialService.js";

function createTypeArrays(buffer, lightMaterialCount, textureCountPerMaterial) {
  return /* tuple */[
          new Uint32Array(buffer, ShaderIndicesService$Wonderjs.getShaderIndicesOffset(lightMaterialCount), ShaderIndicesService$Wonderjs.getShaderIndicesLength(lightMaterialCount)),
          new Float32Array(buffer, BufferLightMaterialService$Wonderjs.getDiffuseColorsOffset(lightMaterialCount), BufferLightMaterialService$Wonderjs.getDiffuseColorsLength(lightMaterialCount)),
          new Float32Array(buffer, BufferLightMaterialService$Wonderjs.getSpecularColorsOffset(lightMaterialCount), BufferLightMaterialService$Wonderjs.getSpecularColorsLength(lightMaterialCount)),
          new Float32Array(buffer, BufferLightMaterialService$Wonderjs.getShininessOffset(lightMaterialCount), BufferLightMaterialService$Wonderjs.getShininessLength(lightMaterialCount)),
          new Uint32Array(buffer, BufferLightMaterialService$Wonderjs.getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial), BufferLightMaterialService$Wonderjs.getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial)),
          new Uint8Array(buffer, BufferLightMaterialService$Wonderjs.getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial), BufferLightMaterialService$Wonderjs.getDiffuseMapUnitsLength(lightMaterialCount)),
          new Uint8Array(buffer, BufferLightMaterialService$Wonderjs.getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial), BufferLightMaterialService$Wonderjs.getSpecularMapUnitsLength(lightMaterialCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
