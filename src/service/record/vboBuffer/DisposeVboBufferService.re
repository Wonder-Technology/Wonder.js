open BoxGeometryType;

open VboBufferType;

open DisposeComponentService;

let disposeGeometryBufferData =
    (geometry, {vertexBufferMap, normalBufferMap, elementArrayBufferMap} as record) => {
  ...record,
  vertexBufferMap: disposeSparseMapData(geometry, vertexBufferMap),
  normalBufferMap: disposeSparseMapData(geometry, normalBufferMap),
  elementArrayBufferMap: disposeSparseMapData(geometry, elementArrayBufferMap)
};