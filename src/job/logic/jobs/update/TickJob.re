open StateDataType;

let getJob = (elapsed, state) => state |> TimeControllerSystem.tick(elapsed);