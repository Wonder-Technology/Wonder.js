open StateDataMainType;

let build =
    (
      arcballCameraControllerDataMap,
      {arcballCameraControllerRecord} as state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            GenerateCommon.checkShouldHasNoSlot(
              arcballCameraControllerDataMap,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  arcballCameraControllerDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceValid(
       (. arcballCameraControllerDataArr, cameraController) =>
         arcballCameraControllerDataArr
         |> ArrayService.push(
              {
                distance:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetDistance(
                       cameraController,
                     ),
                minDistance:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetMinDistance(
                       cameraController,
                     ),
                phi:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetPhi(
                       cameraController,
                     ),
                theta:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetTheta(
                       cameraController,
                     ),
                thetaMargin:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetThetaMargin(
                       cameraController,
                     ),
                target:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetTarget(
                       cameraController,
                     ),
                moveSpeedX:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetMoveSpeedX(
                       cameraController,
                     ),
                moveSpeedY:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetMoveSpeedY(
                       cameraController,
                     ),
                rotateSpeed:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetRotateSpeed(
                       cameraController,
                     ),
                wheelSpeed:
                  arcballCameraControllerRecord
                  |> OperateArcballCameraControllerService.unsafeGetWheelSpeed(
                       cameraController,
                     ),
              }: GenerateSceneGraphType.arcballCameraControllerData,
            ),
       [||],
     );
};
