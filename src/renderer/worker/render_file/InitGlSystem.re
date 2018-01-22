external convertViewportArrayToTuple : array(float) => (float, float, float, float) = "%identity";

let initGl = (data, renderWorkerState) => {
  let gl = DeviceManagerReWoSystem.createGl(data##contextConfig, data##canvas);
  WonderLog.Log.print(("gl: ", gl)) |> ignore;
  renderWorkerState
  |> DeviceManagerReWoSystem.setViewportOfGl(gl, convertViewportArrayToTuple(data##viewportData))
  |> GPUDetectReWoSystem.detect(gl)
};
/*
 var _createGl = curry((canvas: HTMLCanvasElement, options: ContextConfigOptionsData, WebGLDetectWorkerData: any, DeviceManagerWorkerData: any, state: Map<any, any>) => {
     return IO.of(() => {
         var gl = getOnlyGl(canvas, options, WebGLDetectWorkerData);

         if (!gl) {
             DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
         }

         return compose(setCanvas(canvas), setContextConfig(options), setGL(gl, DeviceManagerWorkerData))(state);
     });
 })
  */