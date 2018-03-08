open GameObjectType;

open ComponentType;

let cloneBasicCameraViewComponent =
    (sourceComponent: component, countRangeArr: array(int), componentRecord) =>
  BasicCameraViewCloneComponentService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    componentRecord
  );

let clonePerspectiveCameraProjectionComponent =
    (sourceComponent: component, countRangeArr: array(int), componentRecord) =>
  PerspectiveCameraProjectionCloneComponentService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    componentRecord
  );



