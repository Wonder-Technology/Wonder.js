open StateDataMainType;

open PerspectiveCameraProjectionType;

let initPerspepctiveCameraProjection = (index: int, state) =>
  state
  |> UpdatePerspectiveCameraProjectionMainService.updateCameraProjection(
       index,
     );

let init = ({perspectiveCameraProjectionRecord} as state) => {
  let {dirtyArray} = perspectiveCameraProjectionRecord;

  switch (dirtyArray |> DirtyArrayService.getCount) {
  | 0 => state
  | _ =>
    dirtyArray
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, dirtyIndex) =>
           initPerspepctiveCameraProjection(dirtyIndex, state),
         state,
       )
  };
};