open MainStateDataType;

open OperateSettingService;

open MemorySettingService;

open Sinon;

open DomTool;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = (sandbox) => {
  "VERTEX_SHADER": 0,
  "FRAGMENT_SHADER": 1,
  "HIGH_FLOAT": 2,
  "MEDIUM_FLOAT": 3,
  "viewport": createEmptyStub(refJsObjToSandbox(sandbox^)),
  "getShaderPrecisionFormat":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns({"precision": 1}),
  "getExtension": createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(0))
};

let buildFakeCanvas = (id, gl, sandbox) => {
  "id": id,
  "nodeType": 1,
  "style": {"left": "", "top": "", "width": "", "height": "", "position": "static"},
  "width": 0.,
  "height": 0.,
  "getContext": createGetContextStub(gl, sandbox)
};

let buildFakeDomForNotPassCanvasId = (sandbox) => {
  let fakeGl = buildFakeGl(sandbox);
  let canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  let div = {"innerHTML": "", "firstChild": canvasDom};
  let body = {"prepend": createEmptyStub(refJsObjToSandbox(sandbox^)), "style": {"cssText": ""}};
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "createElement")
  |> withOneArg("div")
  |> returns(div)
  |> ignore;
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "querySelectorAll")
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  (canvasDom, fakeGl, div, body)
};

let buildSetting = (isDebug, canvasId, buffer, context, useHardwareInstance, useWorker) =>
  switch canvasId {
  | None => {j|
 {
    "is_debug": $isDebug,
    "context": $context,
    "buffer": $buffer,
    "gpu": {
        "use_hardware_instance": $useHardwareInstance
    },
    "worker": {
        "use_worker": $useWorker
    }
}
        |j}
  | Some(canvasId) => {j|
 {
    "is_debug": $isDebug,
    "canvas_id": "$canvasId",
    "context": $context,
    "buffer": $buffer,
    "gpu": {
        "use_hardware_instance": $useHardwareInstance
    },
    "worker": {
        "use_worker": $useWorker
    }
}
        |j}
  };

let buildBufferConfigStr =
    (
      ~geometryPointDataBufferCount=300,
      ~transformDataBufferCount=50,
      ~basicMaterialDataBufferCount=50,
      ~lightMaterialDataBufferCount=50,
      ()
    ) => {j|
       {
            "geometryPointDataBufferCount": $geometryPointDataBufferCount,
  "transformDataBufferCount": $transformDataBufferCount,
  "basicMaterialDataBufferCount": $basicMaterialDataBufferCount,
  "lightMaterialDataBufferCount": $lightMaterialDataBufferCount

       }
        |j};

let createStateAndSetToStateData =
    (
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
      ~buffer=buildBufferConfigStr(),
      ()
    ) => {
  let stateData = MainStateTool.getStateData();
  ParseSettingService.convertToRecord(
    buildSetting(isDebug, canvasId, buffer, context, useHardwareInstance, useWorker)
    |> Js.Json.parseExn
  )
  |> ConfigDataLoaderSystem._setSetting(stateData, CreateStateMainService.createState())
  |> RecordTransformMainService.create
  |> MainStateTool.setState
};

let setMemory = (state: MainStateDataType.state, ~maxDisposeCount=1000, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    memory: Some({...OperateSettingService.unsafeGetMemory(state.settingRecord), maxDisposeCount})
  }
};

let setBufferSize =
    (
      state: MainStateDataType.state,
      ~geometryPointDataBufferCount=100,
      ~transformDataBufferCount=100,
      ~basicMaterialDataBufferCount=100,
      ~lightMaterialDataBufferCount=100,
      ()
    ) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    buffer:
      Some({
        ...BufferSettingService.unsafeGetBuffer(state.settingRecord),
        geometryPointDataBufferCount
      })
  }
};

let unsafeGetGPU = (state) => state.settingRecord |> OperateSettingService.unsafeGetGPU;

let setGPU = (config, state) => {
  ...state,
  settingRecord: {...state.settingRecord, gpu: Some(config)}
};

let setGPU = (config, state) => {
  ...state,
  settingRecord: {...state.settingRecord, gpu: Some(config)}
};

/* let buildBufferConfig = (count) => {"geometryPointDataBufferCount": Js.Nullable.return(count)}; */