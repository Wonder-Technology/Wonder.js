let unsafeGet = optionData => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|data exist(get by getExn)|j},
                ~actual={j|not|j},
              ),
              () =>
              optionData |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  optionData |> Js.Option.getExn;
};

/* let unsafeGetJsonSerializedValue = [%raw
     optionData => {|
   if(optionData === null){
     throw new Error("expect jsonSerializedValue exist(get by getExn), but actual not");
   }

   return optionData;
     |}
   ]; */

let unsafeGetJsonSerializedValue = unsafeGet;

let isJsonSerializedValueNone = value =>
  Obj.magic(value) === Js.Nullable.null
  || Obj.magic(value) === Js.Nullable.undefined;