open StateDataMainType;

open BasicCameraViewType;

let handleCloneComponent =
    (sourceComponent, countRangeArr, {basicCameraViewRecord} as state) => {
  let (record, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (record, componentArr), _) => {
           let (record, index) = CreateBasicCameraViewService.create(record);

           let record = ActiveBasicCameraViewService.unactive(index, record);

           (record, componentArr |> ArrayService.push(index));
         },
         (basicCameraViewRecord, [||]),
       );

  ({...state, basicCameraViewRecord: record}, componentArr);
};