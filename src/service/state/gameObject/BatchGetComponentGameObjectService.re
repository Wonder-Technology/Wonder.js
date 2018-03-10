open StateDataType;

open GameObjectType;

open ComponentMapService;

open BasicCameraViewType;

let batchGetBasicCameraViewComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent = (uidArray: array(int), {gameObjectRecord} as state) =>{


  WonderLog.Log.print(("before get, basicCameraViewRecord:", state.basicCameraViewRecord)) |> ignore;

  let result = batchGetComponent(uidArray, gameObjectRecord.perspectiveCameraProjectionMap);


  WonderLog.Log.print(("after get, basicCameraViewRecord:", state.basicCameraViewRecord)) |> ignore;

  result

};

let batchGetTransformComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.transformMap);