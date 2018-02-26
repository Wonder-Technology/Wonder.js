open RenderWorkerType;

let _getDeviceManagerData = (state: RenderWorkerStateDataType.renderWorkerState) =>
  state.deviceManagerData;

let sendCreateGLData =
    (
      canvas,
      renderWorker,
      contextConfig: ContextShareType.contextConfigJsObj,
      viewportData: array(float)
    ) => {
  let offscreen = canvas##transferControlToOffscreen();
  renderWorker
  |> Worker.postMessageWithTransferData(
       {
         "operateType": INIT_GL,
         "canvas": offscreen,
         /* TODO why can't use tToJs? */
         "contextConfig": contextConfig,
         "viewportData": viewportData
       },
       [|offscreen|]
     )
};

let setViewportData = ((x, y, width, height), state: StateDataType.state) => {
  ...state,
  deviceManagerData: {...state.deviceManagerData, viewport: Some((x, y, width, height))}
};

let setViewportOfGl = (gl, newViewportData, state: RenderWorkerStateDataType.renderWorkerState) =>
  DeviceManagerShare.setViewportOfGl(
    gl,
    _getDeviceManagerData(state).viewport,
    newViewportData,
    state
  );

let createGl = (contextConfig: ContextShareType.contextConfigJsObj, canvas) =>
  DeviceManagerShare.createGl(canvas, contextConfig);