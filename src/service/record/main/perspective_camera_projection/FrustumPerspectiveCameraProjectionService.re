open PerspectiveCameraProjectionType;

let _setMapValue = (cameraProjection, dirtyArray, record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraProjection, dirtyArray),
};

let getFovy = (cameraProjection, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraProjection,
    record.fovyMap,
  );

let unsafeGetFovy = (cameraProjection, record) =>
  getFovy(cameraProjection, record) |> OptionService.unsafeGet;

let setFovy =
    (cameraProjection, fovy: float, {fovyMap, dirtyArray} as record) =>
  _setMapValue(
    cameraProjection,
    dirtyArray,
    {
      ...record,
      fovyMap:
        WonderCommonlib.MutableSparseMapService.set(
          cameraProjection,
          fovy,
          fovyMap,
        ),
    },
  );

let getAspect = (cameraProjection, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraProjection,
    record.aspectMap,
  );

let unsafeGetAspect = (cameraProjection, record) =>
  getAspect(cameraProjection, record) |> OptionService.unsafeGet;

let setAspect =
    (cameraProjection, aspect: float, {aspectMap, dirtyArray} as record) =>
  _setMapValue(
    cameraProjection,
    dirtyArray,
    {
      ...record,
      aspectMap:
        WonderCommonlib.MutableSparseMapService.set(
          cameraProjection,
          aspect,
          aspectMap,
        ),
    },
  );

let removeAspect = (cameraProjection, {aspectMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraProjection, dirtyArray),
  aspectMap:
    aspectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(cameraProjection),
};

let getNear = (cameraProjection, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraProjection,
    record.nearMap,
  );

let unsafeGetNear = (cameraProjection, record) =>
  getNear(cameraProjection, record) |> OptionService.unsafeGet;

let setNear =
    (cameraProjection, near: float, {nearMap, dirtyArray} as record) =>
  _setMapValue(
    cameraProjection,
    dirtyArray,
    {
      ...record,
      nearMap:
        WonderCommonlib.MutableSparseMapService.set(
          cameraProjection,
          near,
          nearMap,
        ),
    },
  );

let getFar = (cameraProjection, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraProjection,
    record.farMap,
  );

let getInfiniteFar = () => 100000.;

let unsafeGetFar = (cameraProjection, record) =>
  getFar(cameraProjection, record) |> OptionService.unsafeGet;

let setFar = (cameraProjection, far: float, {farMap, dirtyArray} as record) =>
  _setMapValue(
    cameraProjection,
    dirtyArray,
    {
      ...record,
      farMap:
        WonderCommonlib.MutableSparseMapService.set(
          cameraProjection,
          far,
          farMap,
        ),
    },
  );