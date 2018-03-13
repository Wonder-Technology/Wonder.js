open BoxGeometryType;

open SourceInstanceType;

open VboBufferType;

open DisposeComponentService;

let disposeGeometryBufferData =
    (geometry, {vertexBufferMap, normalBufferMap, elementArrayBufferMap} as record) => {
  ...record,
  vertexBufferMap: disposeSparseMapData(geometry, vertexBufferMap),
  normalBufferMap: disposeSparseMapData(geometry, normalBufferMap),
  elementArrayBufferMap: disposeSparseMapData(geometry, elementArrayBufferMap)
};

let disposeInstanceBufferData =
    (sourceInstance: sourceInstance, {matrixInstanceBufferMap} as record) => {
  ...record,
  matrixInstanceBufferMap: disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
};