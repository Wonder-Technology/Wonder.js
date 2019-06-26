open Sinon;

let _buildFakeContext =
    (
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
        imageDataArrayBuffer5,
        imageDataArrayBuffer6,
        imageDataArrayBuffer7,
        imageDataArrayBuffer8,
        imageDataArrayBuffer9,
        imageDataArrayBuffer10,
        imageDataArrayBuffer11,
        imageDataArrayBuffer12,
      ),
    ) => {
  let getImageData =
    createEmptyStubWithJsObjSandbox(sandbox)
    |> onCall(0)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer1,
         },
       })
    |> onCall(1)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer2,
         },
       })
    |> onCall(2)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer3,
         },
       })
    |> onCall(3)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer4,
         },
       })
    |> onCall(4)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer5,
         },
       })
    |> onCall(5)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer6,
         },
       })
    |> onCall(6)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer7,
         },
       })
    |> onCall(7)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer8,
         },
       })
    |> onCall(8)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer9,
         },
       })
    |> onCall(9)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer10,
         },
       })
    |> onCall(10)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer11,
         },
       })
    |> onCall(11)
    |> returns({
         "data": {
           "buffer": imageDataArrayBuffer12,
         },
       });

  {
    "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
    "getImageData": getImageData,
  };
};

let _buildFakeCanvas = (sandbox, context) =>
  {
    "width": 0.,
    "height": 0.,
    "style": {
      "left": "",
      "top": "",
      "width": "",
      "height": "",
      "position": "static",
    },
    "getContext":
      createEmptyStubWithJsObjSandbox(sandbox) |> returns(context),
  }
  |> SettingWorkerTool.addTransferControlToOffscreen;

let prepareState =
    (
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
        imageDataArrayBuffer5,
        imageDataArrayBuffer6,
        imageDataArrayBuffer7,
        imageDataArrayBuffer8,
        imageDataArrayBuffer9,
        imageDataArrayBuffer10,
        imageDataArrayBuffer11,
        imageDataArrayBuffer12,
      ),
    ) => {
  let context =
    _buildFakeContext(
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
        imageDataArrayBuffer5,
        imageDataArrayBuffer6,
        imageDataArrayBuffer7,
        imageDataArrayBuffer8,
        imageDataArrayBuffer9,
        imageDataArrayBuffer10,
        imageDataArrayBuffer11,
        imageDataArrayBuffer12,
      ),
    );
  let canvas =
    SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(sandbox, context),
    );
  let state =
    TestMainWorkerTool.initWithJobConfig(
      ~sandbox,
      ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
      (),
    );

  (state, context);
};