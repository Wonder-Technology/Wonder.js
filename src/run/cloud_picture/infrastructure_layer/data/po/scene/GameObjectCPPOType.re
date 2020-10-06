type uid = int;

type componentIndex = int;

type gameObject = {
  maxUID: uid,
  transformMap: ImmutableSparseMap.t(uid, componentIndex),
  brdfMaterialMap: ImmutableSparseMap.t(uid, componentIndex),
  geometryMap: ImmutableSparseMap.t(uid, componentIndex),
  directionLightMap: ImmutableSparseMap.t(uid, componentIndex),
  basicCameraViewMap: ImmutableSparseMap.t(uid, componentIndex),
  perspectiveCameraProjectionMap: ImmutableSparseMap.t(uid, componentIndex),
};
