let handleCloneComponent =
    (sourceComponent, countRangeArr, (createFunc, getDataFunc, setDataFunc), record) => {
  let dataTuple = [@bs] getDataFunc(sourceComponent, record);
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((record, componentArr), _) => {
           let (record, index) = [@bs] createFunc(record);
           let record = [@bs] setDataFunc(index, dataTuple, record);
           (record, componentArr |> ArrayService.push(index))
         }
       ),
       (record, [||])
     )
};