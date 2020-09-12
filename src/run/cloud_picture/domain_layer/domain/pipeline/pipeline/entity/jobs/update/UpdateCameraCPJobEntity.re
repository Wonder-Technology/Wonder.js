let create = () => JobEntity.create("update_camera");

let _updateCameraBuffer = ((viewInverse, projectionInverse, near, far)) => {
  CameraCPRepo.getCameraBufferData()
  ->OptionSt.get
  ->Result.bind(((cameraBuffer, cameraBufferData)) => {
      ListResult.mergeResults([
        TypeArrayCPRepoUtils.setFloat16WithFloat32Array(
          0,
          viewInverse,
          cameraBufferData,
        ),
        TypeArrayCPRepoUtils.setFloat16WithFloat32Array(
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
          WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
            0,
            cameraBufferData,
            cameraBuffer->UniformBufferVO.value,
          );

          CameraCPRepo.setCameraBufferData((cameraBuffer, cameraBufferData));
        })
    });
};

let _updateCamera = () => {
  BasicCameraViewRunAPI.getActiveBasicCameraView()
  ->ResultOption.openInverseSucceedWithNone(activeCameraView => {
      activeCameraView
      ->BasicCameraViewRunAPI.getGameObject
      ->OptionSt.get
      ->Result.bind(gameObject => {
          Tuple2.collectOption(
            GameObjectRunAPI.getTransform(gameObject),
            GameObjectRunAPI.getPerspectiveCameraProjection(gameObject),
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
  ListResult.mergeResults([
    PerspectiveCameraProjectionRunAPI.update(),
    _updateCamera(),
  ])
  ->WonderBsMost.Most.just;
};
