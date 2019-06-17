open StateDataMainType;

open StateDataMainType;

open ComponentType;

let cloneScriptComponent =
    (sourceComponent: component, countRangeArr: array(int), state) =>
  CloneScriptMainService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    state,
  );

let cloneBasicCameraViewComponent =
    (sourceComponent: component, countRangeArr: array(int), state) =>
  CloneBasicCameraViewMainService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    state,
  );

let clonePerspectiveCameraProjectionComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {perspectiveCameraProjectionRecord} as state,
    ) => {
  let (perspectiveCameraProjectionRecord, componentArr) =
    ClonePerspectiveCameraProjectionService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      perspectiveCameraProjectionRecord,
    );
  ({...state, perspectiveCameraProjectionRecord}, componentArr);
};

let cloneFlyCameraControllerComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {flyCameraControllerRecord} as state,
    ) => {
  let (flyCameraControllerRecord, componentArr) =
    CloneFlyCameraControllerService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      flyCameraControllerRecord,
    );
  ({...state, flyCameraControllerRecord}, componentArr);
};

let cloneArcballCameraControllerComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {arcballCameraControllerRecord} as state,
    ) => {
  let (arcballCameraControllerRecord, componentArr) =
    CloneArcballCameraControllerService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      arcballCameraControllerRecord,
    );
  ({...state, arcballCameraControllerRecord}, componentArr);
};

let cloneTransformComponent =
    (sourceComponent: component, countRangeArr: array(int), state) =>
  CloneTransformMainService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    state,
  );

let cloneMeshRendererComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {meshRendererRecord} as state,
    ) => {
  let (state, componentArr) =
    CloneMeshRendererMainService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      state,
    );
  (state, componentArr);
};

let cloneGeometryComponent =
    (
      sourceComponent: component,
      countRangeArr: array(int),
      {geometryRecord} as state,
    ) => {
  let (geometryRecord, componentArr) =
    CloneGeometryService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      geometryRecord,
    );
  ({...state, geometryRecord}, componentArr);
};

let cloneBasicMaterialComponent =
    (
      isShareMaterial: bool,
      sourceComponent: component,
      countRangeArr: array(int),
      state,
    ) =>
  CloneBasicMaterialMainService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state,
  );

let cloneLightMaterialComponent =
    (
      isShareMaterial: bool,
      sourceComponent: component,
      countRangeArr: array(int),
      state: StateDataMainType.state,
    ) =>
  CloneLightMaterialMainService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    isShareMaterial,
    state,
  );

let cloneDirectionLightComponent =
    (sourceComponent: component, countRangeArr: array(int), state) => {
  let (directionLightRecord, componentArr) =
    CloneDirectionLightService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      RecordDirectionLightMainService.getRecord(state),
    );
  (
    {...state, directionLightRecord: Some(directionLightRecord)},
    componentArr,
  );
};

let clonePointLightComponent =
    (sourceComponent: component, countRangeArr: array(int), state) => {
  let (pointLightRecord, componentArr) =
    ClonePointLightService.handleCloneComponent(
      sourceComponent,
      countRangeArr,
      RecordPointLightMainService.getRecord(state),
    );
  ({...state, pointLightRecord: Some(pointLightRecord)}, componentArr);
};