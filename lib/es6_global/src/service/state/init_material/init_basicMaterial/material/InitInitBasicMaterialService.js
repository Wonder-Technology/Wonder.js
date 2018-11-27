

import * as JobConfigService$Wonderjs from "../../../../primitive/JobConfigService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as InitMaterialInitMaterialService$Wonderjs from "../../material/InitMaterialInitMaterialService.js";
import * as InitShaderInitBasicMaterialService$Wonderjs from "../shader/InitShaderInitBasicMaterialService.js";
import * as BuildShaderSourceInitMaterialService$Wonderjs from "../../shader/BuildShaderSourceInitMaterialService.js";
import * as GetShaderLibDataArrayInitBasicMaterialService$Wonderjs from "./GetShaderLibDataArrayInitBasicMaterialService.js";

function _getShaderLibItems(param) {
  var shaderName = "render_basic";
  return JobConfigService$Wonderjs.unsafeFindFirst(param[/* materialShaders */3], shaderName, (function (param) {
                  return JobConfigService$Wonderjs.filterTargetName(param[/* name */0], shaderName);
                }))[/* shaderLibs */1];
}

function isNeedInitMaterial(materialIndex, shaderIndices) {
  return !ShaderIndicesService$Wonderjs.hasShaderIndex(materialIndex, shaderIndices);
}

function initMaterial(gl, dataTuple, state) {
  return InitMaterialInitMaterialService$Wonderjs.initMaterial(gl, dataTuple, /* tuple */[
              InitShaderInitBasicMaterialService$Wonderjs.initMaterialShader,
              BuildShaderSourceInitMaterialService$Wonderjs.buildGLSLSource,
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
  return InitMaterialInitMaterialService$Wonderjs.reInitMaterial(gl, dataTuple, /* tuple */[
              InitShaderInitBasicMaterialService$Wonderjs.reInitMaterialShader,
              BuildShaderSourceInitMaterialService$Wonderjs.buildGLSLSource,
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
  return InitMaterialInitMaterialService$Wonderjs.init(gl, instanceTuple, initMaterial, /* tuple */[
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
/* JobConfigService-Wonderjs Not a pure module */
