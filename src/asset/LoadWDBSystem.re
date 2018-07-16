open WonderBsMost.Most;

let load = (wdPath, fetchFunc, state) =>
  FetchCommon.createFetchArrayBufferStream(wdPath, fetchFunc)
  |> flatMap(wdb =>
       AssembleWDBSystem.assemble(
         wdb |> LoadType.fetchArrayBufferToArrayBuffer,
         state
       )
     );