open Sinon;

open DomTool;

let addTransferControlToOffscreen = [%bs.raw
  {|
  function(canvas) {
    if(canvas.transferControlToOffscreen === undefined){
      canvas.transferControlToOffscreen = function(){
        return canvas
      };
    }

    return canvas;
  }
  |}
];

let buildFakeCanvas = () =>
  DomService.buildCanvas(.) |> addTransferControlToOffscreen;

let buildFakeCanvasForNotPassCanvasId = sandbox =>
  SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
    sandbox,
    buildFakeCanvas(),
  );

let createStateAndSetToStateData =
    (
      ~state=CreateStateMainService.createState(),
      ~isDebug="true",
      ~canvasId=None,
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~useHardwareInstance="false",
      ~useWorker="false",
      ~buffer=SettingTool.buildBufferConfigStr(),
      (),
    ) =>
  SettingTool.setToStateData(
    state,
    isDebug,
    canvasId,
    context,
    useHardwareInstance,
    useWorker,
    buffer,
  );

let setMemory = SettingTool.setMemory;