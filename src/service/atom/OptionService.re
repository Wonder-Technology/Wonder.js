let unsafeGet = (optionData) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|data exist(get by getExn)|j}, ~actual={j|not|j}),
              () => optionData |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  optionData |> Js.Option.getExn
};