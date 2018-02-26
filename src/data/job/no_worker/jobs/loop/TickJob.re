open StateDataType;

let execJob = (flags, elapsed, state) => state |> TimeControllerSystem.tick(elapsed);