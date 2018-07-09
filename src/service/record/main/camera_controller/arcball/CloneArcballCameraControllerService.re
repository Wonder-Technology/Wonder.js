open OperateArcballCameraControllerService;

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), record) => {
  let distance = unsafeGetDistance(sourceComponent, record);
  let minDistance = unsafeGetMinDistance(sourceComponent, record);
  let phi = unsafeGetPhi(sourceComponent, record);
  let theta = unsafeGetTheta(sourceComponent, record);
  let thetaMargin = unsafeGetThetaMargin(sourceComponent, record);
  let target = unsafeGetTarget(sourceComponent, record);
  let moveSpeedX = unsafeGetMoveSpeedX(sourceComponent, record);
  let moveSpeedY = unsafeGetMoveSpeedY(sourceComponent, record);
  let rotateSpeed = unsafeGetRotateSpeed(sourceComponent, record);
  let wheelSpeed = unsafeGetWheelSpeed(sourceComponent, record);

  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (record, componentArr), _) => {
         let (record, index) =
           CreateArcballCameraControllerService.create(record);
         (
           record
           |> setDistance(index, distance)
           |> setMinDistance(index, minDistance)
           |> setPhi(index, phi)
           |> setTheta(index, theta)
           |> setThetaMargin(index, thetaMargin)
           |> setTarget(index, target)
           |> setMoveSpeedX(index, moveSpeedX)
           |> setMoveSpeedY(index, moveSpeedY)
           |> setRotateSpeed(index, rotateSpeed)
           |> setWheelSpeed(index, wheelSpeed),
           componentArr |> ArrayService.push(index),
         );
       },
       (record, [||]),
     );
};