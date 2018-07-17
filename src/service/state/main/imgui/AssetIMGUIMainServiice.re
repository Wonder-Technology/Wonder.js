open StateDataMainType;

let convertBitmapToImageData = ({imguiRecord}) =>
  switch (WonderImgui.AssetIMGUIService.getBitmap(imguiRecord)) {
  | None => None
  | Some(bitmap) => ImageDataService.convertImageToImageData(bitmap) |. Some
  };