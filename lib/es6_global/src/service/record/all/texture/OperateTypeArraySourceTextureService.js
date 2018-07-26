

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferSourceTextureService$Wonderjs from "../../main/texture/BufferSourceTextureService.js";

function setIsNeedUpdate(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferSourceTextureService$Wonderjs.getIsNeedUpdateIndex(index), data, typeArr);
}

export {
  setIsNeedUpdate ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
