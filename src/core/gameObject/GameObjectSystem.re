open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

/* todo dispose instance */
let hasSourceInstanceComponent = GameObjectComponentSystem.hasSourceInstanceComponent;

let hasCameraControllerComponent = GameObjectComponentSystem.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectComponentSystem.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectComponentSystem.addCameraControllerComponent;

let disposeCameraControllerComponent = GameObjectComponentSystem.disposeCameraControllerComponent;

let hasTransformComponent = GameObjectComponentSystem.hasTransformComponent;

let getTransformComponent = GameObjectComponentSystem.getTransformComponent;

let addTransformComponent = GameObjectComponentSystem.addTransformComponent;

let disposeTransformComponent = GameObjectComponentSystem.disposeTransformComponent;

let hasGeometryComponent = GameObjectComponentSystem.hasGeometryComponent;

let getGeometryComponent = GameObjectComponentSystem.getGeometryComponent;

let unsafeGetGeometryComponent = GameObjectComponentSystem.unsafeGetGeometryComponent;

let addGeometryComponent = GameObjectComponentSystem.addGeometryComponent;

let disposeGeometryComponent = GameObjectComponentSystem.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectComponentSystem.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectComponentSystem.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectComponentSystem.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectComponentSystem.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectComponentSystem.hasMaterialComponent;

let getMaterialComponent = GameObjectComponentSystem.getMaterialComponent;

let unsafeGetMaterialComponent = GameObjectComponentSystem.unsafeGetMaterialComponent;

let addMaterialComponent = GameObjectComponentSystem.addMaterialComponent;

let disposeMaterialComponent = GameObjectComponentSystem.disposeMaterialComponent;

let create = (state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateSystem.create(state);
  let (state, transform) = TransformSystem.create(state);
  (addTransformComponent(uid, transform, state), uid)
};

let dispose = (uid: int, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateSystem.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore;
  let state =
    switch (getTransformComponent(uid, state)) {
    | Some(transform) => disposeTransformComponent(uid, transform, state)
    | None => state
    };
  let state =
    switch (getMeshRendererComponent(uid, state)) {
    | Some(meshRenderer) => disposeMeshRendererComponent(uid, meshRenderer, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) => disposeMaterialComponent(uid, material, state)
    | None => state
    };
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => disposeGeometryComponent(uid, geometry, state)
    | None => state
    };
  let state =
    switch (getCameraControllerComponent(uid, state)) {
    | Some(cameraController) => disposeCameraControllerComponent(uid, cameraController, state)
    | None => state
    };
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

let batchDispose = (uidArray: array(int), state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateSystem.getGameObjectData(state);
  uidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((uid) => disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore)
     );
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let state =
    state
    |> GameObjectComponentSystem.batchGetMeshRendererComponent(uidArray)
    |> GameObjectComponentSystem.batchDisposeMeshRendererComponent(disposedUidMap, state)
    |> GameObjectComponentSystem.batchGetTransformComponent(uidArray)
    |> GameObjectComponentSystem.batchDisposeTransformComponent(disposedUidMap, state)
    |> GameObjectComponentSystem.batchGetMaterialComponent(uidArray)
    |> GameObjectComponentSystem.batchDisposeMaterialComponent(disposedUidMap, state)
    |> GameObjectComponentSystem.batchGetGeometryComponent(uidArray)
    |> GameObjectComponentSystem.batchDisposeGeometryComponent(disposedUidMap, state)
    |> GameObjectComponentSystem.batchGetCameraControllerComponent(uidArray)
    |> GameObjectComponentSystem.batchDisposeCameraControllerComponent(disposedUidMap, state);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

/* {
                   cloneChildren:true,
                   cloneGeometry:true
                   ////shareGeometry:false
   } */
let clone = (uid: int, count: int, state: StateDataType.state) => {
  let countRangeArr = ArraySystem.range(0, count - 1);
  let totalClonedGameObjectArr = [||];
  let rec _clone =
          (
            uid: int,
            transform,
            countRangeArr,
            clonedParentTransformArr,
            totalClonedGameObjectArr,
            state: StateDataType.state
          ) => {
    let clonedGameObjectArr = [||];
    let state =
      countRangeArr
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, _) => {
               let (state, gameObject) = GameObjectCreateSystem.create(state);
               clonedGameObjectArr |> Js.Array.push(gameObject) |> ignore;
               state
             }
           ),
           state
         );
    totalClonedGameObjectArr |> Js.Array.push(clonedGameObjectArr) |> ignore;
    let state =
      switch (getMeshRendererComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMeshRendererArr) =
          GameObjectComponentSystem.cloneMeshRendererComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentSystem.batchAddMeshRendererComponentForClone(
             clonedGameObjectArr,
             clonedMeshRendererArr
           )
      | None => state
      };
    let state =
      switch (getGeometryComponent(uid, state)) {
      | Some(geometry) =>
        let (state, clonedGeometryArr) =
          GameObjectComponentSystem.cloneGeometryComponent(geometry, countRangeArr, state);
        state
        |> GameObjectComponentSystem.batchAddGeometryComponentForClone(
             clonedGameObjectArr,
             clonedGeometryArr
           )
      | None => state
      };
    let state =
      switch (getMaterialComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMaterialArr) =
          GameObjectComponentSystem.cloneMaterialComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentSystem.batchAddMaterialComponentForClone(
             clonedGameObjectArr,
             clonedMaterialArr
           )
      | None => state
      };
    let state =
      switch (getCameraControllerComponent(uid, state)) {
      | Some(cameraController) =>
        let (state, clonedCameraControllerArr) =
          GameObjectComponentSystem.cloneCameraControllerComponent(
            cameraController,
            countRangeArr,
            state
          );
        state
        |> GameObjectComponentSystem.batchAddCameraControllerComponentForClone(
             clonedGameObjectArr,
             clonedCameraControllerArr
           )
      | None => state
      };
    let (state, clonedTransformArr) =
      GameObjectComponentSystem.cloneTransformComponent(transform, countRangeArr, state);
    /* todo optimize compare: add in each loop? */
    let state =
      state
      |> GameObjectComponentSystem.batchAddTransformComponentForClone(
           clonedGameObjectArr,
           clonedTransformArr
         );
    clonedParentTransformArr
    |> ArraySystem.reduceOneParami(
         [@bs]
         (
           (transformData, clonedParentTransform, i) =>
             transformData
             |> TransformHierachySystem.setParent(
                  Some(clonedParentTransform),
                  clonedTransformArr[i]
                )
         ),
         TransformStateSystem.getTransformData(state)
       );
    TransformHierachySystem.unsafeGetChildren(
      transform,
      TransformStateSystem.getTransformData(state)
    )
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, childTransform) =>
             state
             |> _clone(
                  TransformStateSystem.getTransformData(state)
                  |> TransformGameObjectSystem.getGameObject(childTransform)
                  |> Js.Option.getExn,
                  childTransform,
                  countRangeArr,
                  clonedTransformArr,
                  totalClonedGameObjectArr
                )
         ),
         state
       )
  };
  (
    _clone(
      uid,
      getTransformComponent(uid, state) |> Js.Option.getExn,
      countRangeArr,
      [||],
      totalClonedGameObjectArr,
      state
    ),
    totalClonedGameObjectArr
  )
};

let isAlive = (uid: int, state: StateDataType.state) => {
  let {transformMap, disposedUidMap} = GameObjectStateSystem.getGameObjectData(state);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: int, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) =>
      GeometryInitComponentSystem.handleInitComponent(
        geometry,
        GeometryIndexSystem.getMappedIndex(geometry, GeometryIndexSystem.getMappedIndexMap(state)),
        state
      )
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialInitComponentSystem.handleInitComponent(
        [@bs] DeviceManagerSystem.getGl(state),
        material,
        state
      )
    | None => state
    };
  state
};

let initData = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  cameraControllerMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  geometryMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  meshRendererMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  materialMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  sourceInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty()
};