open StateDataMainType;

open OperateFlyCameraControllerService;

let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr: array(int),
      record: flyCameraControllerRecord,
    ) => {
  let moveSpeed = unsafeGetMoveSpeed(sourceComponent, record);
  let wheelSpeed = unsafeGetWheelSpeed(sourceComponent, record);
  let rotateSpeed = unsafeGetRotateSpeed(sourceComponent, record);

  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (record, componentArr), _) => {
         let (record, index) =
           CreateFlyCameraControllerService.create(record);
         (
           record
           |> setMoveSpeed(index, moveSpeed)
           |> setWheelSpeed(index, wheelSpeed)
           |> setRotateSpeed(index, rotateSpeed),
           componentArr |> ArrayService.push(index),
         );
       },
       (record, [||]),
     );
};