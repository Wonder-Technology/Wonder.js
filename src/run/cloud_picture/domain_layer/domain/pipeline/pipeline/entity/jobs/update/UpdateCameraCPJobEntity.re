let create = () => JobEntity.create("update_camera");

let _updateCameraBuffer = ((position, viewMatrix, projectionMatrix)) => {
  CameraCPRepo.getCameraBufferData()
  ->OptionSt.get
  ->Result.bind(((cameraBuffer, cameraBufferData)) => {
      ListResult.mergeResults([
        TypeArrayCPRepoUtils.setFloat3(
          0,
          position->PositionVO.value,
          cameraBufferData,
        ),
        TypeArrayCPRepoUtils.setFloat32Array(
          4,
          viewMatrix->ViewMatrixVO.value,
          cameraBufferData,
        ),
        TypeArrayCPRepoUtils.setFloat32Array(
          4 + 32,
          projectionMatrix->ProjectionMatrixVO.value,
          cameraBufferData,
        ),
      ])
      ->Result.mapSuccess(() => {
          DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
            0,
            cameraBufferData,
            cameraBuffer->UniformBufferVO.value,
          );

          CameraCPRepo.setCameraBufferData(cameraBuffer, cameraBufferData);
        })
    });
};

let _updateCamera = () => {
  ActiveBasicCameraViewDoService.getActiveCameraView()
  ->OptionSt.openWithResult
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
          Tuple3.collectResult(
            UpdateTransformDoService.updateAndGetPosition(transform)
            ->Result.succeed,
            ViewMatrixBasicCameraViewDoService.getViewWorldToCameraMatrix(
              activeCameraView,
            )
            ->OptionSt.openWithResult,
            PMatrixPerspectiveCameraProjectionDoService.getPMatrix(
              cameraProjection,
            )
            ->OptionSt.get,
          )
        })
      ->Result.bind(_updateCameraBuffer)
    });
};

let exec = () => {
  UpdatePerspectiveCameraProjectionDoService.update()->WonderBsMost.Most.just;
};
