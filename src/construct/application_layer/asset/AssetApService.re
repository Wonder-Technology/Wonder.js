let loadImages = imageDataList => {
  LoadImageDoService.loadImages(
    imageDataList->ListSt.map(((id, path)) => {
      (id->ImageIdVO.create, path)
    }),
  );
};
