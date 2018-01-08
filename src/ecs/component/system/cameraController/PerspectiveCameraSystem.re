open CameraControllerType;

open Contract;

open PerspectiveCameraType;

open CameraControllerStateCommon;

let getFovy = PerspectiveCameraOperateCommon.getFovy;

let setFovy = PerspectiveCameraOperateCommon.setFovy;

let getAspect = PerspectiveCameraOperateCommon.getAspect;

let setAspect = PerspectiveCameraOperateCommon.setAspect;

let getFar = PerspectiveCameraOperateCommon.getFar;

let setFar = PerspectiveCameraOperateCommon.setFar;

let getNear = PerspectiveCameraOperateCommon.getNear;

let setNear = PerspectiveCameraOperateCommon.setNear;

let setDefaultPMatrix =
    (cameraController: cameraController, cameraControllerData: cameraControllerData) => {
  WonderCommonlib.SparseMapSystem.set(
    cameraController,
    Matrix4System.createIdentityMatrix4(),
    cameraControllerData.pMatrixMap
  );
  cameraControllerData
};

let _unsafeGetPMatrix =
    (cameraController: cameraController, cameraControllerData: cameraControllerData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(cameraController, cameraControllerData.pMatrixMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "pMatrix should exist",
             () =>
               WonderCommonlib.SparseMapSystem.get(
                 cameraController,
                 cameraControllerData.pMatrixMap
               )
               |> assertExist
           )
         )
     );

/* let _setPMatrix =
     (
       cameraController: cameraController,
       cameraControllerData: cameraControllerData,
       pMatrix: Js.Typed_array.Float32Array.t
     ) =>
   WonderCommonlib.SparseMapSystem.set(cameraController, pMatrix, cameraControllerData.pMatrixMap); */
let update = (index: int, cameraControllerData: cameraControllerData) => {
  let cameraData = getPerspectiveCameraDataFromCameraControllerData(cameraControllerData);
  switch (
    getFovy(index, cameraData),
    getAspect(index, cameraData),
    getNear(index, cameraData),
    getFar(index, cameraData)
  ) {
  | (Some(fovy), Some(aspect), Some(near), Some(far)) =>
    Matrix4System.buildPerspective(
      (fovy, aspect, near, far),
      _unsafeGetPMatrix(index, cameraControllerData)
    )
    |> ignore
  | (_, _, _, _) => ExceptionHandleSystem.throwMessage("fovy,aspect,near,far should all exist")
  };
  ()
};

let init = (index: int, cameraControllerData: cameraControllerData) =>
  update(index, cameraControllerData);