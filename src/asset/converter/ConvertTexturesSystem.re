let _buildDefaultName = textureIndex =>
  ConvertCommon.buildDefaultName("texture", textureIndex);

/* TODO support get name from image->uri if not base64 (e.g. uri: "image.png") */
let _getNames = (textures, images) =>
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
     );

let _isBase64Image = uri =>
  switch (uri) {
  | Some(uri) => ConvertCommon.isBase64(uri)

  | None => false
  };

let _getFormat = mimeType =>
  switch (mimeType) {
  | "image/png" => SourceTextureType.RGBA
  | "image/jpeg" => SourceTextureType.RGB
  | mimeType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="convertToBasicSourceTextures",
        ~description={j|unknown mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|mimeType: $mimeType|j},
      ),
    )
  };

let convertToBasicSourceTextures =
    (({textures, images}: GLTFType.gltf) as gltf)
    : array(WDType.basicSourceTexture) =>
  switch (textures) {
  | None => [||]
  | Some(textures) =>
    textures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. arr, ({name, source}: GLTFType.texture) as texture, index) =>
           arr
           |> ArrayService.push(
                {
                  name:
                    switch (name) {
                    | Some(name) => name
                    | None =>
                      switch (source) {
                      | None => _buildDefaultName(index)
                      | Some(source) =>
                        let {name}: GLTFType.image =
                          Array.unsafe_get(
                            images |> OptionService.unsafeGet,
                            source,
                          );

                        switch (name) {
                        | Some(name) => name
                        | None => _buildDefaultName(index)
                        };
                      }
                    },
                  format: {
                    let ({uri, mimeType}: GLTFType.image) as image =
                      Array.unsafe_get(
                        images |> OptionService.unsafeGet,
                        source |> OptionService.unsafeGet,
                      );

                    _isBase64Image(uri) ?
                      _getFormat(
                        uri
                        |> OptionService.unsafeGet
                        |> ConvertCommon.getBase64MimeType,
                      ) :
                      _getFormat(mimeType |> OptionService.unsafeGet);
                  },
                }: WDType.basicSourceTexture,
              ),
         [||],
       )
  };

let _convertMagFilter = magFilter =>
  switch (magFilter) {
  | None => SourceTextureType.LINEAR
  | Some(magFilter) =>
    switch (magFilter) {
    | 9728 => SourceTextureType.NEAREST
    | 9729 => SourceTextureType.LINEAR
    | magFilter =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertToSamplers",
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
  | None => SourceTextureType.NEAREST
  | Some(minFilter) =>
    switch (minFilter) {
    | 9728 => SourceTextureType.NEAREST
    | 9729 => SourceTextureType.LINEAR
    | 9984 => SourceTextureType.NEAREST_MIPMAP_NEAREST
    | 9985 => SourceTextureType.LINEAR_MIPMAP_NEAREST
    | 9986 => SourceTextureType.NEAREST_MIPMAP_LINEAR
    | 9987 => SourceTextureType.LINEAR_MIPMAP_LINEAR
    | minFilter =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertToSamplers",
          ~description={j|unknown minFilter: $minFilter|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let _convertWrapS = wrapS =>
  switch (wrapS) {
  | None => SourceTextureType.CLAMP_TO_EDGE
  | Some(wrapS) =>
    switch (wrapS) {
    | 33071 => SourceTextureType.CLAMP_TO_EDGE
    | 33648 => SourceTextureType.MIRRORED_REPEAT
    | 10497 => SourceTextureType.REPEAT
    | wrapS =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertToSamplers",
          ~description={j|unknown wrapS: $wrapS|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let _convertWrapT = wrapT =>
  switch (wrapT) {
  | None => SourceTextureType.CLAMP_TO_EDGE
  | Some(wrapT) =>
    switch (wrapT) {
    | 33071 => SourceTextureType.CLAMP_TO_EDGE
    | 33648 => SourceTextureType.MIRRORED_REPEAT
    | 10497 => SourceTextureType.REPEAT
    | wrapT =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_convertToSamplers",
          ~description={j|unknown wrapT: $wrapT|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };

let convertToSamplers = ({samplers}: GLTFType.gltf) : array(WDType.sampler) =>
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
                  wrapS: _convertWrapS(wrapS),
                  wrapT: _convertWrapT(wrapT),
                }: WDType.sampler,
              ),
         [||],
       )
  };