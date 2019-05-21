open StateDataMainType;

open SettingType;

let disposeTextureIndices =
    (material, textureCountPerMaterial, textureIndices) => {
  open Js.Typed_array;
  let sourceIndex =
    BufferMaterialService.getTextureIndicesIndex(
      material,
      textureCountPerMaterial,
    );
  let defaultIndex = BufferMaterialService.getDefaultTextureIndex();
  for (i in
       0 to
       BufferMaterialService.getTextureIndicesSize(textureCountPerMaterial)
       - 1) {
    Uint32Array.unsafe_set(textureIndices, sourceIndex + i, defaultIndex);
  };
  textureIndices;
};

let isAlive = (material, disposedIndexArray) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let addAllMaps = (mapArr, state) =>
  mapArr
  |> Js.Array.filter(mapOpt => mapOpt |> Js.Option.isSome)
  |> Js.Array.map(mapOpt => mapOpt |> OptionService.unsafeGet)
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

let disposeMaps = (materialData, mapArr, state) => {
  let (basicSourceTextureArr, arrayBufferViewSourceTextureArr) =
    addAllMaps(mapArr, state);

  state
  |> DisposeBasicSourceTextureMainService.handleDispose(
       materialData,
       basicSourceTextureArr,
     )
  |> DisposeArrayBufferViewSourceTextureMainService.handleDispose(
       materialData,
       arrayBufferViewSourceTextureArr,
     );
};