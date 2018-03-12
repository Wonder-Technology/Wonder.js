open ComponentType;

let checkComponentShouldAlive = (component: component, isAliveFunc, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(~expect={j|component alive|j}, ~actual={j|not|j}),
          () => isAliveFunc(component, state) |> assertTrue
        )
      )
    )
  );

let _getDisposedIndex = (disposedIndexArray) => (
  disposedIndexArray,
  disposedIndexArray |> Js.Array.pop
);

let generateIndex = (index, disposedIndexArray) =>
  switch (_getDisposedIndex(disposedIndexArray)) {
  | (disposedIndexArray, None) => (index, succ(index), disposedIndexArray)
  | (disposedIndexArray, Some(disposedIndex)) => (disposedIndex, index, disposedIndexArray)
  };