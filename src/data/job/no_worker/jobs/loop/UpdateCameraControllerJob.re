open StateDataType;

let execJob = (flags, elapsed, state) => state |> CameraControllerSystem.update;