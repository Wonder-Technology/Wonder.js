open BoxGeometryType;

open SourceInstanceType;

open VboBufferType;

open DisposeComponentService;

let disposeBoxGeometryBufferData =
    (
      geometry,
      {boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap} as record
    ) => {
  ...record,
  boxGeometryVertexBufferMap: disposeSparseMapData(geometry, boxGeometryVertexBufferMap),
  boxGeometryNormalBufferMap: disposeSparseMapData(geometry, boxGeometryNormalBufferMap),
  boxGeometryElementArrayBufferMap:
    disposeSparseMapData(geometry, boxGeometryElementArrayBufferMap)
};

let disposeCustomGeometryBufferData =
    (
      geometry,
      {
        customGeometryVertexBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap
      } as record
    ) => {
  ...record,
  customGeometryVertexBufferMap: disposeSparseMapData(geometry, customGeometryVertexBufferMap),
  customGeometryNormalBufferMap: disposeSparseMapData(geometry, customGeometryNormalBufferMap),
  customGeometryElementArrayBufferMap:
    disposeSparseMapData(geometry, customGeometryElementArrayBufferMap)
};

let disposeInstanceBufferData =
    (sourceInstance: sourceInstance, {matrixInstanceBufferMap} as record) => {
  ...record,
  matrixInstanceBufferMap: disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
};