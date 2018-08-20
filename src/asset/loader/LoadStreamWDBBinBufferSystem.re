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

let _computeLoadedChunkByteLength = (nextStreamChunkIndex, streamChunkArr) =>
  streamChunkArr
  |> Js.Array.slice(~start=0, ~end_=nextStreamChunkIndex)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. chunkByteLength, {byteLength}: streamUnitData) =>
         chunkByteLength + byteLength,
       0,
     );

let rec _build =
        (
          loadedChunkByteOffset,
          totalLoadedByteLength,
          nextStreamChunkIndex,
          streamChunkArr,
          loadedArrayBuffer,
          images,
          loadedStreamChunkDataArr,
        ) =>
  loadedChunkByteOffset >= totalLoadedByteLength ?
    (nextStreamChunkIndex, loadedStreamChunkDataArr) :
    {
      let {byteLength, index, type_}: streamUnitData =
        Array.unsafe_get(streamChunkArr, nextStreamChunkIndex);

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
                         ~start=loadedChunkByteOffset,
                         ~end_=loadedChunkByteOffset + byteLength,
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
                         ~start=loadedChunkByteOffset,
                         ~end_=loadedChunkByteOffset + byteLength,
                         loadedArrayBuffer,
                       ),
                   }),
                 type_,
               }: loadedStreamData,
             );
        };

      _build(
        loadedChunkByteOffset + byteLength,
        totalLoadedByteLength,
        nextStreamChunkIndex |> succ,
        streamChunkArr,
        loadedArrayBuffer,
        images,
        loadedStreamChunkDataArr,
      );
    };

let _splitLoadedStreamChunkArrByJudgeHasAllData =
    (loadedStreamChunkDataArr: array(loadedStreamData)) => {
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
               [||],
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

  (
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  );
};

/* let _loadBlobImageFromImageArrayBufferData = (loadedImageMap, loadedStreamChunkDataArr) => { */
let _loadBlobImageFromImageArrayBufferData =
    (loadedStreamChunkDataArr: array(loadedStreamData)) => {
  let resultLoadedStreamChunkDataArr = [||];

  Most.from(loadedStreamChunkDataArr)
  |> Most.flatMap(({geometryData, imageData, type_}: loadedStreamData) =>
       switch (type_) {
       | Image =>
         let {imageIndex, mimeType, arrayBuffer} =
           imageData |> OptionService.unsafeGet;

         AssembleUtils.buildLoadImageStream(
           arrayBuffer,
           mimeType,
           {j|load image error. imageIndex: $imageIndex|j},
         )
         |> Most.tap(image
              /* loadedImageMap |> WonderCommonlib.SparseMapService.set(
                   imageIndex, image
                 ) |> ignore; */
              =>
                resultLoadedStreamChunkDataArr
                |> ArrayService.push(
                     {
                       geometryData: None,
                       imageData: Some({imageIndex, image}),
                       type_,
                     }: loadedStreamBlobData,
                   )
                |> ignore
              )
         |> Most.map(_ => ());
       | _ =>
         resultLoadedStreamChunkDataArr
         |> ArrayService.push({geometryData, imageData: None, type_})
         |> ignore;

         Most.empty();
       }
     )
  |> Most.drain
  |> then_(() =>
       resultLoadedStreamChunkDataArr
       /* loadedImageMap */
       |> resolve
     );
};

let _buildBinBufferChunkData =
    (
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      loadedChunkByteLength,
      totalLoadedByteLength,
      loadedArrayBuffer,
      streamChunkArr,
      /* loadedImageMap, */
      images,
    ) => {
  let (nextStreamChunkIndex, loadedStreamChunkDataArr) =
    _build(
      loadedChunkByteLength,
      totalLoadedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
      loadedArrayBuffer,
      images,
      loadedStreamChunkArrWhichNotHasAllData,
    );

  let (
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ) =
    loadedStreamChunkDataArr |> _splitLoadedStreamChunkArrByJudgeHasAllData;

  /* _loadBlobImageFromImageArrayBufferData (loadedImageMap, loadedStreamChunkDataArrWhichHasAllData) */
  _loadBlobImageFromImageArrayBufferData(
    loadedStreamChunkDataArrWhichHasAllData,
  )
  |> then_(
       /* (resultLoadedStreamChunkDataArrWhichHasAllData, nextStreamChunkIndex) */
       resultLoadedStreamChunkDataArrWhichHasAllData
       /* loadedImageMap */
       =>
         (
           resultLoadedStreamChunkDataArrWhichHasAllData,
           nextStreamChunkIndex,
           loadedStreamChunkArrWhichNotHasAllData,
           /* loadedImageMap */
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

  setPointsByTypeArrayFunc(
    geometry,
    fromBufferFunc(geometryData.arrayBuffer),
    state,
  );
};

let _setBinBufferChunkData =
    (
      loadedStreamChunkDataArrWhichHasAllData,
      /* nextStreamChunkIndex, */
      /* loadedStreamChunkArrWhichNotHasAllData, */
      /* loadedImageMap, */
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
               VerticesGeometryMainService.setVerticesByTypeArray,
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

let _isLoadCompleteNextStreamData =
    (
      totalLoadedByteLength,
      loadedChunkByteLength,
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

  loadedChunkByteLength + byteLength <= totalLoadedByteLength;
};

let handleBinBufferData =
    (
      (totalLoadedByteLength, loadedUint8ArrayArr),
      (
        nextStreamChunkIndex,
        streamChunkArr,
        loadedStreamChunkArrWhichNotHasAllData,
      ),
      /* loadedImageMap, */
      (
        _,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ) as assembleData,
      state,
    ) => {
  let loadedChunkByteLength =
    _computeLoadedChunkByteLength(nextStreamChunkIndex, streamChunkArr);

  _isLoadCompleteNextStreamData(
    totalLoadedByteLength,
    loadedChunkByteLength,
    nextStreamChunkIndex,
    streamChunkArr,
  ) ?
    make((~resolve, ~reject) =>
      resolve(. (
        state,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
      ))
    ) :
    _buildBinBufferChunkData(
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      loadedChunkByteLength,
      totalLoadedByteLength,
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      )
      |> DataView.buffer,
      streamChunkArr,
      images,
      /* loadedImageMap */
    )
    |> then_(
         (
           (
             loadedStreamChunkDataArrWhichHasAllData,
             nextStreamChunkIndex,
             loadedStreamChunkArrWhichNotHasAllData,
           ),
         ) => {
         /* loadedImageMap */

         let state =
           _setBinBufferChunkData(
             loadedStreamChunkDataArrWhichHasAllData,
             /* loadedImageMap, */
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
         )
         |> resolve;
       });
};