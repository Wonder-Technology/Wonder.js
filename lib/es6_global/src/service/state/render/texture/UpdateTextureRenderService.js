

import * as BufferTextureService$Wonderjs from "../../../record/main/texture/BufferTextureService.js";

function isNeedUpdate(textureInTypeArray, defaultIsNeedUpdate, isNeedUpdates, getIsNeedUpdateFunc) {
  return getIsNeedUpdateFunc(textureInTypeArray, isNeedUpdates) === BufferTextureService$Wonderjs.getNeedUpdate(/* () */0);
}

export {
  isNeedUpdate ,
  
}
/* No side effect */
