open WonderBsMost.Most;

let load = (wdbPath, fetchFunc, state) =>
  FetchCommon.createFetchArrayBufferStream(wdbPath, fetchFunc)
  |> flatMap(wdb =>
       AssembleWDBSystem.assemble(
         wdb |> LoadType.fetchArrayBufferToArrayBuffer,
         state,
       )
     );
