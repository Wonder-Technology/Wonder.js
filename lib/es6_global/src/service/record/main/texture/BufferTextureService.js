

import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as BufferSizeTextureService$Wonderjs from "./BufferSizeTextureService.js";

function getNeedUpdate(param) {
  return /* NeedUpdate */1;
}

function getNotNeedUpdate(param) {
  return /* Not_needUpdate */0;
}

function getDefaultIsNeedUpdate(param) {
  return /* NeedUpdate */1;
}

function getFlipY(param) {
  return /* Flipy */1;
}

function getNotFlipY(param) {
  return /* Not_flipy */0;
}

function getFlipYTypeArrayValue(isFlipY) {
  if (isFlipY) {
    return /* Flipy */1;
  } else {
    return /* Not_flipy */0;
  }
}

function getFlipYFromTypeArrayValue(isFlipY) {
  if (isFlipY) {
    return true;
  } else {
    return false;
  }
}

function getDefaultFlipY(param) {
  return /* Flipy */1;
}

function getIsNeedUpdateIndex(index) {
  return Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0));
}

export {
  getNeedUpdate ,
  getNotNeedUpdate ,
  getDefaultIsNeedUpdate ,
  getFlipY ,
  getNotFlipY ,
  getFlipYTypeArrayValue ,
  getFlipYFromTypeArrayValue ,
  getDefaultFlipY ,
  getIsNeedUpdateIndex ,
  
}
/* No side effect */
