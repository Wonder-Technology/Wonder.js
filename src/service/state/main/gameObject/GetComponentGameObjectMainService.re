open StateDataMainType;

open GameObjectType;

open ComponentMapService;

let _getAllComponents = (disposedUidMap, componentMap) =>
  componentMap
  /* |> WonderCommonlib.MutableSparseMapService.filterValid; */
  |> Js.Array.filteri((component, uid) =>
       !(disposedUidMap |> WonderCommonlib.MutableSparseMapService.has(uid))
       && Obj.magic(component) !== Js.Undefined.empty
     )
  /* ! WonderCommonlib.NullService.isEmpty(component) */
  /* Obj.magic(component) !== Js.Undefined.empty */
  |> WonderCommonlib.SparseMapType.arrayNullableToArrayNotNullable;

let getAllGeometryComponents = ({gameObjectRecord}) => {
  let {geometryMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, geometryMap);
};

let getAllFlyCameraControllerComponents = ({gameObjectRecord}) => {
  let {flyCameraControllerMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, flyCameraControllerMap);
};

let getAllArcballCameraControllerComponents = ({gameObjectRecord}) => {
  let {arcballCameraControllerMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, arcballCameraControllerMap);
};

let getAllBasicMaterialComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, basicMaterialMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, basicMaterialMap);
};

let getAllLightMaterialComponents = ({gameObjectRecord}) => {
  let {lightMaterialMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, lightMaterialMap);
};

let getAllBasicCameraViewComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, basicCameraViewMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, basicCameraViewMap);
};

let getAllPerspectiveCameraProjectionComponents = ({gameObjectRecord}) => {
  let {disposedUidMap, perspectiveCameraProjectionMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, perspectiveCameraProjectionMap);
};

let getAllDirectionLightComponents = ({gameObjectRecord}) => {
  let {directionLightMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, directionLightMap);
};

let getAllPointLightComponents = ({gameObjectRecord}) => {
  let {pointLightMap, disposedUidMap} = gameObjectRecord;

  _getAllComponents(disposedUidMap, pointLightMap);
};