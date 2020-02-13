

import * as IndexSourceTextureMainService$Wonderjs from "./IndexSourceTextureMainService.js";

function isBasicSourceTexture(texture, state) {
  return texture < IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state);
}

function isArrayBufferViewSourceTexture(texture, state) {
  return texture >= IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state);
}

export {
  isBasicSourceTexture ,
  isArrayBufferViewSourceTexture ,
  
}
/* IndexSourceTextureMainService-Wonderjs Not a pure module */
