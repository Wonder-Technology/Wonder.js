'use strict';

var ShaderIndexRenderService$Wonderjs = require("../../../../src/service/state/render/shader/ShaderIndexRenderService.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../src/service/state/main/render/CreateRenderStateMainService.js");
var ShaderIndexRenderShaderService$Wonderjs = require("../../../../src/service/record/render/shader/ShaderIndexRenderShaderService.js");
var ShaderIndexLightMaterialRenderService$Wonderjs = require("../../../../src/service/state/render/material/light/ShaderIndexLightMaterialRenderService.js");

function getShaderRecord(state) {
  return state[/* shaderRecord */25];
}

function getShaderIndex(material, state) {
  var renderState = CreateRenderStateMainService$Wonderjs.createRenderState(state);
  return ShaderIndexRenderService$Wonderjs.getShaderIndex(material, ShaderIndexLightMaterialRenderService$Wonderjs.getShaderIndex, renderState);
}

function getAllShaderIndexArray(state) {
  return ShaderIndexRenderShaderService$Wonderjs.getAllShaderIndexArray(CreateRenderStateMainService$Wonderjs.createRenderState(state)[/* shaderRecord */19]);
}

exports.getShaderRecord = getShaderRecord;
exports.getShaderIndex = getShaderIndex;
exports.getAllShaderIndexArray = getAllShaderIndexArray;
/* ShaderIndexRenderService-Wonderjs Not a pure module */
