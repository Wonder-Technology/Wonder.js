let handleCloneComponent =
    (sourceComponent, countRangeArr, (createFunc, getDataFunc, setDataFunc), state) => {
  let dataTuple = [@bs] getDataFunc(sourceComponent, state);
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, componentArr), _) => {
           let (state, index) = [@bs] createFunc(state);
           let state = [@bs] setDataFunc(index, dataTuple, state);
           (state, componentArr |> ArrayService.push(index))
         }
       ),
       (state, [||])
     )
};