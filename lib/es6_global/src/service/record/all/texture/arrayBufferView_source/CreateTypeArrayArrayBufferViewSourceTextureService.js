

import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../main/texture/BufferArrayBufferViewSourceTextureService.js";

function createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount) {
  return /* tuple */[
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapSsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapSsLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getWrapTsLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getMagFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getMagFiltersLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getMinFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getMinFiltersLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getFormatsLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getTypesLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdatesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getIsNeedUpdatesLength(arrayBufferViewSourceTextureCount)),
          new Uint8Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getFlipYsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getFlipYsLength(arrayBufferViewSourceTextureCount)),
          new Uint16Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getWidthsLength(arrayBufferViewSourceTextureCount)),
          new Uint16Array(buffer, BufferArrayBufferViewSourceTextureService$Wonderjs.getHeightsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount), BufferArrayBufferViewSourceTextureService$Wonderjs.getHeightsLength(arrayBufferViewSourceTextureCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferArrayBufferViewSourceTextureService-Wonderjs Not a pure module */
