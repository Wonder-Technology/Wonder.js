open RenderWorkerType;

/* open RenderWorkerStateDataType; */

open MessageDataType;

/* TODO refactor */

/* let _getDeviceManagerData = (state) => state.deviceManagerData; */

let sendCreateGLData = (canvas, renderWorker, contextConfig:contextConfigJsObj, viewportData:array(float)) => {
  let offscreen = canvas##transferControlToOffscreen();
  renderWorker |> 
  Worker.postMessageWithTransformData(
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

let setViewportData = ((x, y, width, height), state:StateDataType.state) => {
  ...state,
  deviceManagerData: {...state.deviceManagerData, viewport: Some((x, y, width, height))}
};

let setViewportOfGl = (gl, (x, y, width, height), state: RenderWorkerStateDataType.renderWorkerState) => {
  /* let {viewport} = _getDeviceManagerData(state); */
  /* switch viewport {
     | Some((oldX, oldY, oldWidth, oldHeight))
         when oldX === x && oldY === y && oldWidth === width && oldHeight === height => state
     | _ => */
  Gl.viewport(x, y, width, height, gl);
  state
};

let createGL = (contextConfig:contextConfigJsObj, canvas) =>
  ViewReWoSystem.getContext(canvas, contextConfig);