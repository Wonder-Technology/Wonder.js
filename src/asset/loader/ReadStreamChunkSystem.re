open Js.Typed_array;

open Js.Promise;

let _readReader:
  FetchExtendType.reader => Js.Promise.t(FetchExtendType.streamData) = [%raw
  reader => {|
  return reader.read();
  |}
];

let _close = [%raw controller => {|
  controller.close();
  |}];

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
        + BufferUtils.getWDBChunkHeaderByteLength(),
        dataView,
      );
    let (binBufferChunkLength, _) =
      DataViewCommon.getUint32_1(.
        BufferUtils.getHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength()
        + BufferUtils.getWDBChunkHeaderByteLength(),
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
      handleBeforeStartLoopFunc,
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

    /* WonderLog.Log.printJson((
      rootGameObject,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (basicSourceTextureArr, imageTextureIndices, images),
    ))
    |> ignore; */

    let state = handleBeforeStartLoopFunc(state, rootGameObject);

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

let _computeHeaderJsonStreamChunkTotalByteLength =
    (jsonChunkLength, streamChunkLength) =>
  BufferUtils.getWDBHeaderTotalByteLength()
  + (jsonChunkLength |> BufferUtils.alignedLength)
  + (streamChunkLength |> BufferUtils.alignedLength);

let _isLoadBinBufferChunk =
    (headerJsonStreamChunkTotalByteLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= headerJsonStreamChunkTotalByteLength;

let _isLoadStreamChunk = (jsonChunkLength, totalLoadedByteLength) =>
  totalLoadedByteLength >= BufferUtils.getWDBHeaderTotalByteLength()
  + jsonChunkLength;

let rec read =
        (
          (
            default11Image,
            controller,
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          loadedUint8ArrayArr,
          allChunkLengths,
          streamChunkArr,
          assembleData,
          nextStreamChunkIndex,
          loadedStreamChunkArrWhichNotHasAllData,
          reader,
        ) =>
  _readReader(reader)
  |> then_(streamData =>
       FetchExtend.isDone(streamData) ?
         {
           WonderLog.Log.print("done") |> ignore;

           _close(controller);

           let (rootGameObject, _, _) =
             assembleData |> OptionService.unsafeGet;

           handleWhenDoneFunc(
             StateDataMainService.unsafeGetState(StateDataMain.stateData),
             rootGameObject,
           )
           |> StateDataMainService.setState(StateDataMain.stateData)
           |> ignore;

           resolve();
         } :
         {
           /* TODO use requestIdleCallback + timeout? */

           let value = streamData##value;

           /* WonderLog.Log.print(("value: ", value)) |> ignore; */
           WonderLog.Log.print(("value", value |> Uint8Array.byteLength))
           |> ignore;

           let loadedUint8ArrayArr =
             loadedUint8ArrayArr |> ArrayService.push(value);

           let totalLoadedByteLength =
             _getTotalLoadedByteLength(loadedUint8ArrayArr);

           _isLoadHeader(totalLoadedByteLength) ?
             read(
               (
                 default11Image,
                 controller,
                 handleBeforeStartLoopFunc,
                 handleWhenDoneFunc,
               ),
               loadedUint8ArrayArr,
               allChunkLengths,
               streamChunkArr,
               assembleData,
               nextStreamChunkIndex,
               loadedStreamChunkArrWhichNotHasAllData,
               reader,
             ) :
             {
               let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
                 _getAllChunkLengths(
                   allChunkLengths,
                   totalLoadedByteLength,
                   loadedUint8ArrayArr,
                 );

               WonderLog.Log.print(("allChunkLengths: ", allChunkLengths))
               |> ignore;

               let headerJsonStreamChunkTotalByteLength =
                 _computeHeaderJsonStreamChunkTotalByteLength(
                   jsonChunkLength,
                   streamChunkLength,
                 );

               _isLoadBinBufferChunk(
                 headerJsonStreamChunkTotalByteLength,
                 totalLoadedByteLength,
               ) ?
                 {
                   let streamChunkArr =
                     _getStreamChunkData(
                       streamChunkArr,
                       (jsonChunkLength, streamChunkLength),
                       totalLoadedByteLength,
                       loadedUint8ArrayArr,
                     );

                   /* WonderLog.Log.print(("streamChunkArr: ", streamChunkArr))
                   |> ignore; */

                   let state =
                     StateDataMainService.unsafeGetState(
                       StateDataMain.stateData,
                     );

                   let (state, assembleData) =
                     _assembleAndStartLoop(
                       assembleData,
                       jsonChunkLength,
                       totalLoadedByteLength,
                       loadedUint8ArrayArr,
                       default11Image,
                       handleBeforeStartLoopFunc,
                       state,
                     );

                   LoadStreamWDBBinBufferSystem.handleBinBufferData(
                     (
                       headerJsonStreamChunkTotalByteLength,
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
                        ) => {
                        StateDataMainService.setState(
                          StateDataMain.stateData,
                          state,
                        )
                        |> ignore;

                        read(
                          (
                            default11Image,
                            controller,
                            handleBeforeStartLoopFunc,
                            handleWhenDoneFunc,
                          ),
                          loadedUint8ArrayArr,
                          allChunkLengths |. Some,
                          streamChunkArr,
                          assembleData |. Some,
                          nextStreamChunkIndex,
                          loadedStreamChunkArrWhichNotHasAllData,
                          reader,
                        );
                      });
                 } :
                 _isLoadStreamChunk(jsonChunkLength, totalLoadedByteLength) ?
                   {
                     let streamChunkArr =
                       _getStreamChunkData(
                         streamChunkArr,
                         (jsonChunkLength, streamChunkLength),
                         totalLoadedByteLength,
                         loadedUint8ArrayArr,
                       );

                     let state =
                       StateDataMainService.unsafeGetState(
                         StateDataMain.stateData,
                       );

                     let (state, assembleData) =
                       _assembleAndStartLoop(
                         assembleData,
                         jsonChunkLength,
                         totalLoadedByteLength,
                         loadedUint8ArrayArr,
                         default11Image,
                         handleBeforeStartLoopFunc,
                         state,
                       );

                     StateDataMainService.setState(
                       StateDataMain.stateData,
                       state,
                     )
                     |> ignore;

                     read(
                       (
                         default11Image,
                         controller,
                         handleBeforeStartLoopFunc,
                         handleWhenDoneFunc,
                       ),
                       loadedUint8ArrayArr,
                       allChunkLengths |. Some,
                       streamChunkArr,
                       assembleData |. Some,
                       nextStreamChunkIndex,
                       loadedStreamChunkArrWhichNotHasAllData,
                       reader,
                     );
                   } :
                   read(
                     (
                       default11Image,
                       controller,
                       handleBeforeStartLoopFunc,
                       handleWhenDoneFunc,
                     ),
                     loadedUint8ArrayArr,
                     allChunkLengths |. Some,
                     streamChunkArr,
                     assembleData,
                     nextStreamChunkIndex,
                     loadedStreamChunkArrWhichNotHasAllData,
                     reader,
                   );
             };
         }
     )
  |> catch(e => {
       WonderLog.Log.error(e) |> ignore;

       reject(StreamType.ReadError);
     });