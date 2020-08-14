

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetBuffer(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* buffer */2]);
}

function getTransformCount(record) {
  return unsafeGetBuffer(record)[/* transformCount */2];
}

function getGeometryPointCount(record) {
  return unsafeGetBuffer(record)[/* geometryPointCount */0];
}

function getGeometryCount(record) {
  return unsafeGetBuffer(record)[/* geometryCount */1];
}

function getBasicMaterialCount(record) {
  return unsafeGetBuffer(record)[/* basicMaterialCount */3];
}

function getLightMaterialCount(record) {
  return unsafeGetBuffer(record)[/* lightMaterialCount */4];
}

function getDirectionLightCount(record) {
  return unsafeGetBuffer(record)[/* directionLightCount */5];
}

function getPointLightCount(record) {
  return unsafeGetBuffer(record)[/* pointLightCount */6];
}

function getMeshRendererCount(record) {
  return unsafeGetBuffer(record)[/* meshRendererCount */10];
}

function getSourceInstanceCount(record) {
  return unsafeGetBuffer(record)[/* instanceBuffer */11][/* sourceInstanceCount */0];
}

function getObjectInstanceCountPerSourceInstance(record) {
  return unsafeGetBuffer(record)[/* instanceBuffer */11][/* objectInstanceCountPerSourceInstance */1];
}

function getTextureCountPerMaterial(record) {
  return unsafeGetBuffer(record)[/* textureCountPerMaterial */7];
}

function getBasicSourceTextureCount(record) {
  return unsafeGetBuffer(record)[/* basicSourceTextureCount */8];
}

function getArrayBufferViewSourceTextureCount(record) {
  return unsafeGetBuffer(record)[/* arrayBufferViewSourceTextureCount */9];
}

export {
  unsafeGetBuffer ,
  getTransformCount ,
  getGeometryPointCount ,
  getGeometryCount ,
  getBasicMaterialCount ,
  getLightMaterialCount ,
  getDirectionLightCount ,
  getPointLightCount ,
  getMeshRendererCount ,
  getSourceInstanceCount ,
  getObjectInstanceCountPerSourceInstance ,
  getTextureCountPerMaterial ,
  getBasicSourceTextureCount ,
  getArrayBufferViewSourceTextureCount ,
  
}
/* OptionService-Wonderjs Not a pure module */
