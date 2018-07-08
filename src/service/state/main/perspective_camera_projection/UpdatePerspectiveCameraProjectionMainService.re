open StateDataMainType;

open PerspectiveCameraProjectionType;

open FrustumPerspectiveCameraProjectionService;

/* let updateCameraProjection = (index: int, {pMatrixMap} as record) => */
let updateCameraProjection =
    (index: int, {perspectiveCameraProjectionRecord, viewRecord} as state) => {
  /* let {pMatrixMap} = perspectiveCameraProjectionRecord; */
  /* switch (
       getFovy(index, perspectiveCameraProjectionRecord),
       getAspect(index, perspectiveCameraProjectionRecord),
       getNear(index, perspectiveCameraProjectionRecord),
       getFar(index, perspectiveCameraProjectionRecord)
     ) {
     | (Some(fovy), Some(aspect), Some(near), Some(far)) =>
       Matrix4Service.buildPerspective(
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
     }; */
  ...state,
  perspectiveCameraProjectionRecord:
    switch (
      getFovy(index, perspectiveCameraProjectionRecord),
      getNear(index, perspectiveCameraProjectionRecord),
      getFar(index, perspectiveCameraProjectionRecord),
    ) {
    | (Some(fovy), Some(near), Some(far)) =>
      let (perspectiveCameraProjectionRecord, aspect) =
        switch (getAspect(index, perspectiveCameraProjectionRecord)) {
        | None =>
          let canvas =
            ViewService.unsafeGetCanvas(viewRecord) |> DomExtendType.htmlElementToJsObj;

          let aspect = canvas##width /. canvas##height;

          (
            perspectiveCameraProjectionRecord
            |> FrustumPerspectiveCameraProjectionService.setAspect(
                 index,
                 aspect,
               ),
            aspect,
          );
        | Some(aspect) => (perspectiveCameraProjectionRecord, aspect)
        };

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