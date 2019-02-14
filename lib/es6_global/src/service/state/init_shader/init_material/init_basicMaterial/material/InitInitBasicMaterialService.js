

import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../../primitive/material/ShaderIndicesService.js";
import * as InitMaterialInitMaterialAllService$Wonderjs from "../../all/material/InitMaterialInitMaterialAllService.js";
import * as InitShaderInitBasicMaterialService$Wonderjs from "../shader/InitShaderInitBasicMaterialService.js";
import * as BuildShaderSourceInitShaderAllService$Wonderjs from "../../../all/shader/BuildShaderSourceInitShaderAllService.js";
import * as GetShaderLibDataArrayInitBasicMaterialService$Wonderjs from "./GetShaderLibDataArrayInitBasicMaterialService.js";

function _getShaderLibItems(param) {
  var shaderName = "render_basic";
  return ArrayService$Wonderjs.unsafeFindFirst(param[/* materialShaders */3], shaderName, (function (param) {
                  return param[/* name */0] === shaderName;
                }))[/* shaderLibs */1];
}

function isNeedInitMaterial(materialIndex, shaderIndices) {
  return !ShaderIndicesService$Wonderjs.hasShaderIndex(materialIndex, shaderIndices);
}

function initMaterial(gl, dataTuple, state) {
  return InitMaterialInitMaterialAllService$Wonderjs.initMaterial(gl, dataTuple, /* tuple */[
              InitShaderInitBasicMaterialService$Wonderjs.initMaterialShader,
              BuildShaderSourceInitShaderAllService$Wonderjs.buildGLSLSource,
              ShaderIndicesService$Wonderjs.setShaderIndex,
              _getShaderLibItems,
              GetShaderLibDataArrayInitBasicMaterialService$Wonderjs.getMaterialShaderLibDataArr
            ], /* tuple */[
              state[/* materialRecord */0][/* shaderIndices */2],
              state[/* renderConfigRecord */1],
              state
            ]);
}

function reInitMaterial(gl, dataTuple, state) {
  return InitMaterialInitMaterialAllService$Wonderjs.reInitMaterial(gl, dataTuple, /* tuple */[
              InitShaderInitBasicMaterialService$Wonderjs.reInitMaterialShader,
              BuildShaderSourceInitShaderAllService$Wonderjs.buildGLSLSource,
              ShaderIndicesService$Wonderjs.setShaderIndex,
              _getShaderLibItems,
              GetShaderLibDataArrayInitBasicMaterialService$Wonderjs.getMaterialShaderLibDataArr
            ], /* tuple */[
              state[/* materialRecord */0][/* shaderIndices */2],
              state[/* renderConfigRecord */1],
              state
            ]);
}

function init(gl, instanceTuple, state) {
  var materialRecord = state[/* materialRecord */0];
  return InitMaterialInitMaterialAllService$Wonderjs.init(gl, instanceTuple, initMaterial, /* tuple */[
              materialRecord[/* index */0],
              materialRecord[/* disposedIndexArray */1],
              state
            ]);
}

export {
  _getShaderLibItems ,
  isNeedInitMaterial ,
  initMaterial ,
  reInitMaterial ,
  init ,
  
}
/* ArrayService-Wonderjs Not a pure module */
