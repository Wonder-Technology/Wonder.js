open RenderDataType;

/* let setToStateRenderData = (flags:jobFlags, state: StateDataType.state, setFunc) => setFunc(flags, state); */
let getCameraData = (state: StateDataType.state) => {
  let currentCameraController = CameraControllerSystem.getCurrentCameraController(state);
  /* todo optimize: remove CameraController->worldToCameraMatrixCacheMap? */
  {
    vMatrix: CameraControllerSystem.getWorldToCameraMatrix(currentCameraController, state),
    pMatrix: CameraControllerSystem.getPMatrix(currentCameraController, state)
  }
};

let _getRenderData = (state: StateDataType.state) => state.renderData;

let _getCameraData = (state: StateDataType.state) => Js.Option.getExn(state.renderData.cameraData);

let getCameraVMatrixDataFromState = (state: StateDataType.state) => _getCameraData(state).vMatrix;

let getCameraPMatrixDataFromState = (state: StateDataType.state) => _getCameraData(state).pMatrix;

let getRenderListFromState = (state: StateDataType.state) =>
  Js.Option.getExn(state.renderData.renderList);