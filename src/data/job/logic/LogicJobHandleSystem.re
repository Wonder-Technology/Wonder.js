open StateDataType;

let _getInitJobHandles = () => [
  ("init_cameraController", InitCameraControllerJob.execJob),
  ("init_geometry", InitGeometryJob.execJob),
  ("start_time", StartTimeJob.execJob)
];

let _getUpdateJobHandles = () => [
  ("tick", TickJob.execJob),
  ("update_cameraController", UpdateCameraControllerJob.execJob)
];

let createInitJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getInitJobHandles());

let createUpdateJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getUpdateJobHandles());