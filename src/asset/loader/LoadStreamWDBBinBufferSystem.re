open WonderBsMost;

open Js.Promise;

open Js.Typed_array;

open StreamType;

let _getGeometry = (meshIndex, geometryArr) =>
  Array.unsafe_get(geometryArr, meshIndex);

let _getGameObjectsAndGeometrys =
    (meshIndex, geometryArr, geometryGameObjects, gameObjectGeometrys) => {
  let geometry = _getGeometry(meshIndex, geometryArr);

  let gameObjects =
    gameObjectGeometrys
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. indexArr, gameObjectGeometry, index) =>
           gameObjectGeometry === geometry ?
             indexArr |> ArrayService.push(index) : indexArr,
         [||],
       )
    |> Js.Array.map(index => Array.unsafe_get(geometryGameObjects, index));

  /* let geometrys = gameObjects |> Js.Array.copy |> Js.Array.map(_ => geometry); */

  /* (gameObjects, geometrys); */
  (gameObjects, geometry);
};

let _getBasicSourceTextures =
    (
      imageIndex,
      basicSourceTextureArr,
      {textureIndices, imageIndices}: WDType.imageTextureIndexData,
    ) =>
  imageIndices
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. indexArr, imageSource, index) =>
         imageSource === imageIndex ?
           indexArr |> ArrayService.push(index) : indexArr,
       [||],
     )
  |> Js.Array.map(index =>
       Array.unsafe_get(
         basicSourceTextureArr,
         Array.unsafe_get(textureIndices, index),
       )
     );

let _computeCompleteStreamChunkTotalLoadedAlignedByteLength =
    (
      headerJsonStreamChunkTotalByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) =>
  headerJsonStreamChunkTotalByteLength
  + (
    streamChunkArr
    |> Js.Array.slice(~start=0, ~end_=nextStreamChunkIndex)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. chunkByteLength, {byteLength}: streamUnitData) =>
           chunkByteLength + (byteLength |> BufferUtils.alignedLength),
         0,
       )
  );

let rec _build =
        (
          completeStreamChunkTotalLoadedAlignedByteLength,
          totalLoadedByteLength,
          nextStreamChunkIndex,
          streamChunkArr,
          loadedArrayBuffer,
          images,
          loadedStreamChunkDataArr,
        ) =>
  nextStreamChunkIndex >= Js.Array.length(streamChunkArr) ?
    (nextStreamChunkIndex, loadedStreamChunkDataArr) :
    {
      let {byteLength, index, type_}: streamUnitData =
        Array.unsafe_get(streamChunkArr, nextStreamChunkIndex);

        WonderLog.Log.print(("nextStreamChunkIndex: ", nextStreamChunkIndex)) |> ignore;

      let nextCompleteStreamChunkTotalLoadedByteLength =
        completeStreamChunkTotalLoadedAlignedByteLength + byteLength;

        WonderLog.Log.print((
nextCompleteStreamChunkTotalLoadedByteLength , totalLoadedByteLength 

        )) |> ignore;

      nextCompleteStreamChunkTotalLoadedByteLength > totalLoadedByteLength ?
        (nextStreamChunkIndex, loadedStreamChunkDataArr) :
        {
          let loadedStreamChunkDataArr =
            switch (type_) {
            | Vertex
            | Normal
            | TexCoord
            | Index =>
              loadedStreamChunkDataArr
              |> ArrayService.push(
                   {
                     geometryData:
                       Some({
                         meshIndex: index,
                         arrayBuffer:
                           ArrayBuffer.slice(
                             ~start=completeStreamChunkTotalLoadedAlignedByteLength,
                             ~end_=nextCompleteStreamChunkTotalLoadedByteLength,
                             loadedArrayBuffer,
                           ),
                       }),
                     imageData: None,
                     type_,
                   }: loadedStreamData,
                 )
            | Image =>
              let imageIndex = index;

              let {mimeType}: WDType.image =
                Array.unsafe_get(
                  images |> OptionService.unsafeGetJsonSerializedValue,
                  imageIndex,
                );

              loadedStreamChunkDataArr
              |> ArrayService.push(
                   {
                     geometryData: None,
                     imageData:
                       Some({
                         imageIndex,
                         mimeType,
                         arrayBuffer:
                           ArrayBuffer.slice(
                             ~start=completeStreamChunkTotalLoadedAlignedByteLength,
                             ~end_=nextCompleteStreamChunkTotalLoadedByteLength,
                             loadedArrayBuffer,
                           ),
                       }),
                     type_,
                   }: loadedStreamData,
                 );
            };

          _build(
            nextCompleteStreamChunkTotalLoadedByteLength
            |> BufferUtils.alignedLength,
            totalLoadedByteLength,
            nextStreamChunkIndex |> succ,
            streamChunkArr,
            loadedArrayBuffer,
            images,
            loadedStreamChunkDataArr,
          );
        };
    };

let _splitLoadedStreamChunkArrByJudgeHasAllData =
    (
      nextStreamChunkIndex,
      streamChunkArr: array(StreamType.streamUnitData),
      loadedStreamChunkDataArr: array(loadedStreamData),
    ) => {
  let {geometryData}: loadedStreamData =
    Array.unsafe_get(loadedStreamChunkDataArr, 0);

  let {meshIndex} = geometryData |> OptionService.unsafeGet;

  let firstMeshIndex = meshIndex;

  let (
    prevMeshIndex,
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ) =
    loadedStreamChunkDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             prevMeshIndex,
             loadedStreamChunkArrWhichNotHasAllData,
             loadedStreamChunkDataArrWhichHasAllData,
           ),
           ({geometryData, imageData, type_}: loadedStreamData) as data,
         ) =>
           switch (geometryData) {
           | Some({meshIndex}) when meshIndex !== prevMeshIndex => (
               meshIndex,
               [|data|],
               loadedStreamChunkDataArrWhichHasAllData
               |> Js.Array.concat(loadedStreamChunkArrWhichNotHasAllData),
             )
           | _ => (
               prevMeshIndex,
               loadedStreamChunkArrWhichNotHasAllData
               |> ArrayService.push(data),
               loadedStreamChunkDataArrWhichHasAllData,
             )
           },
         (firstMeshIndex, [||], [||]),
       );

  nextStreamChunkIndex === Js.Array.length(streamChunkArr)
  ||
  Array.unsafe_get(streamChunkArr, nextStreamChunkIndex).type_ === StreamType.Vertex ?
    (
      [||],
      loadedStreamChunkDataArrWhichHasAllData
      |> Js.Array.concat(loadedStreamChunkArrWhichNotHasAllData),
    ) :
    (
      loadedStreamChunkArrWhichNotHasAllData,
      loadedStreamChunkDataArrWhichHasAllData,
    );
};

let _loadBlobImageFromImageArrayBufferData =
    (loadedStreamChunkDataArr: array(loadedStreamData), loadBlobImageMap) => {
  let resultLoadedStreamChunkDataArr = [||];

  Most.from(loadedStreamChunkDataArr)
  |> Most.concatMap(({geometryData, imageData, type_}: loadedStreamData) =>
       switch (type_) {
       | Image =>
         let {imageIndex, mimeType, arrayBuffer} =
           imageData |> OptionService.unsafeGet;

         WonderLog.Log.print(arrayBuffer) |> ignore;

         switch (
           loadBlobImageMap
           |> WonderCommonlib.SparseMapService.get(imageIndex)
         ) {
         | Some(image) =>
           resultLoadedStreamChunkDataArr
           |> ArrayService.push(
                {
                  geometryData: None,
                  imageData: Some({imageIndex, image}),
                  type_,
                }: loadedStreamBlobData,
              )
           |> ignore;

           Most.empty();
         | None =>
           AssembleUtils.buildLoadImageStream(
             arrayBuffer,
             mimeType,
             {j|load image error. imageIndex: $imageIndex|j},
           )
           |> Most.tap(image => {
                resultLoadedStreamChunkDataArr
                |> ArrayService.push(
                     {
                       geometryData: None,
                       imageData: Some({imageIndex, image}),
                       type_,
                     }: loadedStreamBlobData,
                   )
                |> ignore;

                loadBlobImageMap
                |> WonderCommonlib.SparseMapService.set(imageIndex, image)
                |> ignore;
              })
           |> Most.map(_ => ())
         };

       | _ =>
         resultLoadedStreamChunkDataArr
         |> ArrayService.push({geometryData, imageData: None, type_})
         |> ignore;

         Most.empty();
       }
     )
  |> Most.drain
  |> then_(() =>
       (resultLoadedStreamChunkDataArr, loadBlobImageMap) |> resolve
     );
};

let _buildBinBufferChunkData =
    (
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      loadedArrayBuffer,
      streamChunkArr,
      loadBlobImageMap,
      images,
    ) => {
      WonderLog.Log.print(("completeStreamChunkTotalLoadedAlignedByteLength: ", completeStreamChunkTotalLoadedAlignedByteLength)) |> ignore;
  let (nextStreamChunkIndex, loadedStreamChunkDataArr) =
    _build(
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
      loadedArrayBuffer,
      images,
      loadedStreamChunkArrWhichNotHasAllData,
    );

  WonderLog.Log.print(("loadedStreamChunkDataArr:", loadedStreamChunkDataArr))
  |> ignore;

  let (
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ) =
    loadedStreamChunkDataArr
    |> _splitLoadedStreamChunkArrByJudgeHasAllData(
         nextStreamChunkIndex,
         streamChunkArr,
       );

  WonderLog.Log.printJson((
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ))
  |> ignore;

  _loadBlobImageFromImageArrayBufferData(
    loadedStreamChunkDataArrWhichHasAllData,
    loadBlobImageMap,
  )
  |> then_(
       ((resultLoadedStreamChunkDataArrWhichHasAllData, loadBlobImageMap)) =>
       (
         resultLoadedStreamChunkDataArrWhichHasAllData,
         nextStreamChunkIndex,
         loadedStreamChunkArrWhichNotHasAllData,
         loadBlobImageMap,
       )
       |> resolve
     );
};

let _setGeometryData =
    (
      geometryData,
      geometryArr,
      geometryGameObjects,
      gameObjectGeometrys,
      (setPointsByTypeArrayFunc, fromBufferFunc),
      state,
    ) => {
  let (_, geometry) =
    _getGameObjectsAndGeometrys(
      geometryData.meshIndex,
      geometryArr,
      geometryGameObjects,
      gameObjectGeometrys,
    );

  WonderLog.Log.print(("geometry:", geometry)) |> ignore;

  setPointsByTypeArrayFunc(
    geometry,
    fromBufferFunc(geometryData.arrayBuffer),
    state,
  );
};

let _setBinBufferChunkData =
    (
      loadedStreamChunkDataArrWhichHasAllData,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (basicSourceTextureArr, imageTextureIndices),
      state,
    ) =>
  loadedStreamChunkDataArrWhichHasAllData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, {geometryData, imageData, type_}) =>
         switch (type_) {
         | Vertex =>
           _setGeometryData(
             geometryData |> OptionService.unsafeGet,
             geometryArr,
             geometryGameObjects,
             gameObjectGeometrys,
             (
               VerticesGeometryMainService.setVerticesByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | Normal =>
           _setGeometryData(
             geometryData |> OptionService.unsafeGet,
             geometryArr,
             geometryGameObjects,
             gameObjectGeometrys,
             (
               NormalsGeometryMainService.setNormalsByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | TexCoord =>
           _setGeometryData(
             geometryData |> OptionService.unsafeGet,
             geometryArr,
             geometryGameObjects,
             gameObjectGeometrys,
             (
               TexCoordsGeometryMainService.setTexCoordsByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | Index =>
           let {meshIndex, arrayBuffer} =
             geometryData |> OptionService.unsafeGet;
           let (gameObjects, geometry) =
             _getGameObjectsAndGeometrys(
               meshIndex,
               geometryArr,
               geometryGameObjects,
               gameObjectGeometrys,
             );

           let state =
             IndicesGeometryMainService.setIndicesByTypeArray(
               geometry,
               Uint16Array.fromBuffer(arrayBuffer),
               state,
             );

           let geometrys =
             gameObjects |> Js.Array.copy |> Js.Array.map(_ => geometry);

           state
           |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
                gameObjects,
                geometrys,
              );
         | Image =>
           let {imageIndex, image} = imageData |> OptionService.unsafeGet;
           let basicSourceTextures =
             _getBasicSourceTextures(
               imageIndex,
               basicSourceTextureArr,
               imageTextureIndices,
             );

           basicSourceTextures
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (. state, basicSourceTexture) =>
                  OperateBasicSourceTextureMainService.setSource(
                    basicSourceTexture,
                    image |> ImageType.imageToDomExtendImageElement,
                    state,
                  ),
                state,
              );
         },
       state,
     );

let _isLoadCompleteNextStreamChunkData =
    (
      totalLoadedByteLength,
      completeStreamChunkTotalLoadedAlignedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|streamChunkArr has chunkData to load|j},
                ~actual={j|not|j},
              ),
              () =>
              nextStreamChunkIndex <= Js.Array.length(streamChunkArr) - 2
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {byteLength} =
    Array.unsafe_get(streamChunkArr, nextStreamChunkIndex + 1);

  totalLoadedByteLength >= completeStreamChunkTotalLoadedAlignedByteLength
  + (byteLength |> BufferUtils.alignedLength);
};

let handleBinBufferData =
    (
      (
        headerJsonStreamChunkTotalByteLength,
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      ),
      (
        nextStreamChunkIndex,
        streamChunkArr,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ),
      (
        _,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ) as assembleData,
      state,
    ) => {
  let completeStreamChunkTotalLoadedAlignedByteLength =
    _computeCompleteStreamChunkTotalLoadedAlignedByteLength(
      headerJsonStreamChunkTotalByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    );

  /* WonderLog.Log.print((
       "headerJsonStreamChunkTotalByteLength: ",
       headerJsonStreamChunkTotalByteLength,
     ))
     |> ignore; */

  !
    _isLoadCompleteNextStreamChunkData(
      totalLoadedByteLength,
      completeStreamChunkTotalLoadedAlignedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) ?
    /* TODO optimize: not use promise here? */
    make((~resolve, ~reject) =>
      resolve(. (
        state,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ))
    ) :
    _buildBinBufferChunkData(
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      )
      |> DataView.buffer,
      streamChunkArr,
      loadBlobImageMap,
      images,
    )
    |> then_(
         (
           (
             loadedStreamChunkDataArrWhichHasAllData,
             nextStreamChunkIndex,
             loadedStreamChunkArrWhichNotHasAllData,
             loadBlobImageMap,
           ),
         ) => {
         let state =
           _setBinBufferChunkData(
             loadedStreamChunkDataArrWhichHasAllData,
             (geometryArr, geometryGameObjects, gameObjectGeometrys),
             (basicSourceTextureArr, imageTextureIndices),
             state,
           );

         (
           state,
           streamChunkArr,
           assembleData,
           nextStreamChunkIndex,
           loadedStreamChunkArrWhichNotHasAllData,
           loadBlobImageMap,
         )
         |> resolve;
       });
};