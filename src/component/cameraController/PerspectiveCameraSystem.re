open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateUtils;

open CameraControllerDirtySystem;

let getFovy = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController), cameraData.fovyMap);

let setFovy = (cameraController: cameraController, fovy: float, state: StateDataType.state) => {
  WonderCommonlib.HashMapSystem.set(
    Js.Int.toString(cameraController),
    fovy,
    getPerspectiveCameraData(state).fovyMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getAspect = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController), cameraData.aspectMap);

let setAspect = (cameraController: cameraController, aspect: float, state: StateDataType.state) => {
  WonderCommonlib.HashMapSystem.set(
    Js.Int.toString(cameraController),
    aspect,
    getPerspectiveCameraData(state).aspectMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getNear = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController), cameraData.nearMap);

let setNear = (cameraController: cameraController, near: float, state: StateDataType.state) => {
  WonderCommonlib.HashMapSystem.set(
    Js.Int.toString(cameraController),
    near,
    getPerspectiveCameraData(state).nearMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getFar = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.HashMapSystem.get(Js.Int.toString(cameraController), cameraData.farMap);

let setFar = (cameraController: cameraController, far: float, state: StateDataType.state) => {
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(cameraController), far, getPerspectiveCameraData(state).farMap)
  |> ignore;
  CameraControllerDirtySystem.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let _setPMatrix =
    (
      cameraController: cameraController,
      cameraControllerData: cameraControllerData,
      pMatrix: Js.Typed_array.Float32Array.t
    ) =>
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(cameraController), pMatrix, cameraControllerData.pMatrixMap);

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
  nearMap: WonderCommonlib.HashMapSystem.createEmpty(),
  farMap: WonderCommonlib.HashMapSystem.createEmpty(),
  fovyMap: WonderCommonlib.HashMapSystem.createEmpty(),
  aspectMap: WonderCommonlib.HashMapSystem.createEmpty()
};
