open StateDataType;

open GameObjectType;

open ComponentType;

/* let cloneTransformComponent =
     (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
   CloneTransformService.handleCloneComponent(sourceComponent, countRangeArr, state); */
let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentCommon.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometryCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneBasicMaterialComponent =
    (
      isShareMaterial: bool,
      sourceComponent: component,
      countRangeArr: array(int),
      state: StateDataType.state
    ) =>
  BasicMaterialCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
  );

let cloneLightMaterialComponent =
    (
      isShareMaterial: bool,
      sourceComponent: component,
      countRangeArr: array(int),
      state: StateDataType.state
    ) =>
  LightMaterialCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
  );

let cloneAmbientLightComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  AmbientLightCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneDirectionLightComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  DirectionLightCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let clonePointLightComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  PointLightCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

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
  let state =
    state
    |> CloneGameObjectComponentService.clone(
         (uid, transform, countRangeArr, clonedGameObjectArr),
         isShareMaterial
       );
  let (state, clonedTransformArr) =
    state
    |> _cloneComponent(
         (uid, [@bs] getMeshRendererComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneMeshRendererComponent,
           GameObjectAddComponentCommon.batchAddMeshRendererComponentForClone
         )
       )
    |> _cloneComponent(
         (uid, [@bs] getGeometryComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (cloneGeometryComponent, GameObjectAddComponentCommon.batchAddGeometryComponentForClone)
       )
    |> _cloneComponent(
         (uid, [@bs] getBasicMaterialComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneBasicMaterialComponent(isShareMaterial),
           GameObjectAddComponentCommon.batchAddBasicMaterialComponentForClone(isShareMaterial)
         )
       )
    |> _cloneComponent(
         (uid, [@bs] getLightMaterialComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneLightMaterialComponent(isShareMaterial),
           GameObjectAddComponentCommon.batchAddLightMaterialComponentForClone(isShareMaterial)
         )
       )
    /* |> _cloneComponent(
         (uid, [@bs] getBasicCameraViewComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneBasicCameraViewComponent,
           GameObjectAddComponentCommon.batchAddBasicCameraViewComponentForClone
         )
       ) */
    |> _cloneComponent(
         (uid, [@bs] getAmbientLightComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneAmbientLightComponent,
           GameObjectAddComponentCommon.batchAddAmbientLightComponentForClone
         )
       )
    |> _cloneComponent(
         (uid, [@bs] getDirectionLightComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneDirectionLightComponent,
           GameObjectAddComponentCommon.batchAddDirectionLightComponentForClone
         )
       )
    |> _cloneComponent(
         (uid, [@bs] getPointLightComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           clonePointLightComponent,
           GameObjectAddComponentCommon.batchAddPointLightComponentForClone
         )
       )
    |> CloneComponentGameObjectService.cloneTransformComponent(transform, countRangeArr);
  (
    state
    |> AddGameObjectComponentService.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       ),
    clonedTransformArr
  )
};