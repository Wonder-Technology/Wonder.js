open StateDataMainType;

let build =
    (flyCameraControllerDataMap, {flyCameraControllerRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            GenerateCommon.checkShouldHasNoSlot(flyCameraControllerDataMap)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  flyCameraControllerDataMap
  |> WonderCommonlib.MutableSparseMapService.reduceValid(
       (. flyCameraControllerDataArr, cameraController) =>
         flyCameraControllerDataArr
         |> ArrayService.push(
              {
                moveSpeed:
                  flyCameraControllerRecord
                  |> OperateFlyCameraControllerService.unsafeGetMoveSpeed(
                       cameraController,
                     ),
                rotateSpeed:
                  flyCameraControllerRecord
                  |> OperateFlyCameraControllerService.unsafeGetRotateSpeed(
                       cameraController,
                     ),
                wheelSpeed:
                  flyCameraControllerRecord
                  |> OperateFlyCameraControllerService.unsafeGetWheelSpeed(
                       cameraController,
                     ),
              }: GenerateSceneGraphType.flyCameraControllerData,
            ),
       [||],
     );
};
