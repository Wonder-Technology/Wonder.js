let isRender = (data) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|data##renderData exist|j}, ~actual={j|not|j}),
              () => data##renderData |> Obj.magic |> assertNullableExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  data##renderData##isRender === true
};