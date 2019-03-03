open ComponentType;

let checkComponentShouldAlive = (component: component, isAliveFunc, record) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect={j|component alive|j},
            ~actual={j|not|j},
          ),
          () =>
          isAliveFunc(component, record) |> assertTrue
        )
      )
    )
  );

let getAllAliveComponents = (index, disposedIndexArray) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|disposedIndexArray not has duplicate items|j},
                ~actual={j|has|j},
              ),
              () =>
              disposedIndexArray
              |> WonderCommonlib.ArrayService.removeDuplicateItems
              |> Js.Array.length == Js.Array.length(disposedIndexArray)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  ArrayService.fastExclude(
    disposedIndexArray |> Js.Array.copy,
    ArrayService.range(0, index - 1),
  );
};