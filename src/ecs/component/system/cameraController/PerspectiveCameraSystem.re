open CameraControllerType;

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

/* let setDefaultPMatrix =
       (cameraController: cameraController, cameraControllerData: cameraControllerData) => {
     ...cameraControllerData,
     pMatrixMap:
       WonderCommonlib.SparseMapSystem.set(
         cameraController,
         Matrix4System.createIdentityMatrix4(),
         cameraControllerData.pMatrixMap
       )
   }; */
let setDefaultPMatrix = (cameraController: cameraController, pMatrixMap) =>
  WonderCommonlib.SparseMapSystem.set(
    cameraController,
    Matrix4System.createIdentityMatrix4(),
    pMatrixMap
  );

let _unsafeGetPMatrix =
    (cameraController: cameraController, cameraControllerData: cameraControllerData) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(cameraController, cameraControllerData.pMatrixMap)
  |> WonderLog.Contract.ensureCheck(
       (pMatrix) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|pMatrix exist|j}, ~actual={j|not|j}),
                 () => pMatrix |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
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
    |> ignore;
    cameraControllerData
  | (_, _, _, _) =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="update",
        ~description={j|fovy,aspect,near,far should all exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|cameraController: $index|j}
      )
    );
    cameraControllerData
  }
};

let init = (index: int, cameraControllerData: cameraControllerData) =>
  update(index, cameraControllerData);