'use strict';

var ShaderIndexRenderService$Wonderjs = require("../../../../src/service/state/render/shader/ShaderIndexRenderService.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../src/service/state/main/render/CreateRenderStateMainService.js");
var NoMaterialShaderIndexAllShaderService$Wonderjs = require("../../../../src/service/record/all/shader/NoMaterialShaderIndexAllShaderService.js");
var ShaderIndexLightMaterialRenderService$Wonderjs = require("../../../../src/service/state/render/material/light/ShaderIndexLightMaterialRenderService.js");

function getShaderRecord(state) {
  return state[/* shaderRecord */28];
}

function getShaderIndex(material, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(material, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, renderState);
}

function getNoMaterialShaderIndex(shaderName, param) {
  return NoMaterialShaderIndexAllShaderService$Wonderjs.unsafeGetShaderIndex(shaderName, param[/* shaderRecord */28]);
}

exports.getShaderRecord = getShaderRecord;
exports.getShaderIndex = getShaderIndex;
exports.getNoMaterialShaderIndex = getNoMaterialShaderIndex;
/* ShaderIndexRenderService-Wonderjs Not a pure module */
