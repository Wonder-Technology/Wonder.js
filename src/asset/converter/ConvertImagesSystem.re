let convertToImages = ({images}: GLTFType.gltf) : array(WDType.image) =>
  switch (images) {
  | None => [||]
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {uri}: GLTFType.image) =>
           switch (uri) {
           | None =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_convertToImages",
                 ~description={j|uri should exist|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             )
           | Some(uri) => arr |> ArrayService.push({uri: uri}: WDType.image)
           },
         [||],
       )
  };