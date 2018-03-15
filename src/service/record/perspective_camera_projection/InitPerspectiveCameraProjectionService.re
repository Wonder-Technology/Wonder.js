open PerspectiveCameraProjectionType;

let _init = (index: int, record) =>
  UpdatePerspectiveCameraProjectionService.updateCameraProjection(index, record);

let init = ({dirtyArray} as record) =>
  switch (dirtyArray |> DirtyArrayService.getCount) {
  | 0 => record
  | _ =>
    dirtyArray
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs] ((record, dirtyIndex) => _init(dirtyIndex, record)),
         record
       )
  };