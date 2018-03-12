open StateDataType;

open GameObjectType;

open ComponentType;

/* let cloneTransformComponent =
     (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
   CloneTransformService.handleCloneComponent(sourceComponent, countRangeArr, state); */
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

let cloneComponent =
    (
      (uid, transform, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  open GameObjectGetComponentCommon;
  open StateDataType;
  /* TODO refactor */
  /* let (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord) =
       CloneGameObjectComponentService.clone(
         (uid, transform, countRangeArr, clonedGameObjectArr),
         isShareMaterial,
         (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord)
       );
     let state = {
       ...state,
       basicCameraViewRecord,
       perspectiveCameraProjectionRecord,
       gameObjectRecord
     }; */
  let (state, clonedTransformArr) =
    state
    |> CloneGameObjectComponentService.clone(
         (uid, transform, countRangeArr, clonedGameObjectArr),
         isShareMaterial
       );
  (
    state
    |> AddGameObjectComponentService.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       ),
    clonedTransformArr
  )
};