let updateCameraProjection = cameraProjection => {
  {
    switch (
      FrustumPerspectiveCameraProjectionDoService.getAspect(cameraProjection)
    ) {
    | None =>
      PictureCPDoService.getSize()
      ->OptionSt.get
      ->Result.mapSuccess(size =>
          size->FrustumPerspectiveCameraProjectionDoService.computeAspect
        )

    | Some(aspect) => aspect->Result.succeed
    };
  }
  ->Result.bind(aspect => {
      switch (
        FrustumPerspectiveCameraProjectionDoService.getFovy(cameraProjection),
        FrustumPerspectiveCameraProjectionDoService.getNear(cameraProjection),
        FrustumPerspectiveCameraProjectionDoService.getFar(cameraProjection),
      ) {
      | (Some(fovy), Some(near), Some(far)) =>
        Matrix4.createIdentityMatrix4()
        ->Matrix4.buildPerspective((
            fovy->FovyVO.value,
            aspect->AspectVO.value,
            near->NearVO.value,
            far->FarVO.value,
          ))
        ->Result.mapSuccess(pMatrix => {
            pMatrix
            ->PerspectiveMatrixVO.create
            ->PMatrixPerspectiveCameraProjectionDoService.setPMatrix(
                cameraProjection,
                _,
              )
          })
      | (_, _, _) =>
        Log.buildFatalMessage(
          ~title="update",
          ~description={j|fovy,near,far should all exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|cameraProjection: $cameraProjection|j},
        )
        ->Result.failWith
      }
    });
};

let update = () => {
  DirtyPerspectiveCameraProjectionDoService.getUniqueDirtyList()
  ->ListSt.traverseResultM(cameraProjection => {
      updateCameraProjection(cameraProjection)
    })
  ->Result.mapSuccess(_ => {
      DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().clearDirtyList();

      ();
    });
};
