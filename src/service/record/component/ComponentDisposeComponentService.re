let checkComponentShouldAlive = (component, isAliveFunc, record) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|dispose the alive component|j}, ~actual={j|not|j}),
        () => isAliveFunc(component, record) |> assertTrue
      )
    )
  );

let checkComponentShouldAliveWithBatchDispose = (componentArr, isAliveFunc, record) =>
  componentArr
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((component) => checkComponentShouldAlive(component, isAliveFunc, record))
     );