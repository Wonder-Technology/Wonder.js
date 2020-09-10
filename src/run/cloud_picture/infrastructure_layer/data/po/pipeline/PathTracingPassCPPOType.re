open PassCPPOType;

type pathTracingPass = {
  sceneDescBufferData:
    option(
      (IWebGPUCoreDp.bufferObject, bufferSize, Js.Typed_array.Float32Array.t),
    ),
  pointIndexBufferData:
    option(
      (IWebGPUCoreDp.bufferObject, bufferSize, Js.Typed_array.Uint32Array.t),
    ),
  vertexBufferData:
    option(
      (IWebGPUCoreDp.bufferObject, bufferSize, Js.Typed_array.Float32Array.t),
    ),
  indexBufferData: option((IWebGPUCoreDp.bufferObject, bufferSize)),
  pbrMaterialBufferData:
    option(
      (IWebGPUCoreDp.bufferObject, bufferSize, Js.Typed_array.Float32Array.t),
    ),
  shaderBindingTable: option(IWebGPURayTracingDp.shaderBindingTableObject),
  staticBindGroupDataList: list(staticBindGroupData),
  pipeline: option(IWebGPURayTracingDp.rayTracingPipelineObject),
  cameraBindGroupLayout: option(IWebGPUCoreDp.bindGroupLayoutObject),
  directionLightBindGroupLayout: option(IWebGPUCoreDp.bindGroupLayoutObject),
};
