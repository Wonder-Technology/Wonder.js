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

let _setGeometryData =
    (
      (geometryData, geometryArr, geometryGameObjects, gameObjectGeometrys),
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

let _setBasicSourceTextureImageData =
    ({imageIndex, image}, basicSourceTextureArr, imageBasicSourceTextureIndices, state) => {
  let basicSourceTextures =
    IndicesUtils.getBasicSourceTextures(
      imageIndex,
      basicSourceTextureArr,
      imageBasicSourceTextureIndices,
    );

  basicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, basicSourceTexture) =>
         OperateBasicSourceTextureMainService.setIsNeedUpdate(
           basicSourceTexture,
           BufferTextureService.getNeedUpdate(),
           state,
         )
         |> OperateBasicSourceTextureMainService.setSource(
              basicSourceTexture,
              image |> ImageType.imageToDomExtendImageElement,
            ),
       state,
     );
};

let _setOneFaceCubemapTextureImageData =
    (image, oneFaceCubemapTextures, setSourceFunc, state) =>
  oneFaceCubemapTextures
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, cubemapTexture) =>
         OperateCubemapTextureMainService.setIsNeedUpdate(
           cubemapTexture,
           BufferTextureService.getNeedUpdate(),
           state,
         )
         |> setSourceFunc(
              cubemapTexture,
              image |> ImageType.imageToDomExtendImageElement,
            ),
       state,
     );

let _setCubemapTextureImageData =
    (
      {imageIndex, image},
      cubemapTextureArr,
      imageCubemapTextureIndices,
      state,
    ) =>
  state
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getPXCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setPXSource,
     )
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getNXCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setNXSource,
     )
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getPYCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setPYSource,
     )
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getNYCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setNYSource,
     )
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getPZCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setPZSource,
     )
  |> _setOneFaceCubemapTextureImageData(
       image,
       IndicesUtils.getNZCubemapTextures(
         imageIndex,
         cubemapTextureArr,
         imageCubemapTextureIndices,
       ),
       OperateCubemapTextureMainService.setNZSource,
     );

let _setImageData =
    (
      imageData,
      (
        (basicSourceTextureArr, imageBasicSourceTextureIndices),
        (cubemapTextureArr, imageCubemapTextureIndices),
      ),
      state,
    ) => {
  let imageData = imageData |> OptionService.unsafeGet;

  state
  |> _setBasicSourceTextureImageData(
       imageData,
       basicSourceTextureArr,
       imageBasicSourceTextureIndices,
     )
  |> _setCubemapTextureImageData(
       imageData,
       cubemapTextureArr,
       imageCubemapTextureIndices,
     );
};

let _getIndexUint16Data = (componentType, arrayBuffer) =>
  switch (componentType) {
  | 5121 =>
    Uint16Array.make(Uint8Array.fromBuffer(arrayBuffer) |> Obj.magic)->Some
  | 5123 => Uint16Array.fromBuffer(arrayBuffer)->Some
  | _ => None
  };

let _getIndexUint32Data = (componentType, arrayBuffer) =>
  switch (componentType) {
  | 5125 => Uint32Array.fromBuffer(arrayBuffer)->Some
  | _ => None
  };

let _setIndexData =
    (
      (geometryData, geometryArr, geometryGameObjects, gameObjectGeometrys),
      state,
    ) => {
  let {componentType, meshIndex, arrayBuffer} =
    geometryData |> OptionService.unsafeGet;
  let (gameObjects, geometry) =
    _getGameObjectsAndGeometrys(
      meshIndex,
      geometryArr,
      geometryGameObjects,
      gameObjectGeometrys,
    );

  let state =
    switch (_getIndexUint16Data(componentType, arrayBuffer)) {
    | Some(data) =>
      IndicesGeometryMainService.setIndicesByUint16Array(
        geometry,
        data,
        state,
      )
    | None =>
      switch (_getIndexUint32Data(componentType, arrayBuffer)) {
      | Some(data) =>
        IndicesGeometryMainService.setIndicesByUint32Array(
          geometry,
          data,
          state,
        )
      | None =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="setBinBufferChunkData",
            ~description={j|unknown componentType: $componentType|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
      }
    };

  let geometrys = gameObjects |> Js.Array.copy |> Js.Array.map(_ => geometry);

  state
  |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
       gameObjects,
       geometrys,
     );
};

let setBinBufferChunkData =
    (
      loadedStreamChunkDataArrWhichHasAllData,
      (geometryArr, geometryGameObjects, gameObjectGeometrys),
      (
        (basicSourceTextureArr, imageBasicSourceTextureIndices),
        (cubemapTextureArr, imageCubemapTextureIndices),
      ),
      state,
    ) =>
  loadedStreamChunkDataArrWhichHasAllData
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, {geometryData, imageData, type_}) =>
         switch (type_) {
         | Vertex =>
           _setGeometryData(
             (
               geometryData |> OptionService.unsafeGet,
               geometryArr,
               geometryGameObjects,
               gameObjectGeometrys,
             ),
             (
               VerticesGeometryMainService.setVerticesByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | Normal =>
           _setGeometryData(
             (
               geometryData |> OptionService.unsafeGet,
               geometryArr,
               geometryGameObjects,
               gameObjectGeometrys,
             ),
             (
               NormalsGeometryMainService.setNormalsByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | TexCoord =>
           _setGeometryData(
             (
               geometryData |> OptionService.unsafeGet,
               geometryArr,
               geometryGameObjects,
               gameObjectGeometrys,
             ),
             (
               TexCoordsGeometryMainService.setTexCoordsByTypeArray,
               Float32Array.fromBuffer,
             ),
             state,
           )
         | Index =>
           _setIndexData(
             (
               geometryData,
               geometryArr,
               geometryGameObjects,
               gameObjectGeometrys,
             ),
             state,
           )
         | Image =>
           _setImageData(
             imageData,
             (
               (basicSourceTextureArr, imageBasicSourceTextureIndices),
               (cubemapTextureArr, imageCubemapTextureIndices),
             ),
             state,
           )
         },
       state,
     );