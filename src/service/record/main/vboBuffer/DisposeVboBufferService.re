open AllInstanceType;

open SourceInstanceType;

open AllVboBufferType;

open DisposeComponentService;

let disposeGeometryBufferData =
  [@bs]
  (
    (
      geometry,
      {
        geometryVertexBufferMap,
        geometryTexCoordBufferMap,
        geometryNormalBufferMap,
        geometryElementArrayBufferMap
      } as record
    ) => {
      ...record,
      geometryVertexBufferMap: disposeSparseMapData(geometry, geometryVertexBufferMap),
      geometryTexCoordBufferMap:
        disposeSparseMapData(geometry, geometryTexCoordBufferMap),
      geometryNormalBufferMap: disposeSparseMapData(geometry, geometryNormalBufferMap),
      geometryElementArrayBufferMap:
        disposeSparseMapData(geometry, geometryElementArrayBufferMap)
    }
  );

let disposeInstanceBufferData =
  [@bs]
  (
    (sourceInstance: sourceInstance, {matrixInstanceBufferMap} as record) => {
      ...record,
      matrixInstanceBufferMap: disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
    }
  );

let _disposeVboBuffer =
    (needDisposeVboBufferArr, (addBufferToPoolFunc, disposeBufferDataFunc), vboBufferRecord) =>
  needDisposeVboBufferArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (vboBufferRecord, component) =>
           [@bs]
           disposeBufferDataFunc(component, [@bs] addBufferToPoolFunc(component, vboBufferRecord))
       ),
       vboBufferRecord
     );

let disposeGeometryVboBuffer = (geometryNeedDisposeVboBufferArr, vboBufferRecord) =>
  _disposeVboBuffer(
    geometryNeedDisposeVboBufferArr,
    (
      [@bs] PoolVboBufferService.addGeometryBufferToPool,
      [@bs] disposeGeometryBufferData
    ),
    vboBufferRecord
  );

let disposeSourceInstanceVboBuffer = (sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) =>
  _disposeVboBuffer(
    sourceInstanceNeedDisposeVboBufferArr,
    ([@bs] PoolVboBufferService.addInstanceBufferToPool, [@bs] disposeInstanceBufferData),
    vboBufferRecord
  );