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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  optionData |> Js.Option.getExn
};

let isJsonSerializedValueNone = value =>
  Obj.magic(value) === Js.Nullable.null
  || Obj.magic(value) === Js.Nullable.undefined;