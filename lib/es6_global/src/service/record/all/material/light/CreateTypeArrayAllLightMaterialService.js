

import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferAllLightMaterialService$Wonderjs from "./BufferAllLightMaterialService.js";

function createTypeArrays(buffer, lightMaterialCount) {
  return /* tuple */[
          new Uint32Array(buffer, ShaderIndicesService$Wonderjs.getShaderIndicesOffset(lightMaterialCount), ShaderIndicesService$Wonderjs.getShaderIndicesLength(lightMaterialCount)),
          new Float32Array(buffer, BufferAllLightMaterialService$Wonderjs.getDiffuseColorsOffset(lightMaterialCount), BufferAllLightMaterialService$Wonderjs.getDiffuseColorsLength(lightMaterialCount)),
          new Float32Array(buffer, BufferAllLightMaterialService$Wonderjs.getSpecularColorsOffset(lightMaterialCount), BufferAllLightMaterialService$Wonderjs.getSpecularColorsLength(lightMaterialCount)),
          new Float32Array(buffer, BufferAllLightMaterialService$Wonderjs.getShininessOffset(lightMaterialCount), BufferAllLightMaterialService$Wonderjs.getShininessLength(lightMaterialCount)),
          new Uint32Array(buffer, BufferAllLightMaterialService$Wonderjs.getDiffuseTextureIndicesOffset(lightMaterialCount), BufferAllLightMaterialService$Wonderjs.getDiffuseTextureIndicesLength(lightMaterialCount)),
          new Uint32Array(buffer, BufferAllLightMaterialService$Wonderjs.getSpecularTextureIndicesOffset(lightMaterialCount), BufferAllLightMaterialService$Wonderjs.getSpecularTextureIndicesLength(lightMaterialCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
