

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferMeshRendererService$Wonderjs from "../../main/meshRenderer/BufferMeshRendererService.js";

function getDrawMode(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferMeshRendererService$Wonderjs.getDrawModeIndex(index), typeArr);
}

function setDrawMode(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferMeshRendererService$Wonderjs.getDrawModeIndex(index), data, typeArr);
}

function getIsRender(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferMeshRendererService$Wonderjs.getIsRenderIndex(index), typeArr);
}

function setIsRender(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferMeshRendererService$Wonderjs.getIsRenderIndex(index), data, typeArr);
}

export {
  getDrawMode ,
  setDrawMode ,
  getIsRender ,
  setIsRender ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
