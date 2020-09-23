let loadImages = imageDataList => {
  LoadImageDoService.loadImages(
    imageDataList->ListSt.map(((id, path)) => {
      (id->ImageIdVO.create, path)
    }),
  );
};

let getImageData = id => {
  OperateImageDoService.getData(id);
};
