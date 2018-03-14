/* TODO refactor all unsafe get */
let unsafeGet = (optionData) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|record exist|j}, ~actual={j|not|j}),
              () => optionData |> assertExist
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  optionData |> Js.Option.getExn
};