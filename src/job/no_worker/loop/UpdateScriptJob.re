open StateDataMainType;

let execJob = (flags, state) => state |> UpdateScriptJobUtils.exec;