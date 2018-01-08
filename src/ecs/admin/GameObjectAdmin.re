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

let _handleByDisposeCount = (data, state) =>
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  };

let _batchDisposeCommonComponent = (uidArray, disposedUidMap, state) =>
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
  |> GameObjectDisposeComponentCommon.batchDisposeCameraControllerComponent(disposedUidMap, state)
  |> GameObjectGetComponentCommon.batchGetObjectInstanceComponent(uidArray)
  |> GameObjectDisposeComponentCommon.batchDisposeObjectInstanceComponent(disposedUidMap, state);

let rec batchDispose = (uidArray: array(int), state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
  let disposedUidMap = ECSDisposeUtils.buildMapFromArray(uidArray, disposedUidMap);
  data.disposeCount = disposeCount + (uidArray |> Js.Array.length);
  state
  |> _batchDisposeCommonComponent(uidArray, disposedUidMap)
  |> GameObjectGetComponentCommon.batchGetSourceInstanceComponent(uidArray)
  |> GameObjectDisposeComponentCommon.batchDisposeSourceInstanceComponent(
       disposedUidMap,
       state,
       batchDispose
     )
  |> _handleByDisposeCount(data)
};

let _disposeComponent = (uid, state) => {
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
  state
};

let dispose = (uid: int, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateCommon.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.set(uid, true) |> ignore;
  state |> _disposeComponent(uid) |> _handleByDisposeCount(data)
};

let _checkForClone = (uid, state) =>
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

let _cloneComponent =
    (
      (uid, component: option(int), countRangeArr, clonedGameObjectArr: array(int)),
      (cloneComponentFunc, batchAddComponentFunc),
      state
    ) =>
  switch component {
  | Some(component) =>
    let (state, clonedComponentArr) = cloneComponentFunc(component, countRangeArr, state);
    batchAddComponentFunc(clonedGameObjectArr, clonedComponentArr, state)
  | None => state
  };

let rec _clone =
        (
          (uid: int, transform, countRangeArr, clonedParentTransformArr, totalClonedGameObjectArr),
          isShareMaterial,
          state: StateDataType.state
        ) => {
  let (state, clonedGameObjectArr) =
    countRangeArr
    |> ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, clonedGameObjectArr), _) => {
             let (state, gameObject) = GameObjectCreateCommon.create(state);
             (state, clonedGameObjectArr |> ArraySystem.push(gameObject))
           }
         ),
         (state, [||])
       );
  let totalClonedGameObjectArr = totalClonedGameObjectArr |> ArraySystem.push(clonedGameObjectArr);
  let (state, clonedTransformArr) =
    state
    |> _cloneComponent(
         (uid, getMeshRendererComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           GameObjectCloneComponentCommon.cloneMeshRendererComponent,
           GameObjectAddComponentCommon.batchAddMeshRendererComponentForClone
         )
       )
    |> _cloneComponent(
         (uid, getGeometryComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           GameObjectCloneComponentCommon.cloneGeometryComponent,
           GameObjectAddComponentCommon.batchAddGeometryComponentForClone
         )
       )
    |> _cloneComponent(
         (uid, getMaterialComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           GameObjectCloneComponentCommon.cloneMaterialComponent(isShareMaterial),
           GameObjectAddComponentCommon.batchAddMaterialComponentForClone(isShareMaterial)
         )
       )
    |> _cloneComponent(
         (uid, getCameraControllerComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           GameObjectCloneComponentCommon.cloneCameraControllerComponent,
           GameObjectAddComponentCommon.batchAddCameraControllerComponentForClone
         )
       )
    |> GameObjectCloneComponentCommon.cloneTransformComponent(transform, countRangeArr);
  /* todo optimize compare: add in each loop? */
  let state =
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
                (
                  state |> TransformSystem.getGameObject(childTransform) |> Js.Option.getExn,
                  childTransform,
                  countRangeArr,
                  clonedTransformArr,
                  totalClonedGameObjectArr
                ),
                isShareMaterial
              )
       ),
       state
     );
  state
};

/* {
                   cloneChildren:true,
                   cloneGeometry:true
                   ////shareGeometry:false
   } */
let clone = (uid: int, count: int, isShareMaterial: bool, state: StateDataType.state) => {
  _checkForClone(uid, state);
  let totalClonedGameObjectArr = [||];
  (
    _clone(
      (
        uid,
        getTransformComponent(uid, state) |> Js.Option.getExn,
        ArraySystem.range(0, count - 1),
        [||],
        totalClonedGameObjectArr
      ),
      isShareMaterial,
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