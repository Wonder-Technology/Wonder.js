

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function unsafeGetInstanceBuffer(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* instanceBuffer */1]);
}

function getSourceInstanceCount(record) {
  return unsafeGetInstanceBuffer(record)[/* sourceInstanceCount */0];
}

function getObjectInstanceCountPerSourceInstance(record) {
  return unsafeGetInstanceBuffer(record)[/* objectInstanceCountPerSourceInstance */1];
}

function unsafeGetBasicSourceTextureCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicSourceTextureCount */2]);
}

function unsafeGetArrayBufferViewSourceTextureCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* arrayBufferViewSourceTextureCount */3]);
}

function unsafeGetCubemapTextureCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* cubemapTextureCount */4]);
}

function unsafeGetDirectionLightCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* directionLightCount */5]);
}

function unsafeGetPointLightCount(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* pointLightCount */6]);
}

export {
  unsafeGetInstanceBuffer ,
  getSourceInstanceCount ,
  getObjectInstanceCountPerSourceInstance ,
  unsafeGetBasicSourceTextureCount ,
  unsafeGetArrayBufferViewSourceTextureCount ,
  unsafeGetCubemapTextureCount ,
  unsafeGetDirectionLightCount ,
  unsafeGetPointLightCount ,
  
}
/* OptionService-Wonderjs Not a pure module */
