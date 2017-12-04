open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateSystem;

let getFovy = PerspectiveCameraOperateDataSystem.getFovy;

let setFovy = PerspectiveCameraOperateDataSystem.setFovy;

let getAspect = PerspectiveCameraOperateDataSystem.getAspect;

let setAspect = PerspectiveCameraOperateDataSystem.setAspect;

let getFar = PerspectiveCameraOperateDataSystem.getFar;

let setFar = PerspectiveCameraOperateDataSystem.setFar;

let getNear = PerspectiveCameraOperateDataSystem.getNear;

let setNear = PerspectiveCameraOperateDataSystem.setNear;

let _setPMatrix =
    (
      cameraController: cameraController,
      cameraControllerData: cameraControllerData,
      pMatrix: Js.Typed_array.Float32Array.t
    ) =>
  WonderCommonlib.SparseMapSystem.set(cameraController, pMatrix, cameraControllerData.pMatrixMap);

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
  nearMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  farMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  fovyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aspectMap: WonderCommonlib.SparseMapSystem.createEmpty()
};