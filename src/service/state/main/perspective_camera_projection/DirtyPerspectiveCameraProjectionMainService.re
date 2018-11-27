open StateDataMainType;

open PerspectiveCameraProjectionType;

let _mark =
    (
      cameraProjection,
      operateDirtyArrayFunc,
      {perspectiveCameraProjectionRecord} as state,
    ) => {
  let {dirtyArray} = perspectiveCameraProjectionRecord;

  {
    ...state,
    perspectiveCameraProjectionRecord: {
      ...perspectiveCameraProjectionRecord,
      dirtyArray: dirtyArray |> operateDirtyArrayFunc(cameraProjection),
    },
  };
};

let markDirty =
    (cameraProjection, {perspectiveCameraProjectionRecord} as state) =>
  _mark(cameraProjection, DirtyArrayService.addToDirtyArray, state);

let markNotDirty =
    (cameraProjection, {perspectiveCameraProjectionRecord} as state) =>
  _mark(cameraProjection, DirtyArrayService.removeFromDirtyArray, state);