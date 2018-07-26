

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetBuffer(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* buffer */2]);
}

function getTransformCount(record) {
  return unsafeGetBuffer(record)[/* transformCount */2];
}

function getCustomGeometryPointCount(record) {
  return unsafeGetBuffer(record)[/* customGeometryPointCount */0];
}

function getCustomGeometryCount(record) {
  return unsafeGetBuffer(record)[/* customGeometryCount */1];
}

function getBasicMaterialCount(record) {
  return unsafeGetBuffer(record)[/* basicMaterialCount */3];
}

function getLightMaterialCount(record) {
  return unsafeGetBuffer(record)[/* lightMaterialCount */4];
}

function getSourceInstanceCount(record) {
  return unsafeGetBuffer(record)[/* instanceBuffer */8][/* sourceInstanceCount */0];
}

function getObjectInstanceCountPerSourceInstance(record) {
  return unsafeGetBuffer(record)[/* instanceBuffer */8][/* objectInstanceCountPerSourceInstance */1];
}

function getTextureCountPerMaterial(record) {
  return unsafeGetBuffer(record)[/* textureCountPerMaterial */5];
}

function getBasicSourceTextureCount(record) {
  return unsafeGetBuffer(record)[/* basicSourceTextureCount */6];
}

function getArrayBufferViewSourceTextureCount(record) {
  return unsafeGetBuffer(record)[/* arrayBufferViewSourceTextureCount */7];
}

export {
  unsafeGetBuffer ,
  getTransformCount ,
  getCustomGeometryPointCount ,
  getCustomGeometryCount ,
  getBasicMaterialCount ,
  getLightMaterialCount ,
  getSourceInstanceCount ,
  getObjectInstanceCountPerSourceInstance ,
  getTextureCountPerMaterial ,
  getBasicSourceTextureCount ,
  getArrayBufferViewSourceTextureCount ,
  
}
/* OptionService-Wonderjs Not a pure module */
