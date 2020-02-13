

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferMaterialService$Wonderjs from "../../main/material/BufferMaterialService.js";

function getTextureIndex(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint32_1(BufferMaterialService$Wonderjs.getTextureIndexIndex(index), typeArr);
}

function setTextureIndex(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint32_1(BufferMaterialService$Wonderjs.getTextureIndexIndex(index), data, typeArr);
}

export {
  getTextureIndex ,
  setTextureIndex ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
