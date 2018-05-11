open StateDataMainType;

open OperateSettingService;

open MemorySettingService;

open Sinon;

open DomTool;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = (sandbox) => {
  "viewport": createEmptyStub(refJsObjToSandbox(sandbox^)),
  "getParameter": createEmptyStub(refJsObjToSandbox(sandbox^)),
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
  let createElementStub =
    createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "createElement");
  createElementStub |> withOneArg("div") |> returns(div) |> ignore;
  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;
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
      ~customGeometryPointDataBufferCount=300,
      ~customGeometryDataBufferCount=30,
      ~transformDataBufferCount=50,
      ~basicMaterialDataBufferCount=50,
      ~lightMaterialDataBufferCount=50,
      ~textureCountPerMaterial=3,
      ~textureDataBufferCount=50,
      ~sourceInstanceCount=2,
      ~objectInstanceCountPerSourceInstance=100,
      ()
    ) => {j|
       {
            "custom_geometry_point_data_buffer_count": $customGeometryPointDataBufferCount,
            "custom_geometry_data_buffer_count": $customGeometryDataBufferCount,
  "transform_data_buffer_count": $transformDataBufferCount,
  "basic_material_data_buffer_count": $basicMaterialDataBufferCount,
  "light_material_data_buffer_count": $lightMaterialDataBufferCount,
  "texture_data_buffer_count": $textureDataBufferCount,
  "texture_count_per_material": $textureCountPerMaterial,

  "instanceBuffer": {
    "sourceInstance_count": $sourceInstanceCount,
"objectInstance_count_per_source_instance": $objectInstanceCountPerSourceInstance
  }
       }
        |j};

let setToStateData = (state, isDebug, canvasId, context, useHardwareInstance, useWorker, buffer) => {
  let stateData = MainStateTool.getStateData();
  ParseSettingService.convertToRecord(
    buildSetting(isDebug, canvasId, buffer, context, useHardwareInstance, useWorker)
    |> Js.Json.parseExn
  )
  |> ConfigDataLoaderSystem._setSetting(stateData, state)
  |> ConfigDataLoaderSystem._createRecordWithState
  |> MainStateTool.setState
};

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
    ) =>
  setToStateData(
    CreateStateMainService.createState(),
    isDebug,
    canvasId,
    context,
    useHardwareInstance,
    useWorker,
    buffer
  );

let setMemory = (state: StateDataMainType.state, ~maxDisposeCount=1000, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    memory: Some({...OperateSettingService.unsafeGetMemory(state.settingRecord), maxDisposeCount})
  }
};

let setBufferSize = (state: StateDataMainType.state, ~customGeometryPointDataBufferCount=100, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    buffer:
      Some({
        ...BufferSettingService.unsafeGetBuffer(state.settingRecord),
        customGeometryPointDataBufferCount
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

let setUseWorker = (isUseWorker, state) => {
  ...state,
  settingRecord: {...state.settingRecord, worker: Some({useWorker: isUseWorker})}
};