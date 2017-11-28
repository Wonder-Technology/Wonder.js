open GameObjectType;

open VboBufferType;

open Contract;

open StateDataType;

open GeometryType;

let reAllocateGameObject = (state: StateDataType.state) => {
  let {
        aliveUidArray,
        disposedUidMap,
        transformMap,
        meshRendererMap,
        geometryMap,
        materialMap,
        cameraControllerMap
      } as data =
    GameObjectStateUtils.getGameObjectData(state);
  let newTransformMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newMeshRendererMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newGeometryMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newCameraControllerMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newMaterialMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newAliveUidArray =
    aliveUidArray
    |> Js.Array.filter((aliveUid) => ! MemoryUtils.isDisposed(aliveUid, disposedUidMap));
  newAliveUidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (uid) => {
           newTransformMap
           |> WonderCommonlib.SparseMapSystem.set(
                uid,
                transformMap |> WonderCommonlib.SparseMapSystem.unsafeGet(uid)
              )
           |> ignore;
           switch (meshRendererMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(meshRenderer) =>
             newMeshRendererMap |> WonderCommonlib.SparseMapSystem.set(uid, meshRenderer) |> ignore
           };
           switch (geometryMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(geometry) =>
             newGeometryMap |> WonderCommonlib.SparseMapSystem.set(uid, geometry) |> ignore
           };
           switch (materialMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(material) =>
             newMaterialMap |> WonderCommonlib.SparseMapSystem.set(uid, material) |> ignore
           };
           switch (cameraControllerMap |> WonderCommonlib.SparseMapSystem.get(uid)) {
           | None => ()
           | Some(cameraController) =>
             newCameraControllerMap
             |> WonderCommonlib.SparseMapSystem.set(uid, cameraController)
             |> ignore
           }
         }
       )
     );
  data.disposedUidMap = WonderCommonlib.SparseMapSystem.createEmpty();
  data.aliveUidArray = newAliveUidArray;
  data.transformMap = newTransformMap;
  data.meshRendererMap = newMeshRendererMap;
  data.geometryMap = newGeometryMap;
  data.materialMap = newMaterialMap;
  data.cameraControllerMap = newCameraControllerMap;
  state
};

let _updateInfoArray = (newInfoArray, newIndex: int, {startIndex, endIndex}, offset: int) => {
  let increment = endIndex - startIndex;
  Array.unsafe_set(
    newInfoArray,
    newIndex,
    GeometryOperateDataUtils.buildInfo(offset, offset + increment)
  );
  newInfoArray
};

let reAllocateGeometry = (state: StateDataType.state) => {
  let {
        vertices,
        indices,
        verticesInfoArray,
        indicesInfoArray,
        configDataMap,
        computeDataFuncMap,
        gameObjectMap,
        indicesCountCacheMap,
        verticesCountCacheMap,
        disposedIndexMap,
        aliveIndexArray,
        isClonedMap,
        dataGroupMap
      } as geometryData =
    GeometryStateUtils.getGeometryData(state);
  let {vertexBufferMap, elementArrayBufferMap} as vboBufferData =
    VboBufferStateUtils.getVboBufferData(state);
  let newIndex = ref(0);
  let newIndexMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newComputeDataFuncMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newConfigDataMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newGameObjectMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newIndicesCountCacheMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newVerticesCountCacheMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newIsClonedMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newDataGroupMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newVertexBufferMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newElementArrayBufferMap = WonderCommonlib.SparseMapSystem.createEmpty();
  let newVerticesInfoArray = WonderCommonlib.ArraySystem.createEmpty();
  let newIndicesInfoArray = WonderCommonlib.ArraySystem.createEmpty();
  let newVerticesOffset = ref(0);
  let newIndicesOffset = ref(0);
  let newAliveIndexArray =
    aliveIndexArray
    |> Js.Array.filter((aliveIndex) => ! MemoryUtils.isDisposed(aliveIndex, disposedIndexMap));
  newAliveIndexArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (index) =>
           MemoryUtils.isDisposed(index, disposedIndexMap) ?
             () :
             {
               let verticesInfo = GeometryOperateDataUtils.getInfo(verticesInfoArray, newIndex^);
               let indicesInfo = GeometryOperateDataUtils.getInfo(indicesInfoArray, newIndex^);
               GeometryIndexUtils.setMappedIndex(index, newIndex^, newIndexMap) |> ignore;
               _updateInfoArray(newVerticesInfoArray, newIndex^, verticesInfo, newVerticesOffset^);
               _updateInfoArray(newIndicesInfoArray, newIndex^, indicesInfo, newIndicesOffset^);
               newVerticesOffset :=
                 TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
                   vertices,
                   newVerticesOffset^,
                   vertices,
                   verticesInfo.startIndex,
                   verticesInfo.endIndex
                 );
               newIndicesOffset :=
                 TypeArrayUtils.fillUint16ArrayWithUint16Array(
                   indices,
                   newIndicesOffset^,
                   indices,
                   indicesInfo.startIndex,
                   indicesInfo.endIndex
                 );
               newConfigDataMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    configDataMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newComputeDataFuncMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    computeDataFuncMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newGameObjectMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newIndicesCountCacheMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    indicesCountCacheMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newVerticesCountCacheMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    verticesCountCacheMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newIsClonedMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    isClonedMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newDataGroupMap
               |> WonderCommonlib.SparseMapSystem.set(
                    newIndex^,
                    dataGroupMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newVertexBufferMap
               |> WonderCommonlib.SparseMapSystem.set(
                    index,
                    vertexBufferMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newElementArrayBufferMap
               |> WonderCommonlib.SparseMapSystem.set(
                    index,
                    elementArrayBufferMap |> WonderCommonlib.SparseMapSystem.unsafeGet(index)
                  )
               |> ignore;
               newIndex := succ(newIndex^)
             }
       )
     );
  geometryData.mappedIndex = newIndex^;
  geometryData.mappedIndexMap = newIndexMap;
  geometryData.verticesOffset = newVerticesOffset^;
  geometryData.indicesOffset = newIndicesOffset^;
  geometryData.verticesInfoArray = newVerticesInfoArray;
  geometryData.indicesInfoArray = newIndicesInfoArray;
  geometryData.configDataMap = newConfigDataMap;
  geometryData.computeDataFuncMap = newComputeDataFuncMap;
  geometryData.gameObjectMap = newGameObjectMap;
  geometryData.indicesCountCacheMap = newIndicesCountCacheMap;
  geometryData.verticesCountCacheMap = newVerticesCountCacheMap;
  geometryData.isClonedMap = newIsClonedMap;
  geometryData.dataGroupMap = newDataGroupMap;
  geometryData.disposedIndexMap = WonderCommonlib.SparseMapSystem.createEmpty();
  geometryData.aliveIndexArray = newAliveIndexArray;
  vboBufferData.vertexBufferMap = newVertexBufferMap;
  vboBufferData.elementArrayBufferMap = newElementArrayBufferMap;
  state
};