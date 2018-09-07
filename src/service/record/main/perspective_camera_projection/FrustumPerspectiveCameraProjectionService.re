open PerspectiveCameraProjectionType;

let _setMapValue = (cameraProjection, dirtyArray, record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraProjection, dirtyArray),
};

let getFovy = (cameraProjection, record) =>
  WonderCommonlib.SparseMapService.get(cameraProjection, record.fovyMap);

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
        WonderCommonlib.SparseMapService.set(cameraProjection, fovy, fovyMap),
    },
  );

let getAspect = (cameraProjection, record) =>
  WonderCommonlib.SparseMapService.get(cameraProjection, record.aspectMap);

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
        WonderCommonlib.SparseMapService.set(
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
    |> Obj.magic
    |> WonderCommonlib.SparseMapService.deleteVal(cameraProjection)
    |> Obj.magic,
};

let getNear = (cameraProjection, record) =>
  WonderCommonlib.SparseMapService.get(cameraProjection, record.nearMap);

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
        WonderCommonlib.SparseMapService.set(cameraProjection, near, nearMap),
    },
  );

let getFar = (cameraProjection, record) =>
  WonderCommonlib.SparseMapService.get(cameraProjection, record.farMap);

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
        WonderCommonlib.SparseMapService.set(cameraProjection, far, farMap),
    },
  );