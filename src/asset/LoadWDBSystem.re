open Most;

let load = (wdPath, fetchFunc, stateData) =>
  FetchCommon.createFetchArrayBufferStream(wdPath, fetchFunc)
  |> flatMap(wdb =>
       AssembleWDBSystem.assemble(
         wdb |> LoadType.fetchArrayBufferToArrayBuffer,
         StateDataMainService.unsafeGetState(stateData),
       )
     );