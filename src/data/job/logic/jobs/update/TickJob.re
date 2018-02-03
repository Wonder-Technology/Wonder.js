open StateDataType;

let execJob = (elapsed, state) => state |> TimeControllerSystem.tick(elapsed);