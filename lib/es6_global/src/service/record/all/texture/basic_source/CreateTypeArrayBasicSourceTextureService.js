

import * as BufferBasicSourceTextureService$Wonderjs from "../../../main/texture/BufferBasicSourceTextureService.js";

function createTypeArrays(buffer, basicSourceTextureCount) {
  return /* tuple */[
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getWrapSsOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getWrapSsLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getWrapTsOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getWrapTsLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getMagFiltersOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getMagFiltersLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getMinFiltersOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getMinFiltersLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getFormatsOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getFormatsLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getTypesOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getTypesLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getIsNeedUpdatesOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getIsNeedUpdatesLength(basicSourceTextureCount)),
          new Uint8Array(buffer, BufferBasicSourceTextureService$Wonderjs.getFlipYsOffset(basicSourceTextureCount), BufferBasicSourceTextureService$Wonderjs.getFlipYsLength(basicSourceTextureCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferBasicSourceTextureService-Wonderjs Not a pure module */
