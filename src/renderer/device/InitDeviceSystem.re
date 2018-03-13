/* open Dom;

open DomUtils;

external convertViewportTupleToArray : ((float, float, float, float)) => array(float) =
  "%identity";

let _getCanvasId = (domId: string) =>
  String.contains(domId, '#') ?
    domId :
    {j|#$domId|j}
    |> WonderLog.Contract.ensureCheck(
         (id) =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect={j|dom id start with '#'|j},
                     ~actual={j|is $domId|j}
                   ),
                   () => assertTrue(Js.Re.test(id, [%re "/#[^#]+/"]))
                 )
               )
             )
           ),
         StateData.stateData.isDebug
       );

let createCanvas = ({canvasId}) =>
  (
    switch canvasId {
    | None =>
      buildDom("<canvas></canvas>")
      |> prependTo(~targetElement=findFirstHtmlElement(~document, "body"))
    | Some(canvasId) =>
      switch (canvasId |> _getCanvasId |> findFirstHtmlElement(~document)) {
      | None => failwith({j|canvas whose id is $canvasId should exist|j})
      | Some(canvas) => canvas
      }
    }
  )
  |> Obj.magic;

let _convertContextConfigDataToJsObj =
    ({alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer}) => {
  "alpha": Js.Boolean.to_js_boolean(alpha),
  "depth": Js.Boolean.to_js_boolean(depth),
  "stencil": Js.Boolean.to_js_boolean(stencil),
  "antialias": Js.Boolean.to_js_boolean(antialias),
  "premultipliedAlpha": Js.Boolean.to_js_boolean(premultipliedAlpha),
  "preserveDrawingBuffer": Js.Boolean.to_js_boolean(preserveDrawingBuffer)
};

let initDevice = (config, state: StateDataType.state) =>
  WorkerDetectSystem.isSupportRenderWorkerAndSharedArrayBuffer(state) ?
    {
      let (x, y, width, height, _, _) as screenData = ViewReWoSystem.getFullScreenData();
      let canvas = createCanvas(config) |> ViewReWoSystem.setToFullScreen(screenData);
      let viewportData = (x, y, width, height);
      DeviceManagerReWoSystem.sendCreateGLData(
        canvas,
        WorkerInstanceSystem.unsafeGetRenderWorker(state),
        _convertContextConfigDataToJsObj(config.contextConfig),
        convertViewportTupleToArray(viewportData)
      );
      state
      |> DeviceManagerReWoSystem.setViewportData(viewportData)
      |> ViewReWoSystem.setCanvas(canvas)
      |> ViewReWoSystem.setContextConfig(config.contextConfig)
    } :
    {
      let canvas = createCanvas(config);
      let gl =
        canvas
        |> GlService.createGl(_convertContextConfigDataToJsObj(config.contextConfig));
      let (x, y, width, height, _, _) as screenData = ViewService.getFullScreenData();
      let canvas = canvas |> ViewService.setToFullScreen(screenData);
      let viewportData = (x, y, width, height);
      state
      |> DeviceManagerService.setGl(gl)
      |> DeviceManagerService.setViewportData(viewportData)
      |> DeviceManagerService.setViewportOfGl(gl, viewportData)
      |> ViewService.setCanvas(canvas)
      |> ViewService.setContextConfig(config.contextConfig)
      |> GPUDetectService.detect(gl)
    }; */