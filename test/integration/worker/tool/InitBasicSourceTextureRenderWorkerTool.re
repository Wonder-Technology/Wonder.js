open Sinon;

let _buildFakeContext = (sandbox, imageDataArrayBuffer1, imageDataArrayBuffer2) => {
  let getImageData =
    createEmptyStubWithJsObjSandbox(sandbox)
    |> onCall(0)
    |> returns({"data": {"buffer": imageDataArrayBuffer1}})
    |> onCall(1)
    |> returns({"data": {"buffer": imageDataArrayBuffer2}});
  {"drawImage": createEmptyStubWithJsObjSandbox(sandbox), "getImageData": getImageData}
};

let _buildFakeCanvas = (sandbox, context) =>
  {
    "width": 0.,
    "height": 0.,
    "style": {"left": "", "top": "", "width": "", "height": "", "position": "static"},
    "getContext": createEmptyStubWithJsObjSandbox(sandbox) |> returns(context)
  }
  |> SettingWorkerTool.addTransferControlToOffscreen;

let prepareState = (sandbox, imageDataArrayBuffer1, imageDataArrayBuffer2) => {
  let context = _buildFakeContext(sandbox, imageDataArrayBuffer1, imageDataArrayBuffer2);
  let canvas =
    SettingWorkerTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(sandbox, context)
    );
  let state =
    TestMainWorkerTool.initWithJobConfig(
      ~sandbox,
      ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
      ()
    );
  (state, context)
};