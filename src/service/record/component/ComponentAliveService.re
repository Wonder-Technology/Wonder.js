open ComponentType;

let checkComponentShouldAlive = (component: component, isAliveFunc, record) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(~expect={j|component alive|j}, ~actual={j|not|j}),
          () => isAliveFunc(component, record) |> assertTrue
        )
      )
    )
  );