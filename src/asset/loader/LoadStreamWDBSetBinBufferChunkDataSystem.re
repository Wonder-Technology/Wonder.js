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

let setBinBufferChunkData =
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