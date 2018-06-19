open StateDataMainType;

let _convertDegreeToRadians = angle => angle *. Js.Math._PI /. 180.;

let build = (cameraDataMap, {perspectiveCameraProjectionRecord} as state) => {
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
              }: GenerateSceneGraphType.cameraData,
            ),
       [||],
     );
};