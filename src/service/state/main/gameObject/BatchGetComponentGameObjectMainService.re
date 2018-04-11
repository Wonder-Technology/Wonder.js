open StateDataMainType;

open StateDataMainType;

open ComponentMapService;

open BasicCameraViewType;

let batchGetBasicCameraViewComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicCameraViewMap);

let batchGetPerspectiveCameraProjectionComponent =
    (uidArray: array(int), {gameObjectRecord} as state) =>
  batchGetComponent(uidArray, gameObjectRecord.perspectiveCameraProjectionMap);

let batchGetTransformComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.transformMap);

let batchGetGeometryComponentData = (uidArray: array(int), {gameObjectRecord}) => {
  let currentGeometryDataMap = gameObjectRecord.currentGeometryDataMap;
  let boxGeometryType = CurrentComponentDataMapRenderService.getBoxGeometryType();
  let customGeometryType = CurrentComponentDataMapRenderService.getCustomGeometryType();
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((boxGeometryArr, customGeometryArr) as arrTuple, uid) =>
           switch (currentGeometryDataMap |> CurrentComponentDataMapRenderService.getComponentData(uid)) {
           | None => arrTuple
           | Some((component, type_)) =>
             switch type_ {
             | type_ when type_ === boxGeometryType =>
               boxGeometryArr |> ArrayService.push(component) |> ignore
             | type_ when type_ === customGeometryType =>
               customGeometryArr |> ArrayService.push(component) |> ignore
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="unknown type_",
                   ~description={j||j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j|type_: $type_|j}
                 )
               )
             };
             arrTuple
           }
       ),
       ([||], [||])
     )
};

let batchGetBasicMaterialComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.basicMaterialMap);

let batchGetLightMaterialComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.lightMaterialMap);

let batchGetMeshRendererComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.meshRendererMap);

let batchGetAmbientLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.ambientLightMap);

let batchGetDirectionLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.directionLightMap);

let batchGetPointLightComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.pointLightMap);

let batchGetSourceInstanceComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.sourceInstanceMap);

let batchGetObjectInstanceComponent = (uidArray: array(int), {gameObjectRecord}) =>
  batchGetComponent(uidArray, gameObjectRecord.objectInstanceMap);