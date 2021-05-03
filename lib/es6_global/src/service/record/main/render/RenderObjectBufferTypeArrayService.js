

import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";

function getComponentSize(param) {
  return 1;
}

function getTransformIndicesLength(count) {
  return (count << 0);
}

function getTransformIndicesOffset(count) {
  return 0;
}

function getMaterialIndicesLength(count) {
  return (count << 0);
}

function getMaterialIndicesOffset(count) {
  return 0 + Caml_int32.imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getMeshRendererIndicesLength(count) {
  return (count << 0);
}

function getMeshRendererIndicesOffset(count) {
  return getMaterialIndicesOffset(count) + Caml_int32.imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getGeometryIndicesLength(count) {
  return (count << 0);
}

function getGeometryIndicesOffset(count) {
  return getMeshRendererIndicesOffset(count) + Caml_int32.imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getSourceInstanceIndicesLength(count) {
  return (count << 0);
}

function getSourceInstanceIndicesOffset(count) {
  return getGeometryIndicesOffset(count) + Caml_int32.imul((count << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getComponentIndex(index) {
  return index;
}

var getComponent = TypeArrayService$Wonderjs.getUint32_1;

var setComponent = TypeArrayService$Wonderjs.setUint32_1;

function hasSourceInstance(sourceInstance) {
  return sourceInstance !== DefaultTypeArrayValueService$Wonderjs.getDefaultSourceInstance(/* () */0);
}

export {
  getComponentSize ,
  getTransformIndicesLength ,
  getTransformIndicesOffset ,
  getMaterialIndicesLength ,
  getMaterialIndicesOffset ,
  getMeshRendererIndicesLength ,
  getMeshRendererIndicesOffset ,
  getGeometryIndicesLength ,
  getGeometryIndicesOffset ,
  getSourceInstanceIndicesLength ,
  getSourceInstanceIndicesOffset ,
  getComponentIndex ,
  getComponent ,
  setComponent ,
  hasSourceInstance ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
