open StateDataMainType;

open SettingType;

let disposeTextureIndices =
    (material, getTextureIndicesIndexFunc, textureIndices) => {
  open Js.Typed_array;
  let sourceIndex = getTextureIndicesIndexFunc(material);
  let defaultIndex = TextureIndexService.getDefaultTextureIndex();
  for (i in 0 to BufferMaterialService.getTextureIndicesSize() - 1) {
    Uint32Array.unsafe_set(textureIndices, sourceIndex + i, defaultIndex);
  };
  textureIndices;
};

let isAlive = (material, disposedIndexArray) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let _getExistMapArr = mapArr =>
  mapArr
  |> Js.Array.filter(mapOpt => mapOpt |> Js.Option.isSome)
  |> Js.Array.map(mapOpt => mapOpt |> OptionService.unsafeGet);

let addAllMaps = (mapArr, state) =>
  mapArr
  |> _getExistMapArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (basicSourceTextureArr, arrayBufferViewSourceTextureArr), map) =>
         IndexSourceTextureMainService.isBasicSourceTextureIndex(map, state) ?
           (
             basicSourceTextureArr |> ArrayService.push(map),
             arrayBufferViewSourceTextureArr,
           ) :
           IndexSourceTextureMainService.isArrayBufferViewSourceTextureIndex(
             map,
             state,
           ) ?
             (
               basicSourceTextureArr,
               arrayBufferViewSourceTextureArr |> ArrayService.push(map),
             ) :
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="addAllMaps",
                 ~description={j|unknown map: $map|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             ),
       (
         WonderCommonlib.ArrayService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
       ),
     );

let disposeSourceMaps = (isRemoveTexture, materialData, mapArr, state) => {
  let (basicSourceTextureArr, arrayBufferViewSourceTextureArr) =
    addAllMaps(mapArr, state);

  state
  |> DisposeBasicSourceTextureMainService.handleDispose(
       isRemoveTexture,
       materialData,
       basicSourceTextureArr,
     )
  |> DisposeArrayBufferViewSourceTextureMainService.handleDispose(
       isRemoveTexture,
       materialData,
       arrayBufferViewSourceTextureArr,
     );
};