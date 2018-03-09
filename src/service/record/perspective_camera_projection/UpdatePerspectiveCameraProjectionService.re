open PerspectiveCameraProjectionType;

open FrustumPerspectiveCameraProjectionService;

let updateCameraProjection = (index: int, {pMatrixMap} as record) =>
  switch (
    getFovy(index, record),
    getAspect(index, record),
    getNear(index, record),
    getFar(index, record)
  ) {
  | (Some(fovy), Some(aspect), Some(near), Some(far)) =>
    Matrix4System.buildPerspective(
      (fovy, aspect, near, far),
      PMatrixService.unsafeGetPMatrix(index, pMatrixMap)
    )
    |> ignore;
    record
  | (_, _, _, _) =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="update",
        ~description={j|fovy,aspect,near,far should all exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|cameraProjection: $index|j}
      )
    );
    record
  };

let _clearDirtyArray = (record) => {...record, dirtyArray: DirtyArrayService.create()};

let update = ({dirtyArray} as record) =>
  dirtyArray
  |> WonderCommonlib.ArraySystem.removeDuplicateItems
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((record, dirtyIndex) => updateCameraProjection(dirtyIndex, record)),
       record
     )
  |> _clearDirtyArray;