let _buildDefaultName = textureIndex =>
  ConvertCommon.buildDefaultTextureName(textureIndex);

/* let _getNames = (textures, images) =>
   textures
   |> WonderCommonlib.ArrayService.reduceOneParami(
        (. nameArr, ({name, source}: GLTFType.texture) as texture, index) =>
          switch (name) {
          | Some(name) => nameArr |> ArrayService.push(name)
          | None =>
            switch (source) {
            | None => nameArr |> ArrayService.push(_buildDefaultName(index))
            | Some(source) =>
              let {name}: GLTFType.image =
                Array.unsafe_get(images |> OptionService.unsafeGet, source);

              switch (name) {
              | Some(name) => nameArr |> ArrayService.push(name)
              | None => nameArr |> ArrayService.push(_buildDefaultName(index))
              };
            }
          },
        [||],
      ); */

/* let _isBase64Image = uri =>
   switch (uri) {
   | Some(uri) => ConvertCommon.isBase64(uri)

   | None => false
   }; */

let convertToBasicSourceTextures =
    (({textures, images}: GLTFType.gltf) as gltf)
    : array(WDType.basicSourceTexture) =>
  switch (textures) {
  | None => [||]
  | Some(textures) =>
    textures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           arr,
           ({name, source, extras}: GLTFType.texture) as texture,
           index,
         ) =>
           switch (source) {
           | None => arr
           | Some(source) =>
             switch (
               ArrayService.getNth(source, images |> OptionService.unsafeGet)
             ) {
             | None => arr
             | Some(image) =>
               Array.unsafe_set(
                 arr,
                 index,
                 {
                   name:
                     switch (name) {
                     | Some(name) => name
                     | None => _buildDefaultName(index)
                     },
                   format: {
                     let ({uri, mimeType}: GLTFType.image) as image =
                       Array.unsafe_get(
                         images |> OptionService.unsafeGet,
                         source,
                       );

                     TextureFormatService.getFormatByMimeType(
                       mimeType |> OptionService.unsafeGet,
                     );
                   },
                   flipY:
                     switch (extras) {
                     | Some({flipY}) => flipY
                     | None => false
                     },
                 }: WDType.basicSourceTexture,
               );

               arr;
             }
           },
         [||],
       )
  };

let _convertMagFilter = magFilter =>
  switch (magFilter) {
  | None => TextureType.Linear
  | Some(magFilter) =>
    switch (magFilter) {
    | 9728 => TextureType.Nearest
    | 9729 => TextureType.Linear
    | magFilter =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertMagFilter",
          ~description={j|unknown magFilter: $magFilter|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let _convertMinFilter = minFilter =>
  switch (minFilter) {
  | None => TextureType.Nearest
  | Some(minFilter) =>
    switch (minFilter) {
    | 9728 => TextureType.Nearest
    | 9729 => TextureType.Linear
    | 9984 => TextureType.Nearest_mipmap_nearest
    | 9985 => TextureType.Linear_mipmap_nearest
    | 9986 => TextureType.Nearest_mipmap_linear
    | 9987 => TextureType.Linear_mipmap_linear
    | minFilter =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertMinFilter",
          ~description={j|unknown minFilter: $minFilter|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let _convertWrap = wrap =>
  switch (wrap) {
  | None => TextureType.Clamp_to_edge
  | Some(wrap) =>
    switch (wrap) {
    | 33071 => TextureType.Clamp_to_edge
    | 33648 => TextureType.Mirrored_repeat
    | 10497 => TextureType.Repeat
    | wrap =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertWrap",
          ~description={j|unknown wrap: $wrap|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let convertToSamplers = ({samplers}: GLTFType.gltf): array(WDType.sampler) =>
  switch (samplers) {
  | None => [||]
  | Some(samplers) =>
    samplers
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {magFilter, minFilter, wrapS, wrapT}: GLTFType.sampler) =>
           arr
           |> ArrayService.push(
                {
                  magFilter: _convertMagFilter(magFilter),
                  minFilter: _convertMinFilter(minFilter),
                  wrapS: _convertWrap(wrapS),
                  wrapT: _convertWrap(wrapT),
                }: WDType.sampler,
              ),
         [||],
       )
  };