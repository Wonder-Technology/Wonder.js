open GameObjectType;

open ComponentType;

open Contract;

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
      sourceComponent: component,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state: StateDataType.state
    ) =>
  MaterialCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
  );

let cloneCameraControllerComponent =
    (sourceComponent: component, countRangeArr: array(int), state: StateDataType.state) =>
  CameraControllerCloneComponentCommon.handleCloneComponent(sourceComponent, countRangeArr, state);