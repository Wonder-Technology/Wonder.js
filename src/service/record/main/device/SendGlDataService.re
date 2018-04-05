open RenderWorkerType;

let sendCreateGLData =
    (
      canvas,
      renderWorker,
      contextConfig: ContextType.contextConfigJsObj,
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