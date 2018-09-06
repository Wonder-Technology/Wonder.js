open StateDataMainType;

open PerspectiveCameraProjectionType;

open FrustumPerspectiveCameraProjectionService;

let updateCameraProjection =
    (index: int, {perspectiveCameraProjectionRecord, viewRecord} as state) => {
  let aspect =
    switch (getAspect(index, perspectiveCameraProjectionRecord)) {
    | None =>
      FrustumPerspectiveCameraProjectionMainService.computeAspect(state)
      |> OptionService.unsafeGet
    | Some(aspect) => aspect
    };

  {
    ...state,
    perspectiveCameraProjectionRecord:
      switch (
        getFovy(index, perspectiveCameraProjectionRecord),
        getNear(index, perspectiveCameraProjectionRecord),
        getFar(index, perspectiveCameraProjectionRecord),
      ) {
      | (Some(fovy), Some(near), Some(far)) =>
        let {pMatrixMap} = perspectiveCameraProjectionRecord;

        Matrix4Service.buildPerspective(
          (fovy, aspect, near, far),
          PMatrixService.unsafeGetPMatrix(index, pMatrixMap),
        )
        |> ignore;
        perspectiveCameraProjectionRecord;
      | (_, _, _) =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="update",
            ~description={j|fovy,near,far should all exist|j},
            ~reason="",
            ~solution={j||j},
            ~params={j|cameraProjection: $index|j},
          ),
        );
        perspectiveCameraProjectionRecord;
      },
  };
};

let _clearDirtyArray = ({perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord: {
    ...perspectiveCameraProjectionRecord,
    dirtyArray: DirtyArrayService.create(),
  },
};

let update = ({perspectiveCameraProjectionRecord} as state) =>
  perspectiveCameraProjectionRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) => updateCameraProjection(dirtyIndex, state),
       state,
     )
  |> _clearDirtyArray;