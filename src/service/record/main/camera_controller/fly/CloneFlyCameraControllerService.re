open StateDataMainType;

open OperateFlyCameraControllerService;

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      record: flyCameraControllerRecord,
    ) => {
  let moveSpeedX = unsafeGetMoveSpeedX(sourceComponent, record);
  let moveSpeedY = unsafeGetMoveSpeedY(sourceComponent, record);
  let rotateSpeed = unsafeGetRotateSpeed(sourceComponent, record);

  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (record, componentArr), _) => {
         let (record, index) =
           CreateFlyCameraControllerService.create(record);
         (
           record
           |> setMoveSpeedX(index, moveSpeedX)
           |> setMoveSpeedY(index, moveSpeedY)
           |> setRotateSpeed(index, rotateSpeed),
           componentArr |> ArrayService.push(index),
         );
       },
       (record, [||]),
     );
};