open WonderBsMost;

open Js.Typed_array;

open Js.Promise;

let _isSupportStreamLoad = [%raw
  response => {|
        return !!response.body && !!response.body.getReader
      |}
];

let _getReader = [%raw
  response => {|
  return response.body.getReader();
  |}
];

let load =
    (
      wdbPath,
      (
        fetchFunc,
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
        handleWhenLoadWholeWDBFunc,
      ),
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
              ! Fetch.Response.ok(response |> WonderLog.Log.print) ?
                {
                  let status = Fetch.Response.status(response);
                  let statusText = Fetch.Response.statusText(response);

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
                      {j|your browser does not seem to have the Streams API yet, fallback to load whole wdb|j},
                    );

                    response
                    |> Fetch.Response.arrayBuffer
                    |> then_(wdb =>
                         AssembleWholeWDBSystem.assemble(
                           wdb |> LoadType.fetchArrayBufferToArrayBuffer,
                           state,
                         )
                         |> Most.tap(
                              (
                                (
                                  state,
                                  imageUint8ArrayDataMap,
                                  rootGameObject,
                                ),
                              ) =>
                              handleWhenLoadWholeWDBFunc(
                                state,
                                imageUint8ArrayDataMap,
                                rootGameObject,
                              )
                            )
                         |> Most.drain
                         |> then_(_ => resolve())
                       );
                  } :
                  {
                    /* FetchExtend.newResponse(
                         FetchExtend.newReadableStream({
                           "start": controller => {
                             let reader = _getReader(response);

                             ReadStreamChunkSystem.read(
                               (
                                 default11Image,
                                 controller,
                                 handleBeforeStartLoopFunc,
                                 handleWhenDoneFunc,
                               ),
                               [||],
                               (
                                 None,
                                 [||],
                                 None,
                                 0,
                                 [||],
                                 WonderCommonlib.SparseMapService.createEmpty(),
                               ),
                               reader,
                             );
                           },
                         }),
                       ) */

                    FetchExtend.newReadableStream({
                      "start": controller => {
                        let reader = _getReader(response);

                        ReadStreamChunkSystem.read(
                          (
                            default11Image,
                            controller,
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc,
                          ),
                          [||],
                          (
                            None,
                            [||],
                            None,
                            0,
                            [||],
                            WonderCommonlib.SparseMapService.createEmpty(),
                          ),
                          reader,
                        );
                      },
                    })
                    |> ignore;

                    resolve();
                  }
            ),
       );
     });
};