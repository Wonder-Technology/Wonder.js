open StateDataMainType;

open PerspectiveCameraProjectionType;

let markDirty =
    (cameraProjection, {perspectiveCameraProjectionRecord} as state) => {
  let {dirtyArray} = perspectiveCameraProjectionRecord;

  {
    ...state,
    perspectiveCameraProjectionRecord: {
      ...perspectiveCameraProjectionRecord,
      dirtyArray:
        dirtyArray |> DirtyArrayService.addToDirtyArray(cameraProjection),
    },
  };
};

let markNotDirty =
    (cameraProjection, {perspectiveCameraProjectionRecord} as state) => {
  let {dirtyArray} = perspectiveCameraProjectionRecord;

  {
    ...state,
    perspectiveCameraProjectionRecord: {
      ...perspectiveCameraProjectionRecord,
      dirtyArray:
        dirtyArray |> DirtyArrayService.removeFromDirtyArray(cameraProjection),
    },
  };
};