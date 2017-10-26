open CameraControllerType;

open PerspectiveCameraType;

let _getCameraControllerData (state: StateDataType.state) => state.cameraControllerData;

let _getPerspectiveCameraDataFromCameraControllerData (cameraControllerData: cameraControllerData) =>
  cameraControllerData.perspectiveCameraData;

let _getPerspectiveCameraData (state: StateDataType.state) =>
  _getPerspectiveCameraDataFromCameraControllerData (_getCameraControllerData state);

let create (state: StateDataType.state) => {
  let cameraControllerData = _getCameraControllerData state;
  let index = cameraControllerData.index;
  cameraControllerData.index = succ cameraControllerData.index;
  (state, index)
};

let getFovy (cameraController: cameraController) (cameraData: perspectiveCameraData) =>
  HashMapSystem.get (Js.Int.toString cameraController) cameraData.fovyMap;

let setFovy (cameraController: cameraController) (fovy: float) (state: StateDataType.state) => {
  HashMapSystem.set
    (Js.Int.toString cameraController) fovy (_getPerspectiveCameraData state).fovyMap
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList cameraController (_getCameraControllerData state)
  |> ignore;
  state
};

let getAspect (cameraController: cameraController) (cameraData: perspectiveCameraData) =>
  HashMapSystem.get (Js.Int.toString cameraController) cameraData.aspectMap;

let setAspect (cameraController: cameraController) (aspect: float) (state: StateDataType.state) => {
  HashMapSystem.set
    (Js.Int.toString cameraController) aspect (_getPerspectiveCameraData state).aspectMap
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList cameraController (_getCameraControllerData state)
  |> ignore;
  state
};

let getNear (cameraController: cameraController) (cameraData: perspectiveCameraData) =>
  HashMapSystem.get (Js.Int.toString cameraController) cameraData.nearMap;

let setNear (cameraController: cameraController) (near: float) (state: StateDataType.state) => {
  HashMapSystem.set
    (Js.Int.toString cameraController) near (_getPerspectiveCameraData state).nearMap
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList cameraController (_getCameraControllerData state)
  |> ignore;
  state
};

let getFar (cameraController: cameraController) (cameraData: perspectiveCameraData) =>
  HashMapSystem.get (Js.Int.toString cameraController) cameraData.farMap;

let setFar (cameraController: cameraController) (far: float) (state: StateDataType.state) => {
  HashMapSystem.set (Js.Int.toString cameraController) far (_getPerspectiveCameraData state).farMap
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList cameraController (_getCameraControllerData state)
  |> ignore;
  state
};

let getPMatrix (cameraController: cameraController) (cameraData: perspectiveCameraData) =>
  HashMapSystem.get (Js.Int.toString cameraController) cameraData.pMatrixMap;

let _setPMatrix
    cameraController::(cameraController: cameraController)
    (pMatrix: ArraySystem.t float)
    cameraData::(cameraData: perspectiveCameraData) =>
  HashMapSystem.set (Js.Int.toString cameraController) pMatrix cameraData.pMatrixMap;

let update (index: int) (cameraControllerData: cameraControllerData) => {
  let cameraData = _getPerspectiveCameraDataFromCameraControllerData cameraControllerData;
  switch (
    getFovy index cameraData,
    getAspect index cameraData,
    getNear index cameraData,
    getFar index cameraData
  ) {
  /* | (None, _, _, _)
     | (_, None, _, _)
     | (_, _, None, _)
     | (_, _, _, None) => ExceptionHandlerSystem.failwith "fovy,aspect,near,far should all exist" */
  | (Some fovy, Some aspect, Some near, Some far) =>
    Matrix4System.buildPerspective fovy aspect near far
    |> _setPMatrix cameraController::index ::cameraData
    |> ignore
  | (_, _, _, _) => ExceptionHandlerSystem.throwMessage "fovy,aspect,near,far should all exist"
  };
  ()
};


let init (index: int) (cameraControllerData: cameraControllerData) =>
  update index cameraControllerData;

let initData () => {
  nearMap: HashMapSystem.createEmpty (),
  farMap: HashMapSystem.createEmpty (),
  fovyMap: HashMapSystem.createEmpty (),
  aspectMap: HashMapSystem.createEmpty (),
  pMatrixMap: HashMapSystem.createEmpty ()
};