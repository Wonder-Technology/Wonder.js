

import * as BufferMaterialService$Wonderjs from "../../../record/main/material/BufferMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

function disposeTextureIndices(material, textureCountPerMaterial, textureIndices) {
  var sourceIndex = BufferMaterialService$Wonderjs.getTextureIndicesIndex(material, textureCountPerMaterial);
  var defaultIndex = BufferMaterialService$Wonderjs.getDefaultTextureIndex(/* () */0);
  for(var i = 0 ,i_finish = BufferMaterialService$Wonderjs.getTextureIndicesSize(textureCountPerMaterial) - 1 | 0; i <= i_finish; ++i){
    textureIndices[sourceIndex + i | 0] = defaultIndex;
  }
  return textureIndices;
}

var isAlive = DisposeComponentService$Wonderjs.isAlive;

export {
  disposeTextureIndices ,
  isAlive ,
  
}
/* DisposeComponentService-Wonderjs Not a pure module */
