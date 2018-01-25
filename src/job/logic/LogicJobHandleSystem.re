open StateDataType;

let _getInitJobHandles = () => [
  ("init_cameraController", InitCameraControllerJob.getJob),
  ("init_geometry", InitGeometryJob.getJob),
  ("start_time", StartTimeJob.getJob)
];

let _getUpdateJobHandles = () => [
  ("tick", TickJob.getJob),
  ("update_cameraController", UpdateCameraControllerJob.getJob)
];

let createInitJobHandleMap = () => WonderCommonlib.HashMapSystem.fromList(_getInitJobHandles());

let createUpdateJobHandleMap = () =>
  WonderCommonlib.HashMapSystem.fromList(_getUpdateJobHandles());