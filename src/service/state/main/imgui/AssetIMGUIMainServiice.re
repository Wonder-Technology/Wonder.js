open StateDataMainType;

let convertBitmapToImageData = state =>
  switch (
    WonderImgui.AssetIMGUIService.getBitmap(
      RecordIMGUIMainService.getWonderIMGUIRecord(state),
    )
  ) {
  | None => None
  | Some(bitmap) => ImageDataService.convertImageToImageData(bitmap) |. Some
  };

let convertCustomTextureSourcesToImageDataArr = state =>
  WonderImgui.AssetIMGUIAPI.getCustomImageArr(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. imageDataArr, (image, id, imageType)) =>
         imageDataArr
         |> ArrayService.push((
              ImageDataService.convertImageToImageData(image),
              id,
              imageType,
            )),
       [||],
     );