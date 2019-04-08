open StateDataMainType;

let execJob = (flags, state) => state |> InitScriptJobUtils.exec;