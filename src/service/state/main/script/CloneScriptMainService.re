open StateDataMainType;

let _getData =
  (. sourceComponent, state) => (
    OperateScriptDataMainService.unsafeGetScriptAllEventFunctionData(
      sourceComponent,
      state,
    ),
    OperateScriptDataMainService.unsafeGetScriptAllAttributes(
      sourceComponent,
      state,
    )
    /* TODO test */
    |> OperateScriptDataMainService.resetScriptAllAttributesFieldValue,
  );

let _setData =
  (. targetComponent, (allEventFunctionData, allAttributes), state) =>
    state
    |> OperateScriptDataMainService.setScriptAllEventFunctionData(
         targetComponent,
         allEventFunctionData,
       )
    |> OperateScriptDataMainService.setScriptAllAttributes(
         targetComponent,
         allAttributes,
       );

/* TODO test */
let handleCloneComponent =
    (sourceComponent, countRangeArr, {scriptRecord} as state) => {
  let data = _getData(. sourceComponent, state);

  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (state, componentArr), _) => {
           let (state, index) = CreateScriptMainService.create(state);

           let state = _setData(. index, data, state);

           (state, componentArr |> ArrayService.push(index));
         },
         (state, [||]),
       );

  (state, componentArr);
};