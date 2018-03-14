open MainStateDataType;

let execJob = (flags, elapsed, state) => state |> TimeControllerSystem.tick(elapsed);