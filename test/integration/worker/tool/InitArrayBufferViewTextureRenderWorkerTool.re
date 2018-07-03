open Sinon;

let _buildFakeCanvas = (sandbox) =>
  {
    "width": 0.,
    "height": 0.,
    "style": {"left": "", "top": "", "width": "", "height": "", "position": "static"}
  }
  |> SettingWorkerTool.addTransferControlToOffscreen;

let prepareState = (sandbox) => {
  let canvas =
    SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(sandbox)
    );
  let state =
    TestMainWorkerTool.initWithJobConfig(
      ~sandbox,
      ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
      ()
    );
  state
};