open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

let hasCameraControllerComponent = GameObjectComponentUtils.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectComponentUtils.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectComponentUtils.addCameraControllerComponent;

let disposeCameraControllerComponent = GameObjectComponentUtils.disposeCameraControllerComponent;

let hasTransformComponent = GameObjectComponentUtils.hasTransformComponent;

let getTransformComponent = GameObjectComponentUtils.getTransformComponent;

let addTransformComponent = GameObjectComponentUtils.addTransformComponent;

let disposeTransformComponent = GameObjectComponentUtils.disposeTransformComponent;

let hasGeometryComponent = GameObjectComponentUtils.hasGeometryComponent;

let getGeometryComponent = GameObjectComponentUtils.getGeometryComponent;

let addGeometryComponent = GameObjectComponentUtils.addGeometryComponent;

let disposeGeometryComponent = GameObjectComponentUtils.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectComponentUtils.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectComponentUtils.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectComponentUtils.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectComponentUtils.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectComponentUtils.hasMaterialComponent;

let getMaterialComponent = GameObjectComponentUtils.getMaterialComponent;

let addMaterialComponent = GameObjectComponentUtils.addMaterialComponent;

let disposeMaterialComponent = GameObjectComponentUtils.disposeMaterialComponent;

let create = (state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateUtils.create(state);
  let (state, transform) = TransformCreateUtils.create(state);
  (addTransformComponent(uid, transform, state), uid)
};

let dispose = (uid: int, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> SparseMapSystem.set(uid, true) |> ignore;
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
  let {disposeCount, disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  uidArray
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((uid) => disposedUidMap |> SparseMapSystem.set(uid, true) |> ignore)
     );
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let state =
    state
    |> GameObjectComponentUtils.batchGetMeshRendererComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeMeshRendererComponent(disposedUidMap, state)
    |> GameObjectComponentUtils.batchGetTransformComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeTransformComponent(disposedUidMap, state)
    |> GameObjectComponentUtils.batchGetMaterialComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeMaterialComponent(disposedUidMap, state)
    |> GameObjectComponentUtils.batchGetGeometryComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeGeometryComponent(disposedUidMap, state)
    |> GameObjectComponentUtils.batchGetCameraControllerComponent(uidArray)
    |> GameObjectComponentUtils.batchDisposeCameraControllerComponent(disposedUidMap, state);
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
               let (state, gameObject) = GameObjectCreateUtils.create(state);
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
          GameObjectComponentUtils.cloneMeshRendererComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentUtils.batchAddMeshRendererComponent(
             clonedGameObjectArr,
             clonedMeshRendererArr
           )
      | None => state
      };
    let state =
      switch (getGeometryComponent(uid, state)) {
      | Some(geometry) =>
        let (state, clonedGeometryArr) =
          GameObjectComponentUtils.cloneGeometryComponent(
            GeometryIndexUtils.getMappedIndex(
              geometry,
              GeometryIndexUtils.getMappedIndexMap(state)
            ),
            countRangeArr,
            state
          );
        state
        |> GameObjectComponentUtils.batchAddGeometryComponent(
             clonedGameObjectArr,
             clonedGeometryArr
           )
      | None => state
      };
    let state =
      switch (getMaterialComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMaterialArr) =
          GameObjectComponentUtils.cloneMaterialComponent(meshRenderer, countRangeArr, state);
        state
        |> GameObjectComponentUtils.batchAddMaterialComponent(
             clonedGameObjectArr,
             clonedMaterialArr
           )
      | None => state
      };
    let state =
      switch (getCameraControllerComponent(uid, state)) {
      | Some(cameraController) =>
        let (state, clonedCameraControllerArr) =
          GameObjectComponentUtils.cloneCameraControllerComponent(
            cameraController,
            countRangeArr,
            state
          );
        state
        |> GameObjectComponentUtils.batchAddCameraControllerComponent(
             clonedGameObjectArr,
             clonedCameraControllerArr
           )
      | None => state
      };
    let (state, clonedTransformArr) =
      GameObjectComponentUtils.cloneTransformComponent(transform, countRangeArr, state);
    /* todo optimize compare: add in each loop? */
    let state =
      state
      |> GameObjectComponentUtils.batchAddTransformComponent(
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
         TransformStateUtils.getTransformData(state)
       );
    /* todo optimize: use loop */
    TransformHierachySystem.unsafeGetChildren(
      transform,
      TransformStateUtils.getTransformData(state)
    )
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, childTransform) =>
             state
             |> _clone(
                  TransformStateUtils.getTransformData(state)
                  |> TransformGameObjectUtils.getGameObject(childTransform)
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
  let {transformMap, disposedUidMap} = GameObjectStateUtils.getGameObjectData(state);
  disposedUidMap |> SparseMapSystem.has(uid) ?
    false : transformMap |> SparseMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: int, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) =>
      GeometryInitComponentUtils.handleInitComponent(
        GeometryIndexUtils.getMappedIndex(geometry, GeometryIndexUtils.getMappedIndexMap(state)),
        state
      )
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialInitComponentUtils.handleInitComponent(
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
  disposedUidMap: SparseMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: SparseMapSystem.createEmpty(),
  cameraControllerMap: SparseMapSystem.createEmpty(),
  geometryMap: SparseMapSystem.createEmpty(),
  meshRendererMap: SparseMapSystem.createEmpty(),
  materialMap: SparseMapSystem.createEmpty()
};