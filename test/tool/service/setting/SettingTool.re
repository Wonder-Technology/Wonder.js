open StateDataMainType;

open OperateSettingService;

open MemorySettingService;

open Sinon;

open DomTool;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = sandbox => {
  "viewport": createEmptyStub(refJsObjToSandbox(sandbox^)),
  "getParameter":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(0)),
  "getShaderPrecisionFormat":
    createEmptyStub(refJsObjToSandbox(sandbox^))
    |> returns({"precision": 1}),
  "getExtension":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(1)),
};

let buildFakeCanvasWithSize =
    (~gl, ~sandbox, ~id="a", ~width=1, ~height=1, ()) => {
  "id": id,
  "nodeType": 1,
  "style": {
    "left": "",
    "top": "",
    "width": "",
    "height": "",
    "position": "static",
  },
  "width": width,
  "height": height,
  "getContext": createGetContextStub(gl, sandbox),
};

let buildFakeCanvas = (id, gl, sandbox) =>
  buildFakeCanvasWithSize(~id, ~gl, ~sandbox, ());

let buildFakeDomForNotPassCanvasId = sandbox => {
  let fakeGl = buildFakeGl(sandbox);
  let canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  let div = {"innerHTML": "", "firstChild": canvasDom};
  let body = {
    "prepend": createEmptyStub(refJsObjToSandbox(sandbox^)),
    "style": {
      "cssText": "",
    },
  };
  let createElementStub =
    createMethodStub(
      refJsObjToSandbox(sandbox^),
      documentToObj(DomExtend.document),
      "createElement",
    );
  createElementStub |> withOneArg("div") |> returns(div) |> ignore;
  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;
  createMethodStub(
    refJsObjToSandbox(sandbox^),
    documentToObj(DomExtend.document),
    "querySelectorAll",
  )
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  (canvasDom, fakeGl, div, body);
};

let buildFakeDiv = canvasDom => {
  let div = DomService.buildDom("<div></div>");
  /* div##appendChild(canvasDom); */
  div;
};

let buildFakeCanvasForNotPassCanvasIdWithCanvas = (sandbox, canvasDom) => {
  let div = buildFakeDiv(canvasDom);
  let body = {
    "prepend": createEmptyStub(refJsObjToSandbox(sandbox^)),
    "style": {
      "cssText": "",
    },
  };
  let createElementStub =
    createMethodStub(
      refJsObjToSandbox(sandbox^),
      documentToObj(DomExtend.document),
      "createElement",
    );
  createElementStub |> withOneArg("div") |> returns(div) |> ignore;
  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;
  createMethodStub(
    refJsObjToSandbox(sandbox^),
    documentToObj(DomExtend.document),
    "querySelectorAll",
  )
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  canvasDom;
};

let buildSetting =
    (isDebug, canvasId, buffer, context, useHardwareInstance, useWorker) =>
  switch (canvasId) {
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
      ~geometryPointCount=300,
      ~geometryCount=30,
      ~transformCount=50,
      ~basicMaterialCount=48,
      ~lightMaterialCount=48,
      ~directionLightCount=50,
      ~pointLightCount=50,
      ~meshRendererCount=50,
      ~basicSourceTextureCount=50,
      ~arrayBufferViewSourceTextureCount=50,
      ~sourceInstanceCount=2,
      ~objectInstanceCountPerSourceInstance=100,
      (),
    ) => {j|
       {
            "geometry_point_count": $geometryPointCount,
            "geometry_count": $geometryCount,
  "transform_count": $transformCount,
  "basic_material_count": $basicMaterialCount,
  "light_material_count": $lightMaterialCount,
  "direction_light_count": $directionLightCount,
  "point_light_count": $pointLightCount,
  "meshRenderer_count": $meshRendererCount,
  "basic_source_texture_count": $basicSourceTextureCount,
   "arrayBuffer_view_source_texture_count": $arrayBufferViewSourceTextureCount,


  "instance_buffer": {
    "sourceInstance_count": $sourceInstanceCount,
"objectInstance_count_per_source_instance": $objectInstanceCountPerSourceInstance
  }
       }
        |j};

let setToStateData =
    (
      state,
      isDebug,
      canvasId,
      context,
      useHardwareInstance,
      useWorker,
      buffer,
    ) => {
  let stateData = MainStateTool.getStateData();
  ParseSettingService.convertToRecord(
    buildSetting(
      isDebug,
      canvasId,
      buffer,
      context,
      useHardwareInstance,
      useWorker,
    )
    |> Js.Json.parseExn,
  )
  |> ConfigDataLoaderSystem._setSetting(stateData, state)
  |> ConfigDataLoaderSystem._createRecordWithState
  |> MainStateTool.setState;
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
      (),
    ) =>
  setToStateData(
    CreateStateMainService.createState(),
    isDebug,
    canvasId,
    context,
    useHardwareInstance,
    useWorker,
    buffer,
  );

let setMemory = (state: StateDataMainType.state, ~maxDisposeCount=1000, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    memory:
      Some({
        ...OperateSettingService.unsafeGetMemory(state.settingRecord),
        maxDisposeCount,
      }),
  },
};

let setBufferSize =
    (state: StateDataMainType.state, ~geometryPointCount=100, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    buffer:
      Some({
        ...BufferSettingService.unsafeGetBuffer(state.settingRecord),
        geometryPointCount,
      }),
  },
};

let unsafeGetGPU = state =>
  state.settingRecord |> OperateSettingService.unsafeGetGPU;

let setGPU = (config, state) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    gpu: Some(config),
  },
};

let setGPU = (config, state) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    gpu: Some(config),
  },
};

let setUseWorker = (isUseWorker, state) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    worker: Some({useWorker: isUseWorker}),
  },
};