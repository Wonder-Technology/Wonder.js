let handleCloneComponent =
    (
      sourceComponent,
      countRangeArr,
      (createFunc, getDataFunc, setDataFunc),
      record,
    ) => {
  let dataTuple = getDataFunc(. sourceComponent, record);
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (record, componentArr), _) => {
         let (record, index) = createFunc(record);
         let record = setDataFunc(. index, dataTuple, record);
         (record, componentArr |> ArrayService.push(index));
       },
       (record, [||]),
     );
};