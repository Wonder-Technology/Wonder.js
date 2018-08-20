open WonderBsMost;

open Js.Typed_array;

open Js.Promise;

let _isSupportStreamLoad = [%raw
  response => {|
        return !!response.body || !!response.body.getReader
      |}
];

let _getTotalLoadedByteLength = loadedUint8ArrayArr =>
  loadedUint8ArrayArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. byteLength, loadedUint8Array) =>
         byteLength + (loadedUint8Array |> Uint8Array.byteLength),
       0,
     );

let _getAllChunkLengths =
    (allChunkLengths, totalLoadedByteLength, loadedUint8ArrayArr) =>
  switch (allChunkLengths) {
  | None =>
    let dataView =
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      );

    let (jsonChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength(),
        dataView,
      );
    let (streamChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getGLBChunkHeaderByteLength(),
        dataView,
      );
    let (binBufferChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getGLBChunkHeaderByteLength()
        + BufferUtils.getGLBChunkHeaderByteLength(),
        dataView,
      );
    (jsonChunkLength, streamChunkLength, binBufferChunkLength);

  | Some(allChunkLengths) => allChunkLengths
  };

let _getStreamChunkData =
    (
      streamChunkArr,
      chunkLengthData,
      totalLoadedByteLength,
      loadedUint8ArrayArr,
    ) =>
  Js.Array.length(streamChunkArr) > 0 ?
    streamChunkArr :
    {
      let dataView =
        LoadStreamWDBUtil.buildLoadedDataView(
          totalLoadedByteLength,
          loadedUint8ArrayArr,
        );

      ConvertStreamSystem.getStreamChunkArr(chunkLengthData, dataView);
    };

let _getJsonChunkStr =
    (jsonChunkLength, totalLoadedByteLength, loadedUint8ArrayArr) => {
  let dataView =
    LoadStreamWDBUtil.buildLoadedDataView(
      totalLoadedByteLength,
      loadedUint8ArrayArr,
    );

  BufferUtils.getWDBJsonChunkStr(
    jsonChunkLength,
    dataView |> DataView.buffer,
  );
};

let _assembleAndStartLoop =
    (
      assembleData,
      jsonChunkLength,
      totalLoadedByteLength,
      loadedUint8ArrayArr,
      default11Image,
      state,
    ) =>
  switch (assembleData) {
  | Some(assembleData) => (state, assembleData)
  | None =>
    let (
      state,
      rootGameObject,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (basicSourceTextureArr, imageTextureIndices, images),
    ) =
      AssembleStreamWDBSystem.assemble(
        _getJsonChunkStr(
          jsonChunkLength,
          totalLoadedByteLength,
          loadedUint8ArrayArr,
        )
        |> Js.Json.parseExn
        |> Obj.magic,
        default11Image,
        state,
      );

    DirectorMainService.start(state);

    (
      StateDataMainService.unsafeGetState(StateDataMain.stateData),
      (
        rootGameObject,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ),
    );
  };

let _isLoadHeader = totalLoadedByteLength =>
  totalLoadedByteLength < BufferUtils.getWDBHeaderTotalByteLength();

let _isLoadBinBufferChunk =
    ((jsonChunkLength, streamChunkLength), totalLoadedByteLength) =>
  totalLoadedByteLength >= BufferUtils.getWDBHeaderTotalByteLength()
  + jsonChunkLength
  + streamChunkLength;

let _isLoadStreamChunk = (jsonChunkLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= BufferUtils.getWDBHeaderTotalByteLength()
  + jsonChunkLength;

let load =
    (
      wdbPath,
      (
        fetchFunc,
        handleBeforeLoadFunc,
        handleWhenLoadFunc,
        handleWhenDoneFunc,
      ),
      state,
    ) => {
  /* let default11Image = ref(Obj.magic(1)); */

  let (unit8Array, mimeType, errorMsg) =
    ConvertStreamSystem.getDefault11ImageUint8ArrayData();

  AssembleUtils.buildLoadImageStream(
    unit8Array |> Uint8Array.buffer,
    mimeType,
    errorMsg,
  )
  /* |> Most.tap(image =>
       default11Image := image |> ImageType.imageToDomExtendImageElement
     ) */
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
                        let getReader = FetchExtend.body(response)##getReader;
                        let reader = getReader(.);

                        /* TODO add handleFuncs */
                        let rec _read =
                                (
                                  loadedUint8ArrayArr,
                                  allChunkLengths,
                                  streamChunkArr,
                                  assembleData,
                                  nextStreamChunkIndex,
                                  loadedStreamChunkArrWhichNotHasAllData,
                                  reader,
                                  state,
                                ) => {
                          let read = reader##read;

                          read()
                          |> then_(streamData =>
                               FetchExtend.isDone(streamData) ?
                                 {
                                   let close = controller##close;

                                   close();

                                   /* TODO send done data(e.g. rootGameObject?)

                                      handleWhenDoneFunc(rootGameObject, state)?
                                      */

                                   resolve();
                                 } :
                                 {
                                   /* TODO use requestIdleCallback + timeout? */

                                   let value = streamData##value;

                                   let loadedUint8ArrayArr =
                                     loadedUint8ArrayArr
                                     |> ArrayService.push(value);

                                   let totalLoadedByteLength =
                                     _getTotalLoadedByteLength(
                                       loadedUint8ArrayArr,
                                     );

                                   _isLoadHeader(totalLoadedByteLength) ?
                                     _read(
                                       loadedUint8ArrayArr,
                                       allChunkLengths,
                                       streamChunkArr,
                                       assembleData,
                                       nextStreamChunkIndex,
                                       loadedStreamChunkArrWhichNotHasAllData,
                                       reader,
                                       state,
                                     ) :
                                     {
                                       let (
                                             jsonChunkLength,
                                             streamChunkLength,
                                             binBufferChunkLength,
                                           ) as allChunkLengths =
                                         _getAllChunkLengths(
                                           allChunkLengths,
                                           totalLoadedByteLength,
                                           loadedUint8ArrayArr,
                                         );

                                       _isLoadBinBufferChunk(
                                         (jsonChunkLength, streamChunkLength),
                                         totalLoadedByteLength,
                                       ) ?
                                         {
                                           let streamChunkArr =
                                             _getStreamChunkData(
                                               streamChunkArr,
                                               (
                                                 jsonChunkLength,
                                                 streamChunkLength,
                                               ),
                                               totalLoadedByteLength,
                                               loadedUint8ArrayArr,
                                             );

                                           let (state, assembleData) =
                                             _assembleAndStartLoop(
                                               assembleData,
                                               jsonChunkLength,
                                               totalLoadedByteLength,
                                               loadedUint8ArrayArr,
                                               default11Image,
                                               state,
                                             );

                                           LoadStreamWDBBinBufferSystem.handleBinBufferData(
                                             (
                                               totalLoadedByteLength,
                                               loadedUint8ArrayArr,
                                             ),
                                             (
                                               nextStreamChunkIndex,
                                               streamChunkArr,
                                               loadedStreamChunkArrWhichNotHasAllData,
                                             ),
                                             assembleData,
                                             state,
                                           )
                                           |> then_(
                                                (
                                                  (
                                                    state,
                                                    streamChunkArr,
                                                    assembleData,
                                                    nextStreamChunkIndex,
                                                    loadedStreamChunkArrWhichNotHasAllData,
                                                  ),
                                                ) =>
                                                _read(
                                                  loadedUint8ArrayArr,
                                                  allChunkLengths |. Some,
                                                  streamChunkArr,
                                                  assembleData |. Some,
                                                  nextStreamChunkIndex,
                                                  loadedStreamChunkArrWhichNotHasAllData,
                                                  reader,
                                                  state,
                                                )
                                              );
                                         } :
                                         _isLoadStreamChunk(
                                           jsonChunkLength,
                                           totalLoadedByteLength,
                                         ) ?
                                           {
                                             let streamChunkArr =
                                               _getStreamChunkData(
                                                 streamChunkArr,
                                                 (
                                                   jsonChunkLength,
                                                   streamChunkLength,
                                                 ),
                                                 totalLoadedByteLength,
                                                 loadedUint8ArrayArr,
                                               );

                                             let (state, assembleData) =
                                               _assembleAndStartLoop(
                                                 assembleData,
                                                 /* jsonChunkStr, */
                                                 jsonChunkLength,
                                                 totalLoadedByteLength,
                                                 loadedUint8ArrayArr,
                                                 default11Image,
                                                 state,
                                               );

                                             _read(
                                               loadedUint8ArrayArr,
                                               allChunkLengths |. Some,
                                               streamChunkArr,
                                               assembleData |. Some,
                                               nextStreamChunkIndex,
                                               loadedStreamChunkArrWhichNotHasAllData,
                                               reader,
                                               state,
                                             );
                                           } :
                                           _read(
                                             loadedUint8ArrayArr,
                                             allChunkLengths |. Some,
                                             streamChunkArr,
                                             assembleData,
                                             nextStreamChunkIndex,
                                             loadedStreamChunkArrWhichNotHasAllData,
                                             reader,
                                             state,
                                           );
                                     };
                                   /* _read(reader); */
                                 }
                             );
                        };

                        _read([||], None, [||], None, 0, [||], reader, state);
                      },
                    }),
                  )
                  |> resolve
            ) /* if done{
            let state = handleWhenDoneFunc(. (state, rootGameObject));



            }

            else{
            handleWhenLoadFunc(progress data, state)
            } */
         /* response. */
       );
     });
};