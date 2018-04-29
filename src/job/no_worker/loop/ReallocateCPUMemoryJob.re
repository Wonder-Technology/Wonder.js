open StateDataMainType;

let execJob = (flags, state) => state |> ReallocateCPUMemoryJobUtils.execJob;