open Js.Promise;

open WonderBsMost.Most;

let load =
    (
      wdbPath,
      (
        isHandleIMGUI,
        isBindEvent,
        isActiveCamera,
        isRenderLight,
        isLoadImage,
      ),
      (fetchFunc, handleWhenLoadingFunc),
      state,
    ) =>
  fromPromise(
    fetchFunc(. wdbPath)
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
         (
           isHandleIMGUI,
           isBindEvent,
           isActiveCamera,
           isRenderLight,
           isLoadImage,
         ),
         state,
       )
     );