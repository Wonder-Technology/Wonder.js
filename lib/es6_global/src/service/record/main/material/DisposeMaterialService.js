

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../primitive/material/ShaderIndicesService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../primitive/buffer/DisposeTypeArrayService.js";

var isAlive = DisposeComponentService$Wonderjs.isAlive;

var addDisposeIndex = ArrayService$Wonderjs.push;

function disposeData(material, shaderIndices, defaultShaderIndex) {
  return DisposeTypeArrayService$Wonderjs.deleteAndResetUint32(ShaderIndicesService$Wonderjs.getShaderIndexIndex(material), defaultShaderIndex, shaderIndices);
}

function isNotDisposed(disposedIndexArray) {
  return disposedIndexArray.length === 0;
}

export {
  isAlive ,
  addDisposeIndex ,
  disposeData ,
  isNotDisposed ,
  
}
/* ArrayService-Wonderjs Not a pure module */
