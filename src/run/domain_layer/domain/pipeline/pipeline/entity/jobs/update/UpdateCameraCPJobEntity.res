let create = () => JobEntity.create("update_camera")

let _updateCameraBuffer = ((viewInverse, projectionInverse, near, far)) =>
  CameraCPRepo.getCameraBufferData()
  ->OptionSt.get
  ->Result.bind(((cameraBuffer, cameraBufferData)) =>
    ListResult.mergeResults(list{
      TypeArrayCPRepoUtils.setFloat16WithFloat32Array(0, viewInverse, cameraBufferData),
      TypeArrayCPRepoUtils.setFloat16WithFloat32Array(16, projectionInverse, cameraBufferData),
      TypeArrayCPRepoUtils.setFloat2(16 + 16, (near, far), cameraBufferData),
    })->Result.mapSuccess(() => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
        0,
        cameraBufferData,
        cameraBuffer->UniformBufferVO.value,
      )

      CameraCPRepo.setCameraBufferData((cameraBuffer, cameraBufferData))
    })
  )

let _updateCamera = () =>
  BasicCameraViewRunAPI.getActiveBasicCameraView(SceneRunAPI.getSceneGameObject())
  ->OptionSt.get
  ->Result.bind(activeCameraView =>
    activeCameraView
    ->BasicCameraViewRunAPI.getGameObject
    ->GameObjectRunAPI.getPerspectiveCameraProjection
    ->OptionSt.get
    ->Result.bind(cameraProjection =>
      Tuple2.collectResult(
        Matrix4.createIdentityMatrix4()->Matrix4.invert(
          BasicCameraViewRunAPI.getViewWorldToCameraMatrix(activeCameraView)->ViewMatrixVO.value,
        ),
        Matrix4.createIdentityMatrix4()->Matrix4.invert(
          PerspectiveCameraProjectionRunAPI.getPMatrix(cameraProjection)->ProjectionMatrixVO.value,
        ),
      )->Result.bind(((viewInverse, projectionInverse)) =>
        _updateCameraBuffer((
          viewInverse,
          projectionInverse,
          PerspectiveCameraProjectionRunAPI.getNear(cameraProjection)->NearVO.value,
          PerspectiveCameraProjectionRunAPI.getFar(cameraProjection)->FarVO.value,
        ))
      )
    )
  )

let exec = () => _updateCamera()->WonderBsMost.Most.just
