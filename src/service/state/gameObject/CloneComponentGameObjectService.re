open StateDataType;

open GameObjectType;

open ComponentType;

let cloneBasicCameraViewComponent =
    (sourceComponent: component, countRangeArr: array(int), {basicCameraViewRecord} as state) => {
  let (basicCameraViewRecord, componentArr) =
    CloneBasicCameraViewService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      basicCameraViewRecord
    );
  ({...state, basicCameraViewRecord}, componentArr)
};

let clonePerspectiveCameraProjectionComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {perspectiveCameraProjectionRecord} as state
    ) => {
  let (perspectiveCameraProjectionRecord, componentArr) =
    ClonePerspectiveCameraProjectionService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      perspectiveCameraProjectionRecord
    );
  ({...state, perspectiveCameraProjectionRecord}, componentArr)
};

let cloneTransformComponent = (sourceComponent: component, countRangeArr: array(int), state) =>
  CloneTransformService.handleCloneComponent(sourceComponent, countRangeArr, state);

let cloneMeshRendererComponent =
    (sourceComponent: component, countRangeArr: array(int), {meshRendererRecord} as state) => {
  let (meshRendererRecord, componentArr) =
    CloneMeshRendererService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      meshRendererRecord
    );
  ({...state, meshRendererRecord}, componentArr)
};

let cloneBoxGeometryComponent =
    (sourceComponent: component, countRangeArr: array(int), {boxGeometryRecord} as state) => {
  let (boxGeometryRecord, componentArr) =
    CloneBoxGeometryService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      boxGeometryRecord
    );
  ({...state, boxGeometryRecord}, componentArr)
};

let cloneBasicMaterialComponent =
    (isShareMaterial: bool, sourceComponent: component, countRangeArr: array(int), state) =>
  CloneBasicMaterialService.handleCloneComponent(
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
  CloneLightMaterialService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state
  );

let cloneAmbientLightComponent =
    (sourceComponent: component, countRangeArr: array(int), {ambientLightRecord} as state) => {
  let (ambientLightRecord, componentArr) =
    CloneAmbientLightService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      ambientLightRecord
    );
  ({...state, ambientLightRecord}, componentArr)
};

let cloneDirectionLightComponent =
    (sourceComponent: component, countRangeArr: array(int), {directionLightRecord} as state) => {
  let (directionLightRecord, componentArr) =
    CloneDirectionLightService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      directionLightRecord
    );
  ({...state, directionLightRecord}, componentArr)
};

let clonePointLightComponent =
    (sourceComponent: component, countRangeArr: array(int), {pointLightRecord} as state) => {
  let (pointLightRecord, componentArr) =
    ClonePointLightService.handleCloneComponent(sourceComponent, countRangeArr, pointLightRecord);
  ({...state, pointLightRecord}, componentArr)
};