open GameObjectType;

open ComponentType;

let cloneBasicCameraViewComponent =
    (sourceComponent: component, countRangeArr: array(int), componentRecord) =>
  CloneBasicCameraViewService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    componentRecord
  );

let clonePerspectiveCameraProjectionComponent =
    (sourceComponent: component, countRangeArr: array(int), componentRecord) =>
  ClonePerspectiveCameraProjectionService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    componentRecord
  );



