open CameraControllerType;

open CameraControllerStateUtils;

open Contract;

let handleDisposeComponent =
    (cameraController: cameraController, state: StateDataType.state) => {
  /* todo refactor: duplicate */
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't dispose before",
          () => {
            let {disposedIndexArray} = getCameraControllerData(state);
            disposedIndexArray |> Js.Array.includes(cameraController) |> assertFalse
          }
        )
      )
  );
  let {disposedIndexArray} = getCameraControllerData(state);
  disposedIndexArray |> Js.Array.push(cameraController) |> ignore;
  state
};