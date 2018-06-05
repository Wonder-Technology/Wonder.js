let convertToBasicSourceTextures =
    ({nodes}: GLTFType.gltf)
    : WDType.basicSourceTextures => {
  count: ConvertCommon.getCount(nodes),
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
                    | None => WDType.LINEAR
                    | Some(magFilter) =>
                      switch (magFilter) {
                      | 9728 => WDType.NEAREST
                      | 9729 => WDType.LINEAR
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
                    | None => WDType.NEAREST
                    | Some(minFilter) =>
                      switch (minFilter) {
                      | 9728 => WDType.NEAREST
                      | 9729 => WDType.LINEAR
                      | 9984 => WDType.NEAREST_MIPMAP_NEAREST
                      | 9985 => WDType.LINEAR_MIPMAP_NEAREST
                      | 9986 => WDType.NEAREST_MIPMAP_LINEAR
                      | 9987 => WDType.LINEAR_MIPMAP_LINEAR
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
                    | None => WDType.CLAMP_TO_EDGE
                    | Some(wrapS) =>
                      switch (wrapS) {
                      | 33071 => WDType.CLAMP_TO_EDGE
                      | 33648 => WDType.MIRRORED_REPEAT
                      | 10497 => WDType.REPEAT
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
                    | None => WDType.CLAMP_TO_EDGE
                    | Some(wrapT) =>
                      switch (wrapT) {
                      | 33071 => WDType.CLAMP_TO_EDGE
                      | 33648 => WDType.MIRRORED_REPEAT
                      | 10497 => WDType.REPEAT
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