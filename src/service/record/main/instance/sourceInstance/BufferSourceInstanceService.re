open Js.Typed_array;

let getObjectInstanceTransformCollectionsSize = (objectInstanceCountPerSourceInstance) => objectInstanceCountPerSourceInstance;

let getObjectInstanceTransformCollectionsLength =
    (sourceInstanceCount, objectInstanceCountPerSourceInstance) =>
  sourceInstanceCount
  * getObjectInstanceTransformCollectionsSize(objectInstanceCountPerSourceInstance);

let getObjectInstanceTransformCollectionsOffset =
    (sourceInstanceCount, objectInstanceCountPerSourceInstance) => 0;

let getIsTransformStaticsSize = () => 1;

let getIsTransformStaticsLength = (sourceInstanceCount) =>
  sourceInstanceCount * getIsTransformStaticsSize();

let getIsTransformStaticsOffset = (sourceInstanceCount, objectInstanceCountPerSourceInstance) =>
  getObjectInstanceTransformCollectionsLength(
    sourceInstanceCount,
    objectInstanceCountPerSourceInstance
  )
  * Uint32Array._BYTES_PER_ELEMENT;

let getObjectInstanceTransformCollectionsIndex =
    (sourceInstance, objectInstanceCountPerSourceInstance) =>
  sourceInstance * getObjectInstanceTransformCollectionsSize(objectInstanceCountPerSourceInstance);

let getIsTransformStaticsIndex = (sourceInstance) => sourceInstance * getIsTransformStaticsSize();

let getObjectInstanceTransformIndex =
    (sourceInstance, objectInstanceTransformIndex, objectInstanceCountPerSourceInstance) =>
  getObjectInstanceTransformCollectionsIndex(sourceInstance, objectInstanceCountPerSourceInstance)
  + objectInstanceTransformIndex;

let getTotalByteLength = (sourceInstanceCount, objectInstanceCountPerSourceInstance) =>
  sourceInstanceCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * getObjectInstanceTransformCollectionsSize(objectInstanceCountPerSourceInstance)
    + Uint8Array._BYTES_PER_ELEMENT
    * getIsTransformStaticsSize()
  );

let createBuffer = (sourceInstanceCount, objectInstanceCountPerSourceInstance) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(sourceInstanceCount, objectInstanceCountPerSourceInstance)
  );