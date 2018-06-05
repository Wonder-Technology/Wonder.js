let _getSourcePath = (filePath, sourceRelativePath) =>
  PathService.resolve(filePath, sourceRelativePath);

let buildImageArray = ({images}: GLTFType.gltf) : Most.stream('a) => {
  open GLTFType;
  let imageArr = [||];
  switch (images) {
  | None => Most.just(imageArr)
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. streamArr, {uri}: image) =>
           switch (uri) {
           | None =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_loadImages",
                 ~description={j|image->uri should exist|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             )
           | Some(uri) =>
             switch (ConvertCommon.isBase64(uri)) {
             | false =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_loadImages",
                   ~description={j|only support base64 uri|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j},
                 ),
               )
             | true =>
               /* let filePath = _getSourcePath(gltfFilePath, uri); */
               streamArr
               |> ArrayService.push(
                    LoadImageSystem.loadBase64Image(uri)
                    |> Most.tap(image =>
                         imageArr
                         |> ArrayService.push(image)
                         /* imageMap
                            |> WonderCommonlib.HashMapService.set(filePath, image) */
                         |> ignore
                       ),
                  )
             }
           },
         [||],
       )
    |> Most.mergeArray
    |> Most.map(_ => imageArr)
  };
};

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