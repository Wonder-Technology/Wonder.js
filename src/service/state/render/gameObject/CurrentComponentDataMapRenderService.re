open VboBufferType;

let addToMap = (uid, componentData, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.set(uid, componentData, currentComponentDataMap);

let removeFromMap = (uid, currentComponentDataMap) =>
  currentComponentDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(uid)
  |> Obj.magic;

let getComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.get(uid, currentComponentDataMap);

let unsafeGetComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, currentComponentDataMap)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|has component|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let hasComponent = (uid, currentComponentDataMap, targetType_) =>
  switch (getComponentData(uid, currentComponentDataMap)) {
  | None => false
  | Some((_, type_)) => type_ === targetType_
  };

let getBoxGeometryType = () => 0;

let getCustomGeometryType = () => 1;

let getCurrentGeometryBufferMapAndGetPointsFuncs = (type_, vboBufferRecord) =>
  switch type_ {
  | type_ when type_ === getBoxGeometryType() => (
      (
        vboBufferRecord.boxGeometryVertexBufferMap,
        vboBufferRecord.boxGeometryNormalBufferMap,
        vboBufferRecord.boxGeometryElementArrayBufferMap
      ),
      (
        VerticesBoxGeometryRenderService.getVertices,
        NormalsBoxGeometryRenderService.getNormals,
        IndicesBoxGeometryRenderService.getIndices
      )
    )
  | _ => (
      (
        vboBufferRecord.customGeometryVertexBufferMap,
        vboBufferRecord.customGeometryNormalBufferMap,
        vboBufferRecord.customGeometryElementArrayBufferMap
      ),
      (
        VerticesCustomGeometryRenderService.getVertices,
        NormalsCustomGeometryRenderService.getNormals,
        IndicesCustomGeometryRenderService.getIndices
      )
    )
  };

let getGetIndicesCountFunc = (type_) =>
  switch type_ {
  | type_ when type_ === getBoxGeometryType() => IndicesBoxGeometryRenderService.getIndicesCount
  | _ => IndicesCustomGeometryRenderService.getIndicesCount
  };