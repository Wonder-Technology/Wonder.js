open Contract;

open GameObjectType;

let init = (state: StateDataType.state) =>
  state |> CameraControllerSystem.init |> GeometrySystem.init;

/*  */
let initDataFromState = (state: StateDataType.state) =>
  state |> TransformHelper.initData |> MaterialAdmin.initData |> GeometryHelper.initData;

let update = (elapsed: float, state: StateDataType.state) =>
  state |> CameraControllerSystem.update;

let hasSourceInstanceComponent = GameObjectHasComponentCommon.hasSourceInstanceComponent;

let getSourceInstanceComponent = GameObjectGetComponentCommon.getSourceInstanceComponent;

let addSourceInstanceComponent = GameObjectAddComponentCommon.addSourceInstanceComponent;

let disposeSourceInstanceComponent = GameObjectDisposeComponentCommon.disposeSourceInstanceComponent;

let hasObjectInstanceComponent = GameObjectHasComponentCommon.hasObjectInstanceComponent;

let getObjectInstanceComponent = GameObjectGetComponentCommon.getObjectInstanceComponent;

let addObjectInstanceComponent = GameObjectAddComponentCommon.addObjectInstanceComponent;

let disposeObjectInstanceComponent = GameObjectDisposeComponentCommon.disposeObjectInstanceComponent;

let hasCameraControllerComponent = GameObjectHasComponentCommon.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectGetComponentCommon.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectAddComponentCommon.addCameraControllerComponent;

let disposeCameraControllerComponent = GameObjectDisposeComponentCommon.disposeCameraControllerComponent;

let hasTransformComponent = GameObjectHasComponentCommon.hasTransformComponent;

let getTransformComponent = GameObjectGetComponentCommon.getTransformComponent;

let unsafeGetTransformComponent = GameObjectGetComponentCommon.unsafeGetTransformComponent;

let addTransformComponent = GameObjectAddComponentCommon.addTransformComponent;

let disposeTransformComponent = GameObjectDisposeComponentCommon.disposeTransformComponent;

let hasGeometryComponent = GameObjectHasComponentCommon.hasGeometryComponent;

let getGeometryComponent = GameObjectGetComponentCommon.getGeometryComponent;

let unsafeGetGeometryComponent = GameObjectGetComponentCommon.unsafeGetGeometryComponent;

let addGeometryComponent = GameObjectAddComponentCommon.addGeometryComponent;

let disposeGeometryComponent = GameObjectDisposeComponentCommon.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectHasComponentCommon.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectGetComponentCommon.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectAddComponentCommon.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectDisposeComponentCommon.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectHasComponentCommon.hasMaterialComponent;

let getMaterialComponent = GameObjectGetComponentCommon.getMaterialComponent;

let unsafeGetMaterialComponent = GameObjectGetComponentCommon.unsafeGetMaterialComponent;

let addMaterialComponent = GameObjectAddComponentCommon.addMaterialComponent;

let disposeMaterialComponent = GameObjectDisposeComponentCommon.disposeMaterialComponent;

let create = (state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateCommon.create(state);
  let (state, transform) = TransformSystem.create(state);
  (addTransformComponent(uid, transform, state), uid)
};

let rec batchDispose = (uidArray: array(int), state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
  let disposedUidMap = ECSDisposeUtils.buildMapFromArray(uidArray, disposedUidMap);
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  let state =
    state
    |> GameObjectGetComponentCommon.batchGetMeshRendererComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeMeshRendererComponent(disposedUidMap, state)
    |> GameObjectGetComponentCommon.batchGetTransformComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeTransformComponent(disposedUidMap, state)
    |> GameObjectGetComponentCommon.batchGetMaterialComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeMaterialComponent(disposedUidMap, state)
    |> GameObjectGetComponentCommon.batchGetGeometryComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeGeometryComponent(disposedUidMap, state)
    |> GameObjectGetComponentCommon.batchGetCameraControllerComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeCameraControllerComponent(
         disposedUidMap,
         state
       )
    |> GameObjectGetComponentCommon.batchGetSourceInstanceComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeSourceInstanceComponent(
         disposedUidMap,
         state,
         batchDispose
       )
    |> GameObjectGetComponentCommon.batchGetObjectInstanceComponent(uidArray)
    |> GameObjectDisposeComponentCommon.batchDisposeObjectInstanceComponent(disposedUidMap, state);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

let dispose = (uid: int, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
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
  let state =
    switch (getSourceInstanceComponent(uid, state)) {
    | Some(sourceInstance) =>
      disposeSourceInstanceComponent(uid, sourceInstance, batchDispose, state)
    | None => state
    };
  let state =
    switch (getObjectInstanceComponent(uid, state)) {
    | Some(objectInstance) => disposeObjectInstanceComponent(uid, objectInstance, state)
    | None => state
    };
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
let clone = (uid: int, count: int, isShareMaterial: bool, state: StateDataType.state) => {
  requireCheck(
    () => {
      open Contract.Operators;
      test(
        "shouldn't clone sourceInstance gameObject",
        () => hasSourceInstanceComponent(uid, state) |> assertFalse
      );
      test(
        "shouldn't clone objectInstance gameObject",
        () => hasObjectInstanceComponent(uid, state) |> assertFalse
      )
    }
  );
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
               let (state, gameObject) = GameObjectCreateCommon.create(state);
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
          GameObjectCloneComponentCommon.cloneMeshRendererComponent(
            meshRenderer,
            countRangeArr,
            state
          );
        state
        |> GameObjectAddComponentCommon.batchAddMeshRendererComponentForClone(
             clonedGameObjectArr,
             clonedMeshRendererArr
           )
      | None => state
      };
    let state =
      switch (getGeometryComponent(uid, state)) {
      | Some(geometry) =>
        let (state, clonedGeometryArr) =
          GameObjectCloneComponentCommon.cloneGeometryComponent(geometry, countRangeArr, state);
        state
        |> GameObjectAddComponentCommon.batchAddGeometryComponentForClone(
             clonedGameObjectArr,
             clonedGeometryArr
           )
      | None => state
      };
    let state =
      switch (getMaterialComponent(uid, state)) {
      | Some(meshRenderer) =>
        let (state, clonedMaterialArr) =
          GameObjectCloneComponentCommon.cloneMaterialComponent(
            meshRenderer,
            countRangeArr,
            isShareMaterial,
            state
          );
        state
        |> GameObjectAddComponentCommon.batchAddMaterialComponentForClone(
             clonedGameObjectArr,
             clonedMaterialArr,
             isShareMaterial
           )
      | None => state
      };
    let state =
      switch (getCameraControllerComponent(uid, state)) {
      | Some(cameraController) =>
        let (state, clonedCameraControllerArr) =
          GameObjectCloneComponentCommon.cloneCameraControllerComponent(
            cameraController,
            countRangeArr,
            state
          );
        state
        |> GameObjectAddComponentCommon.batchAddCameraControllerComponentForClone(
             clonedGameObjectArr,
             clonedCameraControllerArr
           )
      | None => state
      };
    let (state, clonedTransformArr) =
      GameObjectCloneComponentCommon.cloneTransformComponent(transform, countRangeArr, state);
    /* todo optimize compare: add in each loop? */
    /* let state = */
    state
    |> GameObjectAddComponentCommon.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       );
    clonedParentTransformArr
    |> ArraySystem.reduceOneParami(
         [@bs]
         (
           (transformData, clonedParentTransform, i) =>
             transformData
             |> TransformSystem.setParentNotMarkDirty(
                  Some(clonedParentTransform),
                  clonedTransformArr[i]
                )
         ),
         TransformSystem.getTransformData(state)
       )
    |> TransformSystem.unsafeGetChildren(transform)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, childTransform) =>
             state
             |> _clone(
                  state |> TransformSystem.getGameObject(childTransform) |> Js.Option.getExn,
                  childTransform,
                  countRangeArr,
                  clonedTransformArr,
                  totalClonedGameObjectArr
                )
         ),
         state
       );
    state
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
  let {transformMap, disposedUidMap} = GameObjectStateCommon.getGameObjectData(state);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: int, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => GeometrySystem.handleInitComponent(geometry, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialSystem.handleInitComponent([@bs] DeviceManagerSystem.getGl(state), material, state)
    | None => state
    };
  state
};

let deepCopyStateForRestore = GameObjectStateCommon.deepCopyStateForRestore;