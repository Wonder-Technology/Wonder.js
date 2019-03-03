

import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../../external/Worker.js";

function getObjectInstanceTransformCollectionsSize(objectInstanceCountPerSourceInstance) {
  return objectInstanceCountPerSourceInstance;
}

var getObjectInstanceTransformCollectionsLength = Caml_int32.imul;

function getObjectInstanceTransformCollectionsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance) {
  return 0;
}

function getIsTransformStaticsSize(param) {
  return 1;
}

function getIsTransformStaticsLength(sourceInstanceCount) {
  return (sourceInstanceCount << 0);
}

function getIsTransformStaticsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance) {
  return 0 + Caml_int32.imul(Caml_int32.imul(sourceInstanceCount, objectInstanceCountPerSourceInstance), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

var getObjectInstanceTransformCollectionsIndex = Caml_int32.imul;

function getIsTransformStaticsIndex(sourceInstance) {
  return (sourceInstance << 0);
}

function getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndex, objectInstanceCountPerSourceInstance) {
  return Caml_int32.imul(sourceInstance, objectInstanceCountPerSourceInstance) + objectInstanceTransformIndex | 0;
}

function getTotalByteLength(sourceInstanceCount, objectInstanceCountPerSourceInstance) {
  return Caml_int32.imul(sourceInstanceCount, Caml_int32.imul(Uint32Array.BYTES_PER_ELEMENT, objectInstanceCountPerSourceInstance) + (Uint8Array.BYTES_PER_ELEMENT << 0) | 0);
}

function createBuffer(sourceInstanceCount, objectInstanceCountPerSourceInstance) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(sourceInstanceCount, objectInstanceCountPerSourceInstance));
}

export {
  getObjectInstanceTransformCollectionsSize ,
  getObjectInstanceTransformCollectionsLength ,
  getObjectInstanceTransformCollectionsOffset ,
  getIsTransformStaticsSize ,
  getIsTransformStaticsLength ,
  getIsTransformStaticsOffset ,
  getObjectInstanceTransformCollectionsIndex ,
  getIsTransformStaticsIndex ,
  getObjectInstanceTransformIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
