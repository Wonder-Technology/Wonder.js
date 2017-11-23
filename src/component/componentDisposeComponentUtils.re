open ComponentType;

open Contract;

let isAlive = (component, disposedIndexArray: array(int)) =>
  ! Js.Array.includes(component, disposedIndexArray);

let checkComponentShouldAlive = (component, isAlive, state: StateDataType.state) =>
  test(
    "shouldn't dispose the component which isn't alive",
    () => isAlive(component, state) |> assertTrue
  );