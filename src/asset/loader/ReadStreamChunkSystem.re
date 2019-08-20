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
    (
      allChunkLengths,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) =>
  switch (allChunkLengths) {
  | None =>
    let dataView =
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        (loadedUint8ArrayArr, totalUint8Array),
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
      (loadedUint8ArrayArr, totalUint8Array),
    ) =>
  Js.Array.length(streamChunkArr) > 0 ?
    streamChunkArr :
    {
      let dataView =
        LoadStreamWDBUtil.buildLoadedDataView(
          totalLoadedByteLength,
          (loadedUint8ArrayArr, totalUint8Array),
        );

      ConvertStreamSystem.getStreamChunkArr(chunkLengthData, dataView);
    };

let _getJsonChunkStr =
    (
      jsonChunkLength,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) => {
  let dataView =
    LoadStreamWDBUtil.buildLoadedDataView(
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    );

  BufferUtils.getWDBJsonChunkStr(
    jsonChunkLength,
    dataView |> DataView.buffer,
  );
};

let _getBinBuffer =
    (
      (jsonChunkLength, streamChunkLength, binBufferChunkLength),
      totalLoadedByteLength,
      totalUint8Array,
    ) =>
  Uint8Array.fromBufferRange(
    totalUint8Array |> Uint8Array.buffer,
    ~offset=
      BufferUtils.getWDBHeaderTotalByteLength()
      + (jsonChunkLength |> BufferUtils.alignedLength)
      + (streamChunkLength |> BufferUtils.alignedLength),
    ~length=binBufferChunkLength,
  )
  |> Uint8Array.buffer;

let _assembleAndStartLoop =
    (
      assembleData,
      (
        jsonChunkLength,
        totalLoadedByteLength,
        loadedUint8ArrayArr,
        default11Image,
      ),
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
      (basicSourceTextureArr, imageBasicSourceTextureIndices, images),
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

    let state = handleBeforeStartLoopFunc(state, rootGameObject);

    DirectorMainService.start(state);

    (
      StateDataMainService.unsafeGetState(StateDataMain.stateData),
      (
        rootGameObject,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageBasicSourceTextureIndices, images),
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

let _getTotalNeedLoadedByteLength =
    (
      allChunkLengths,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ) => {
  let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
    _getAllChunkLengths(
      allChunkLengths,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    );

  BufferUtils.getWDBHeaderTotalByteLength()
  + (jsonChunkLength |> BufferUtils.alignedLength)
  + (streamChunkLength |> BufferUtils.alignedLength)
  + (binBufferChunkLength |> BufferUtils.alignedLength);
};

let _handleDone =
    (
      controller,
      assembleData,
      (allChunkLengths, loadedUint8ArrayArr, totalUint8Array),
      handleWhenDoneFunc,
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect={j|totalUint8Array should >= loaded data|j},
          ~actual={j|not|j},
        ),
        () => {
          let totalLoadedByteLength =
            _getTotalLoadedByteLength(loadedUint8ArrayArr);

          totalUint8Array |> Uint8Array.byteLength >= totalLoadedByteLength;
        },
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|load all data|j},
          ~actual={j|not|j},
        ),
        () => {
          let totalLoadedByteLength =
            _getTotalLoadedByteLength(loadedUint8ArrayArr);

          totalLoadedByteLength
          == _getTotalNeedLoadedByteLength(
               allChunkLengths,
               totalLoadedByteLength,
               (loadedUint8ArrayArr, totalUint8Array),
             );
        },
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);
  let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
    _getAllChunkLengths(
      allChunkLengths,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    );

  HandleIMGUISystem.handleIMGUI(
    true,
    _getJsonChunkStr(
      jsonChunkLength,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    )
    |> Js.Json.parseExn
    |> Obj.magic,
    _getBinBuffer(
      (jsonChunkLength, streamChunkLength, binBufferChunkLength),
      totalLoadedByteLength,
      totalUint8Array,
    ),
    StateDataMainService.unsafeGetState(StateDataMain.stateData),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => {
       _close(controller);

       switch (assembleData) {
       | None =>
         WonderLog.Log.error(
           WonderLog.Log.buildErrorMessage(
             ~title="read",
             ~description=
               {j|assembleData should exist, but actually is none|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
         );
         resolve();

       | Some((rootGameObject, _, _)) =>
         handleWhenDoneFunc(
           StateDataMainService.unsafeGetState(StateDataMain.stateData),
           rootGameObject,
         )
         |> StateDataMainService.setState(StateDataMain.stateData)
         |> ignore;

         resolve();
       };
     });
};

let rec read =
        (
          (
            default11Image,
            controller,
            (contentLength, wdbPath, handleWhenLoadingFunc),
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          (loadedUint8ArrayArr, totalUint8Array),
          (
            allChunkLengths,
            streamChunkArr,
            assembleData: StreamType.assembleData,
            nextStreamChunkIndex,
            loadedStreamChunkArrWhichNotHasAllData,
            loadBlobImageMap,
          ),
          reader,
        ) =>
  _readReader(reader)
  |> then_(streamData =>
       FetchExtend.isDone(streamData) ?
         _handleDone(
           controller,
           assembleData,
           (allChunkLengths, loadedUint8ArrayArr, totalUint8Array),
           handleWhenDoneFunc,
         ) :
         _handleLoading(
           streamData,
           (
             default11Image,
             controller,
             (contentLength, wdbPath, handleWhenLoadingFunc),
             handleBeforeStartLoopFunc,
             handleWhenDoneFunc,
           ),
           (loadedUint8ArrayArr, totalUint8Array),
           (
             allChunkLengths,
             streamChunkArr,
             assembleData,
             nextStreamChunkIndex,
             loadedStreamChunkArrWhichNotHasAllData,
             loadBlobImageMap,
           ),
           reader,
         )
     )
and _handleLoadBinBufferChunk =
    (
      (
        jsonChunkLength,
        streamChunkLength,
        totalLoadedByteLength,
        headerJsonStreamChunkTotalByteLength,
      ),
      (
        default11Image,
        controller,
        (contentLength, wdbPath, handleWhenLoadingFunc),
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      (loadedUint8ArrayArr, totalUint8Array),
      (
        allChunkLengths,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ),
      reader,
    ) => {
  let streamChunkArr =
    _getStreamChunkData(
      streamChunkArr,
      (jsonChunkLength, streamChunkLength),
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    );

  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);

  let (state, assembleData) =
    _assembleAndStartLoop(
      assembleData,
      (
        jsonChunkLength,
        totalLoadedByteLength,
        (loadedUint8ArrayArr, totalUint8Array),
        default11Image,
      ),
      handleBeforeStartLoopFunc,
      state,
    );

  LoadStreamWDBBinBufferSystem.handleBinBufferData(
    (
      headerJsonStreamChunkTotalByteLength,
      totalLoadedByteLength,
      (loadedUint8ArrayArr, totalUint8Array),
    ),
    (
      nextStreamChunkIndex,
      streamChunkArr,
      loadedStreamChunkArrWhichNotHasAllData,
      loadBlobImageMap,
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
           loadBlobImageMap,
         ),
       ) => {
       StateDataMainService.setState(StateDataMain.stateData, state) |> ignore;

       read(
         (
           default11Image,
           controller,
           (contentLength, wdbPath, handleWhenLoadingFunc),
           handleBeforeStartLoopFunc,
           handleWhenDoneFunc,
         ),
         (loadedUint8ArrayArr, totalUint8Array),
         (
           allChunkLengths->Some,
           streamChunkArr,
           assembleData->Some,
           nextStreamChunkIndex,
           loadedStreamChunkArrWhichNotHasAllData,
           loadBlobImageMap,
         ),
         reader,
       );
     });
}
and _handleLoading =
    (
      streamData,
      (
        default11Image,
        controller,
        (contentLength, wdbPath, handleWhenLoadingFunc),
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      (loadedUint8ArrayArr, totalUint8Array),
      (
        allChunkLengths,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ),
      reader,
    ) => {
  /* TODO use requestIdleCallback + timeout? */

  let value = streamData##value;

  let loadedUint8ArrayArr = loadedUint8ArrayArr |> ArrayService.push(value);

  let totalLoadedByteLength = _getTotalLoadedByteLength(loadedUint8ArrayArr);

  handleWhenLoadingFunc(totalLoadedByteLength, contentLength, wdbPath);

  _isLoadHeader(totalLoadedByteLength) ?
    read(
      (
        default11Image,
        controller,
        (contentLength, wdbPath, handleWhenLoadingFunc),
        handleBeforeStartLoopFunc,
        handleWhenDoneFunc,
      ),
      (loadedUint8ArrayArr, totalUint8Array),
      (
        allChunkLengths,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ),
      reader,
    ) :
    {
      let (jsonChunkLength, streamChunkLength, binBufferChunkLength) as allChunkLengths =
        _getAllChunkLengths(
          allChunkLengths,
          totalLoadedByteLength,
          (loadedUint8ArrayArr, totalUint8Array),
        );

      let headerJsonStreamChunkTotalByteLength =
        _computeHeaderJsonStreamChunkTotalByteLength(
          jsonChunkLength,
          streamChunkLength,
        );

      _isLoadBinBufferChunk(
        headerJsonStreamChunkTotalByteLength,
        totalLoadedByteLength,
      ) ?
        _handleLoadBinBufferChunk(
          (
            jsonChunkLength,
            streamChunkLength,
            totalLoadedByteLength,
            headerJsonStreamChunkTotalByteLength,
          ),
          (
            default11Image,
            controller,
            (contentLength, wdbPath, handleWhenLoadingFunc),
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          (loadedUint8ArrayArr, totalUint8Array),
          (
            allChunkLengths,
            streamChunkArr,
            assembleData,
            nextStreamChunkIndex,
            loadedStreamChunkArrWhichNotHasAllData,
            loadBlobImageMap,
          ),
          reader,
        ) :
        read(
          (
            default11Image,
            controller,
            (contentLength, wdbPath, handleWhenLoadingFunc),
            handleBeforeStartLoopFunc,
            handleWhenDoneFunc,
          ),
          (loadedUint8ArrayArr, totalUint8Array),
          (
            allChunkLengths->Some,
            streamChunkArr,
            assembleData,
            nextStreamChunkIndex,
            loadedStreamChunkArrWhichNotHasAllData,
            loadBlobImageMap,
          ),
          reader,
        );
    };
};