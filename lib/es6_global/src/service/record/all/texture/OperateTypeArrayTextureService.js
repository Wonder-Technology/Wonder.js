

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferTextureService$Wonderjs from "../../main/texture/BufferTextureService.js";

function setIsNeedUpdate(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferTextureService$Wonderjs.getIsNeedUpdateIndex(index), data, typeArr);
}

export {
  setIsNeedUpdate ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
