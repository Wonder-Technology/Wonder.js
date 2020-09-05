let create = () => JobEntity.create("update_camera");

let _updateCameraBuffer = ((viewInverse, projectionInverse, near, far)) => {
  CameraCPRepo.getCameraBufferData()
  ->OptionSt.get
  ->Result.bind(((cameraBuffer, cameraBufferData)) => {
      ListResult.mergeResults([
        TypeArrayCPRepoUtils.setFloat32Array(
          0,
          viewInverse,
          cameraBufferData,
        ),
        TypeArrayCPRepoUtils.setFloat32Array(
          16,
          projectionInverse,
          cameraBufferData,
        ),
        TypeArrayCPRepoUtils.setFloat2(
          16 + 16,
          (near, far),
          cameraBufferData,
        ),
      ])
      ->Result.mapSuccess(() => {
          DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
            0,
            cameraBufferData,
            cameraBuffer->UniformBufferVO.value,
          );

          CameraCPRepo.setCameraBufferData((cameraBuffer, cameraBufferData));
        })
    });
};

let _updateCamera = () => {
  ActiveBasicCameraViewDoService.getActiveCameraView()
  ->ResultOption.openInverse
  ->Result.bind(activeCameraView => {
      activeCameraView
      ->GameObjectBasicCameraViewDoService.getGameObject
      ->OptionSt.get
      ->Result.bind(gameObject => {
          Tuple2.collectOption(
            GetComponentGameObjectDoService.getTransform(gameObject),
            GetComponentGameObjectDoService.getPerspectiveCameraProjection(
              gameObject,
            ),
          )
        })
      ->Result.bind(((transform, cameraProjection)) => {
          Tuple4.collectResult(
            BasicCameraViewRunAPI.getViewWorldToCameraMatrix(activeCameraView)
            ->ResultOption.openInverse
            ->Result.bind(viewMatrix => {
                Matrix4.createIdentityMatrix4()
                ->Matrix4.invert(viewMatrix->ViewMatrixVO.value)
              }),
            PerspectiveCameraProjectionRunAPI.getPMatrix(cameraProjection)
            ->OptionSt.get
            ->Result.bind(projectionMatrix => {
                Matrix4.createIdentityMatrix4()
                ->Matrix4.invert(projectionMatrix->ProjectionMatrixVO.value)
              }),
            PerspectiveCameraProjectionRunAPI.getNear(cameraProjection)
            ->OptionSt.get
            ->Result.mapSuccess(NearVO.value),
            PerspectiveCameraProjectionRunAPI.getFar(cameraProjection)
            ->OptionSt.get
            ->Result.mapSuccess(FarVO.value),
          )
        })
      ->Result.bind(((viewInverse, projectionInverse, near, far)) =>
          _updateCameraBuffer((viewInverse, projectionInverse, near, far))
        )
    });
};

let exec = () => {
  UpdatePerspectiveCameraProjectionDoService.update()->WonderBsMost.Most.just;
};
