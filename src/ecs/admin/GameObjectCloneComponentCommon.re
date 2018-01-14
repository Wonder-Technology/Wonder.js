open GameObjectType;

open ComponentType;

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  TransformCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  MeshRendererCloneComponentCommon.handleCloneComponent(countRangeArr, state);

let cloneGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  GeometryCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMaterialComponent =
    (
      isShareMaterial: bool,
      sourceComponent: component,
      countRangeArr: array(int),
      state: StateDataType.state
    ) =>
  MaterialCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
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

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneComponent =
    ((uid, transform, countRangeArr, clonedGameObjectArr: array(int)), isShareMaterial, state) => {
  open GameObjectGetComponentCommon;
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
         (uid, [@bs] getMaterialComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneMaterialComponent(isShareMaterial),
           GameObjectAddComponentCommon.batchAddMaterialComponentForClone(isShareMaterial)
         )
       )
    |> _cloneComponent(
         (uid, [@bs] getCameraControllerComponent(uid, state), countRangeArr, clonedGameObjectArr),
         (
           cloneCameraControllerComponent,
           GameObjectAddComponentCommon.batchAddCameraControllerComponentForClone
         )
       )
    |> cloneTransformComponent(transform, countRangeArr);
  (
    state
    |> GameObjectAddComponentCommon.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       ),
    clonedTransformArr
  )
};