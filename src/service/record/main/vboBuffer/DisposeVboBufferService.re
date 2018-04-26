open BoxGeometryType;

open InstanceType;

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

let disposeBoxGeometryVboBuffer = (boxGeometryNeedDisposeVboBufferArr, vboBufferRecord) =>
  boxGeometryNeedDisposeVboBufferArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (vboBufferRecord, geometry) =>
           vboBufferRecord
           |> PoolVboBufferService.addBoxGeometryBufferToPool(geometry)
           |> disposeBoxGeometryBufferData(geometry)
       ),
       vboBufferRecord
     );

let disposeCustomGeometryVboBuffer = (customGeometryNeedDisposeVboBufferArr, vboBufferRecord) =>
  customGeometryNeedDisposeVboBufferArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (vboBufferRecord, geometry) =>
           vboBufferRecord
           |> PoolVboBufferService.addCustomGeometryBufferToPool(geometry)
           |> disposeCustomGeometryBufferData(geometry)
       ),
       vboBufferRecord
     );

let disposeSourceInstanceVboBuffer = (sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) =>
  sourceInstanceNeedDisposeVboBufferArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (vboBufferRecord, sourceInstance) =>
           vboBufferRecord
           |> PoolVboBufferService.addInstanceBufferToPool(sourceInstance)
           |> disposeInstanceBufferData(sourceInstance)
       ),
       vboBufferRecord
     );