open PerspectiveCameraProjectionType;

let _init = (index: int, record) =>
  PerspectiveCameraProjectionUpdateService.updateCameraProjection(index, record);

let init = ({dirtyArray} as record) =>
  switch (dirtyArray |> DirtyArrayService.getCount) {
  | 0 => record
  | _ =>
    dirtyArray
    |> WonderCommonlib.ArraySystem.removeDuplicateItems
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs] ((record, dirtyIndex) => _init(dirtyIndex, record)),
         record
       )
  };