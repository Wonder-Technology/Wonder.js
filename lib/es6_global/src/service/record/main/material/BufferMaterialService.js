

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";

function getDefaultTextureIndex() {
  return 0;
}

function getTextureIndicesSize(textureCountPerMaterial) {
  return textureCountPerMaterial;
}

var getTextureIndicesLength = Caml_int32.imul;

var getTextureIndicesIndex = Caml_int32.imul;

function getTextureIndexIndex(index, textureIndex, textureCountPerMaterial) {
  return Caml_int32.imul(index, textureCountPerMaterial) + textureIndex | 0;
}

export {
  getDefaultTextureIndex ,
  getTextureIndicesSize ,
  getTextureIndicesLength ,
  getTextureIndicesIndex ,
  getTextureIndexIndex ,
  
}
/* No side effect */
