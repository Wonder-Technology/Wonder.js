open AllGPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerCustomType;

open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

open RenderWorkerBasicSourceTextureType;

open RenderWorkerArrayBufferViewSourceTextureType;

open RenderWorkerCubemapTextureType;

open RenderWorkerAllTextureType;

open RenderWorkerMeshRendererType;

open RenderWorkerSceneType;

open RenderWorkerDirectionLightType;

open RenderWorkerPointLightType;

open RenderWorkerSourceInstanceType;

open RenderWorkerTransformType;

open RenderWorkerGeometryType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open WonderWebgl.GlType;

open ComponentType;

open Js.Typed_array;

open AllGLSLSenderType;

open AllGLSLLocationType;

open MaterialType;

open ShaderChunkType;

open AllVboBufferType;

open AllTypeArrayPoolType;

open AllGlobalTempType;

open AllBrowserDetectType;

open AllJobDataType;

type apiRecord = {
  imguiAPIJsObj: {
    .
    "label":
      (
        . WonderImgui.StructureType.rect,
        string,
        WonderImgui.FontType.align,
        renderWorkerState
      ) =>
      renderWorkerState,
    "image":
      (
        . WonderImgui.StructureType.rect,
        WonderImgui.StructureType.uv,
        string,
        renderWorkerState
      ) =>
      renderWorkerState,
    "button":
      (
        . ((int, int, int, int), string),
        WonderImgui.IMGUIType.customControlFunctionShowData,
        renderWorkerState
      ) =>
      (renderWorkerState, bool),
    "box":
      (. (int, int, int, int), Js.Array.t(float), renderWorkerState) =>
      renderWorkerState,
    "unsafeGetCustomControl":
      (. string, renderWorkerState) => WonderImgui.IMGUIType.customControlFunc,
    "getWonderImguiIMGUIRecord":
      (. renderWorkerState) => WonderImgui.IMGUIType.imguiRecord,
    "setWonderImguiIMGUIRecord":
      (. WonderImgui.IMGUIType.imguiRecord, renderWorkerState) =>
      renderWorkerState,
    "beginGroup":
      (. WonderImgui.StructureType.position, renderWorkerState) =>
      renderWorkerState,
    "endGroup": (. renderWorkerState) => renderWorkerState,
    "getCustomDataInRenderWorker":
      renderWorkerState => RenderWorkerCustomType.customDataInRenderWorker,
    "setCustomDataInRenderWorker":
      (. RenderWorkerCustomType.customDataInRenderWorker, renderWorkerState) =>
      renderWorkerState,
    "getCustomDataFromMainWorkerToRenderWorker":
      renderWorkerState =>
      CustomAllWorkerDataType.customDataFromMainWorkerToRenderWorker,
    "getCustomDataFromRenderWorkerToMainWorker":
      renderWorkerState =>
      CustomAllWorkerDataType.customDataFromRenderWorkerToMainWorker,
    "setCustomDataFromRenderWorkerToMainWorker":
      (
        . CustomAllWorkerDataType.customDataFromRenderWorkerToMainWorker,
        renderWorkerState
      ) =>
      renderWorkerState,
  },
}
and renderWorkerState = {
  mutable sceneRecord,
  mutable settingRecord,
  mutable renderConfigRecord: option(AllRenderConfigType.renderConfigRecord),
  mutable gpuDetectRecord,
  mutable deviceManagerRecord: AllDeviceManagerType.deviceManagerRecord,
  mutable shaderRecord: AllShaderType.shaderRecord,
  mutable programRecord: AllProgramType.programRecord,
  mutable glslRecord: AllGLSLType.glslRecord,
  mutable glslSenderRecord,
  mutable glslLocationRecord,
  mutable glslChunkRecord,
  mutable sourceInstanceRecord,
  mutable basicMaterialRecord: option(basicMaterialRecord),
  mutable lightMaterialRecord: option(lightMaterialRecord),
  mutable meshRendererRecord: option(meshRendererRecord),
  mutable basicSourceTextureRecord: option(basicSourceTextureRecord),
  mutable arrayBufferViewSourceTextureRecord:
    option(arrayBufferViewSourceTextureRecord),
  mutable cubemapTextureRecord: option(cubemapTextureRecord),
  mutable allTextureRecord: option(allTextureRecord),
  mutable transformRecord: option(transformRecord),
  mutable geometryRecord: option(geometryRecord),
  mutable directionLightRecord: option(directionLightRecord),
  mutable pointLightRecord: option(pointLightRecord),
  mutable renderRecord,
  mutable typeArrayPoolRecord,
  mutable vboBufferRecord,
  mutable globalTempRecord,
  mutable workerDetectRecord: option(workerDetectRecord),
  mutable browserDetectRecord: option(browserDetectRecord),
  mutable imguiRecord: WonderImgui.IMGUIType.imguiRecord,
  mutable apiRecord,
  mutable customRecord,
  mutable jobDataRecord,
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};