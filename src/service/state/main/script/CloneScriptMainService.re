open StateDataMainType;

let _getData =
  (. sourceComponent, state) => (
    OperateScriptDataMainService.getScriptAllEventFunctionData(
      sourceComponent,
      state,
    ),
    OperateScriptDataMainService.getScriptAllAttributes(
      sourceComponent,
      state,
    )
    |> Js.Option.andThen((. allAttributes) =>
         (
           allAttributes
           |> OperateScriptDataMainService.resetScriptAllAttributesFieldValue
         )
         ->Some
       ),
  );

let _setData =
  (. targetComponent, (allEventFunctionDataOpt, allAttributesOpt), state) => {
    let state =
      switch (allEventFunctionDataOpt) {
      | Some(allEventFunctionData) =>
        state
        |> OperateScriptDataMainService.setScriptAllEventFunctionData(
             targetComponent,
             allEventFunctionData,
           )
      | None => state
      };

    let state =
      switch (allAttributesOpt) {
      | Some(allAttributes) =>
        state
        |> OperateScriptDataMainService.setScriptAllAttributes(
             targetComponent,
             allAttributes,
           )
      | None => state
      };

    state;
  };

let handleCloneComponent =
    (sourceComponent, countRangeArr, {scriptRecord} as state) => {
  let data = _getData(. sourceComponent, state);

  let (state, componentArr) =
    countRangeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (state, componentArr), _) => {
           let (state, index) = CreateScriptMainService.create(. state);

           let state = _setData(. index, data, state);

           (state, componentArr |> ArrayService.push(index));
         },
         (state, [||]),
       );

  (state, componentArr);
};