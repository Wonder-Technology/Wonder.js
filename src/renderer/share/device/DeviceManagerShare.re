/* open RenderWorkerStateShareType; */
/* let setViewportData = ((x, y, width, height), state) => {
     ...state,
     deviceManagerData: {...state.deviceManagerData, viewport: Some((x, y, width, height))}
   }; */
/*

 let createGL = (contextConfig, canvas) =>
   ViewShare.getContext(canvas, contextConfig); */
let setViewportOfGl = (gl, oldViewport, (x, y, width, height), state) =>
  switch oldViewport {
  | Some((oldX, oldY, oldWidth, oldHeight))
      when oldX === x && oldY === y && oldWidth === width && oldHeight === height => state
  | _ =>
    Gl.viewport(x, y, width, height, gl);
    state
  };

let createGL = (canvas, contextConfig: ContextShareType.contextConfigJsObj) =>
  ViewShare.getContext(canvas, contextConfig);