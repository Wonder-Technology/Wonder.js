open StateDataMainType;

let convertBitmapToImageData = state =>
  switch (
    WonderImgui.AssetIMGUIService.getBitmap(
      RecordIMGUIMainService.getRecord(state),
    )
  ) {
  | None => None
  | Some(bitmap) => ImageDataService.convertImageToImageData(bitmap) |. Some
  };

let convertCustomTextureSourcesToImageDataArr = ({imguiRecord}) =>
  WonderImgui.AssetIMGUIAPI.getCustomImageArr(imguiRecord)
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