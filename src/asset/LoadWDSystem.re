open Most;

let load = (wdPath, fetchFunc, stateData) =>
  FetchCommon.createFetchJsonStream(wdPath, fetchFunc)
  |> flatMap(json =>
       AssembleWDSystem.assemble(
         json |> LoadType.jsonToWDRecord,
         StateDataMainService.unsafeGetState(stateData),
       )
     );