open BufferSizeTextureService;

let getNeedUpdate = () =>
  TextureType.NeedUpdate |> TextureType.isNeedUpdateToUint8;

let getNotNeedUpdate = () =>
  TextureType.Not_needUpdate |> TextureType.isNeedUpdateToUint8;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

let getFlipY = () => TextureType.Flipy |> TextureType.isFlipYToUint8;

let getNotFlipY = () => TextureType.Not_flipy |> TextureType.isFlipYToUint8;

let getFlipYTypeArrayValue = (isFlipY: bool) =>
  isFlipY ? getFlipY() : getNotFlipY();

let getFlipYFromTypeArrayValue = (isFlipY: int) =>
  switch (isFlipY |> TextureType.uint8ToIsFlipY) {
  | TextureType.Flipy => true
  | _ => false
  };

let getDefaultFlipY = () => getFlipY();

let getIsNeedUpdateIndex = index => index * getIsNeedUpdatesSize();