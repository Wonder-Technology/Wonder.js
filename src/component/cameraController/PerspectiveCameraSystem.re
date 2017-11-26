open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateUtils;

let getFovy = PerspectiveCameraOperateDataUtils.getFovy;

let setFovy = PerspectiveCameraOperateDataUtils.setFovy;

let getAspect = PerspectiveCameraOperateDataUtils.getAspect;

let setAspect = PerspectiveCameraOperateDataUtils.setAspect;

let getFar = PerspectiveCameraOperateDataUtils.getFar;

let setFar = PerspectiveCameraOperateDataUtils.setFar;

let getNear = PerspectiveCameraOperateDataUtils.getNear;

let setNear = PerspectiveCameraOperateDataUtils.setNear;

let _setPMatrix =
    (
      cameraController: cameraController,
      cameraControllerData: cameraControllerData,
      pMatrix: Js.Typed_array.Float32Array.t
    ) =>
  SparseMapSystem.set(cameraController, pMatrix, cameraControllerData.pMatrixMap);

let update = (index: int, cameraControllerData: cameraControllerData) => {
  let cameraData = getPerspectiveCameraDataFromCameraControllerData(cameraControllerData);
  switch (
    getFovy(index, cameraData),
    getAspect(index, cameraData),
    getNear(index, cameraData),
    getFar(index, cameraData)
  ) {
  /* | (None, _, _, _)
     | (_, None, _, _)
     | (_, _, None, _)
     | (_, _, _, None) => ExceptionHandleSystem.failwith "fovy,aspect,near,far should all exist" */
  | (Some(fovy), Some(aspect), Some(near), Some(far)) =>
    Matrix4System.buildPerspective(fovy, aspect, near, far)
    |> _setPMatrix(index, cameraControllerData)
    |> ignore
  | (_, _, _, _) => ExceptionHandleSystem.throwMessage("fovy,aspect,near,far should all exist")
  };
  ()
};

let init = (index: int, cameraControllerData: cameraControllerData) =>
  update(index, cameraControllerData);

let initData = () => {
  nearMap: SparseMapSystem.createEmpty(),
  farMap: SparseMapSystem.createEmpty(),
  fovyMap: SparseMapSystem.createEmpty(),
  aspectMap: SparseMapSystem.createEmpty()
};