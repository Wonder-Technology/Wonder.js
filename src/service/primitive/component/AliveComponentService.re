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

let getAllAliveComponents = (index, disposedIndexArray, isAliveFunc) =>
  ArrayService.range(0, index - 1)
  |> Js.Array.filter(component => isAliveFunc(component, disposedIndexArray));