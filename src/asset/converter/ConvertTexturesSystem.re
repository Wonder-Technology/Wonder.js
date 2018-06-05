let convertToBasicSourceTextures =
    ({textures}: GLTFType.gltf)
    : WDType.basicSourceTextures => {
  count:
    switch (textures) {
    | None => 0
    | Some(textures) => ConvertCommon.getCount(textures)
    },
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
                  magFilter:
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
                    },
                  minFilter:
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
                    },
                  wrapS:
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
                    },
                  wrapT:
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
                    },
                }: WDType.sampler,
              ),
         [||],
       )
  };