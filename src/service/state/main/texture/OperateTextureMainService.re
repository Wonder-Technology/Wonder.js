let convertNeedAddedSourceArrayToImageDataArr = needAddedSourceArray =>
  needAddedSourceArray
  |> Js.Array.filter(((_, source)) =>
       Obj.magic(source) !== Js.Nullable.undefined
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. imageDataArr, (texture, source)) => {
         let (arrayBuffer, width, height) =
           ImageDataService.convertImageToImageData(source);

         imageDataArr
         |> ArrayService.push((arrayBuffer, width, height, texture));
       },
       [||],
     );