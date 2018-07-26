

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferMaterialService$Wonderjs from "../../main/material/BufferMaterialService.js";

function getTextureIndex(param, typeArr) {
  return TypeArrayService$Wonderjs.getUint32_1(BufferMaterialService$Wonderjs.getTextureIndexIndex(param[0], param[1], param[2]), typeArr);
}

function setTextureIndex(param, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint32_1(BufferMaterialService$Wonderjs.getTextureIndexIndex(param[0], param[1], param[2]), data, typeArr);
}

export {
  getTextureIndex ,
  setTextureIndex ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
