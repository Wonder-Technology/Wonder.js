
let _convertToImageTextureIndices =
    (source, index, (imageBasicSourceTextureIndices, imageIndices)) =>
  switch (source) {
  | None => (imageBasicSourceTextureIndices, imageIndices)
  | Some(source) => (
      imageBasicSourceTextureIndices |> ArrayService.push(index),
      imageIndices |> ArrayService.push(source),
    )
  };

let _convertToSamplerTextureIndices =
    (sampler, index, (samplerTextureIndices, samplerIndices)) =>
  switch (sampler) {
  | None => (samplerTextureIndices, samplerIndices)
  | Some(sampler) => (
      samplerTextureIndices |> ArrayService.push(index),
      samplerIndices |> ArrayService.push(sampler),
    )
  };

let convertToImageAndSamplerTextureIndices =
    ({nodes, textures}: GLTFType.gltf) =>
  switch (textures) {
  | None => (([||], [||]), ([||], [||]))
  | Some(textures) =>
    textures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (
             (imageBasicSourceTextureIndices, imageIndices),
             (samplerTextureIndices, samplerIndices),
           ),
           {sampler, source}: GLTFType.texture,
           index,
         ) => (
           _convertToImageTextureIndices(
             source,
             index,
             (imageBasicSourceTextureIndices, imageIndices),
           ),
           _convertToSamplerTextureIndices(
             sampler,
             index,
             (samplerTextureIndices, samplerIndices),
           ),
         ),
         (([||], [||]), ([||], [||])),
       )
    |> WonderLog.Contract.ensureCheck(
         (
           (
             (imageBasicSourceTextureIndices, imageIndices),
             (samplerTextureIndices, samplerIndices),
           ),
         ) => {
           open WonderLog;
           open Contract;
           open Operators;
           test(
             Log.buildAssertMessage(
               ~expect={j|imageBasicSourceTextureIndices' count == imageIndices' count|j},
               ~actual={j|not|j},
             ),
             () =>
             imageBasicSourceTextureIndices
             |> Js.Array.length == (imageIndices |> Js.Array.length)
           );
           test(
             Log.buildAssertMessage(
               ~expect=
                 {j|samplerTextureIndices' count == samplerIndices' count|j},
               ~actual={j|not|j},
             ),
             () =>
             samplerTextureIndices
             |> Js.Array.length == (samplerIndices |> Js.Array.length)
           );
         },
         IsDebugMainService.getIsDebug(StateDataMain.stateData),
       )
  };