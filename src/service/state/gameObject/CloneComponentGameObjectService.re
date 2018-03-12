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