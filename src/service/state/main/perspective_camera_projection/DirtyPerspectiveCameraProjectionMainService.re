open StateDataMainType;

open PerspectiveCameraProjectionType;

let markDirty =
    (cameraProjection, {perspectiveCameraProjectionRecord} as state) => {
  let {dirtyArray} = perspectiveCameraProjectionRecord;

  {
    ...state,
    perspectiveCameraProjectionRecord: {
      ...perspectiveCameraProjectionRecord,
      dirtyArray: dirtyArray |> ArrayService.push(cameraProjection),
    },
  };
};