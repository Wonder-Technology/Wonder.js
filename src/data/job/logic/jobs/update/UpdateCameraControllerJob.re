open StateDataType;

let execJob = (elapsed, state) => state |> CameraControllerSystem.update;