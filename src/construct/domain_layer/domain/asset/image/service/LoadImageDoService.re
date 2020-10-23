open WonderBsMost.Most;

let loadImages = imageDataList => {
  imageDataList
  ->ListSt.traverseResultM(((id, path)) => {
      DpContainer.unsafeGetNetworkDp().readImageFile(path)
      ->Result.mapSuccess(stream => {
          stream->map(
                    imageData => {
                      OperateImageDoService.setData(
                        id->ImageIdVO.value,
                        imageData,
                      )
                    },
                    _,
                  )
        })
    })
  ->Result.mapSuccess(streamList => {streamList->ListSt.toArray->mergeArray});
};
