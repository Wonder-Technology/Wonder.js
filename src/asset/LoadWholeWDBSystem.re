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
    ) => {
  state
  |> OperateLoadMainService.markCanExecScriptAllEventFunction(false)
  |> StateDataMainService.setState(StateDataMain.stateData)
  |> ignore;

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
         wdb |> LoadExternalType.fetchArrayBufferToArrayBuffer,
         (
           isHandleIMGUI,
           isBindEvent,
           isActiveCamera,
           isRenderLight,
           isLoadImage,
         ),
         state,
       )
     )
  |> map(((state, data1, data2)) =>
       (state |> OperateLoadMainService.markCanExecScriptAllEventFunction(true), data1, data2)
     );
};
