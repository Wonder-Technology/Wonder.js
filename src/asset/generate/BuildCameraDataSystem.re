open StateDataMainType;

let buildBasicCameraViewData =
    (cameraDataMap, {basicCameraViewRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(cameraDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  cameraDataMap
  |> SparseMapService.reduceValid(
       (. cameraDataArr, basicCameraView) =>
         cameraDataArr
         |> ArrayService.push(
              {
                isActive:
                  ActiveBasicCameraViewService.isActive(
                    basicCameraView,
                    basicCameraViewRecord,
                  ),
              }: GenerateSceneGraphType.basicCameraViewData,
            ),
       [||],
     )
  |> WonderLog.Contract.ensureCheck(
       cameraDataArr =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|has at most one active|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 cameraDataArr
                 |> Js.Array.filter(
                      (
                        {isActive}: GenerateSceneGraphType.basicCameraViewData,
                      ) =>
                      isActive === true
                    )
                 |> Js.Array.length <= 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};

let _convertDegreeToRadians = angle => angle *. Js.Math._PI /. 180.;

let buildCameraProjectionData =
    (cameraDataMap, {perspectiveCameraProjectionRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(cameraDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  cameraDataMap
  |> SparseMapService.reduceValid(
       (. cameraDataArr, perspectiveCameraProjection) =>
         cameraDataArr
         |> ArrayService.push(
              {
                type_: "perspective",
                perspective: {
                  near:
                    perspectiveCameraProjectionRecord
                    |> FrustumPerspectiveCameraProjectionService.unsafeGetNear(
                         perspectiveCameraProjection,
                       ),
                  far:
                    perspectiveCameraProjectionRecord
                    |> FrustumPerspectiveCameraProjectionService.getFar(
                         perspectiveCameraProjection,
                       ),
                  fovy:
                    perspectiveCameraProjectionRecord
                    |> FrustumPerspectiveCameraProjectionService.unsafeGetFovy(
                         perspectiveCameraProjection,
                       )
                    |> _convertDegreeToRadians,
                  aspect:
                    perspectiveCameraProjectionRecord
                    |> FrustumPerspectiveCameraProjectionService.getAspect(
                         perspectiveCameraProjection,
                       ),
                },
              }: GenerateSceneGraphType.cameraProjectionData,
            ),
       [||],
     );
};