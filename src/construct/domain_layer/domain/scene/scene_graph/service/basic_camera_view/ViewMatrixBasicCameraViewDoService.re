let getViewWorldToCameraMatrix = cameraView => {
  GameObjectBasicCameraViewDoService.getGameObject(cameraView)
  ->OptionSt.map(gameObject => {
      GetComponentGameObjectDoService.getTransform(gameObject)
      ->OptionSt.map(transform => {
          Matrix4.createIdentityMatrix4()
          ->LocalToWorldMatrixVO.invert(
              ModelMatrixTransformDoService.getLocalToWorldMatrix(transform),
            )
          ->Result.mapSuccess(mat => {mat->ViewMatrixVO.create})
        })
    })
  ->OptionSt.open_
  ->OptionSt.sequenceResultM;
};
