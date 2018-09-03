open Js.Promise;

open WonderBsMost.Most;

let load =
    (
      wdbPath,
      (isSetIMGUIFunc, isBindEvent, isActiveCamera),
      (fetchFunc, handleWhenLoadingFunc),
      state,
    ) =>
  fromPromise(
    fetchFunc(wdbPath)
    |> then_(response => {
         handleWhenLoadingFunc(
           FetchCommon.getContentLength(response),
           wdbPath,
         );

         response |> resolve;
       })
    |> then_(Fetch.Response.arrayBuffer),
  )
  |> flatMap(wdb =>
       AssembleWholeWDBSystem.assemble(
         wdb |> LoadType.fetchArrayBufferToArrayBuffer,
         (isSetIMGUIFunc, isBindEvent, isActiveCamera),
         state,
       )
     );