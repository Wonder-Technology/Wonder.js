external convertViewportArrayToTuple : array(float) => (float, float, float, float) = "%identity";

let initGl = (data, renderWorkerState) => {
  /* let gl = GlService.createGl(record##contextConfig, record##canvas);
     WonderLog.Log.print(("gl: ", gl)) |> ignore;
     renderWorkerState
     |> DeviceManagerReWoSystem.setViewportOfGl(gl, convertViewportArrayToTuple(record##viewportData))
     |> GPUDetectReWoSystem.detect(gl) */
  WonderLog.Log.print(("init gl data: ", data)) |> ignore;
  renderWorkerState
};
/*
 var _createGl = curry((canvas: HTMLCanvasElement, ContextType.contextConfigJsObj: ContextConfigOptionsData, WebGLDetectWorkerData: any, DeviceManagerWorkerData: any, state: Map<any, any>) => {
     return IO.of(() => {
         var gl = getOnlyGl(canvas, ContextType.contextConfigJsObj, WebGLDetectWorkerData);

         if (!gl) {
             DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
         }

         return compose(setCanvas(canvas), setContextConfig(ContextType.contextConfigJsObj), setGL(gl, DeviceManagerWorkerData))(state);
     });
 })
  */