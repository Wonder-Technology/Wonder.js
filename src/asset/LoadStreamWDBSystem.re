open WonderBsMost;

open Js.Typed_array;

open Js.Promise;

let _isSupportStreamLoad = [%raw
  response => {|
        return !!response.body || !!response.body.getReader
      |}
];

let _getReader = [%raw
  response => {|
  return response.body.getReader();
  |}
];

/* TODO add more handleFuncs */
let load =
    (
      wdbPath,
      /* (
           fetchFunc,
           handleBeforeLoadFunc,
           handleWhenLoadFunc,
           handleWhenDoneFunc,
         ), */
      (fetchFunc, 
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc),
      state,
    ) => {
  let (unit8Array, mimeType, errorMsg) =
    ConvertStreamSystem.getDefault11ImageUint8ArrayData();

  AssembleUtils.buildLoadImageStream(
    unit8Array |> Uint8Array.buffer,
    mimeType,
    errorMsg,
  )
  |> Most.flatMap(image => {
       let default11Image = image |> ImageType.imageToDomExtendImageElement;

       Most.fromPromise(
         fetchFunc(wdbPath)
         |> then_(response =>
              ! Fetch.Response.ok(response) ?
                {
                  let status = Fetch.Response.status(response);
                  let statusText = Fetch.Response.status(response);

                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="streamLoad",
                      ~description={j|$status $statusText|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j},
                    ),
                  );
                } :
                ! _isSupportStreamLoad(response) ?
                  {
                    WonderLog.Log.warn(
                      {j|your browser does not seem to have the Streams API yet, fallback to use sync load|j},
                    );

                    /* TODO use sync load */
                    response |> resolve;
                  } :
                  FetchExtend.newResponse(
                    FetchExtend.newReadableStream({
                      "start": controller => {
                        let reader = _getReader(response);

                        ReadStreamChunkSystem.read(
                          (default11Image, controller, handleBeforeStartLoopFunc, handleWhenDoneFunc),
                          [||],
                          None,
                          [||],
                          None,
                          0,
                          [||],
                          reader,
                        );
                      },
                    }),
                  )
                  |> resolve
            ),
         /* if done{
            let state = handleWhenDoneFunc(. (state, rootGameObject));



            }

            else{
            handleWhenLoadFunc(progress data, state)
            } */
         /* response. */
       );
     });
};