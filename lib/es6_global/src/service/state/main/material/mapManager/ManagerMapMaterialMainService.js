

import * as TextureIndexService$Wonderjs from "../../../../primitive/material/TextureIndexService.js";

function getMap(material, getTextureIndexFunc, textureIndices) {
  var textureIndex = getTextureIndexFunc(material, textureIndices);
  var match = TextureIndexService$Wonderjs.isTextureNotDefaultValue(textureIndex);
  if (match) {
    return textureIndex;
  }
  
}

function setMap(material, texture, setTextureIndexFunc, textureIndices) {
  return setTextureIndexFunc(material, texture, textureIndices);
}

function removeMap(material, setTextureIndexFunc, textureIndices) {
  var defaultTexture = TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0);
  return setTextureIndexFunc(material, defaultTexture, textureIndices);
}

export {
  getMap ,
  setMap ,
  removeMap ,
  
}
/* No side effect */
