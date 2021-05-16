

import * as BufferCubemapTextureService$Wonderjs from "../../../main/texture/cubemap/BufferCubemapTextureService.js";

function createTypeArrays(buffer, cubemapTextureCount) {
  return /* tuple */[
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getWrapSsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getWrapSsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getWrapTsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getWrapTsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getMagFiltersOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getMagFiltersLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getMinFiltersOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getMinFiltersLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPXFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNXFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPYFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNYFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPZFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNZFormatsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFormatsLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPXTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNXTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPYTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNYTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getPZTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getNZTypesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getTypesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getIsNeedUpdatesOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getIsNeedUpdatesLength(cubemapTextureCount)),
          new Uint8Array(buffer, BufferCubemapTextureService$Wonderjs.getFlipYsOffset(cubemapTextureCount), BufferCubemapTextureService$Wonderjs.getFlipYsLength(cubemapTextureCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferCubemapTextureService-Wonderjs Not a pure module */
