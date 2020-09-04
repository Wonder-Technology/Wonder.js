open IWebGPUCoreDp;

type shaderBindingTableObject;

type pipelineRayTracingObject;

type accelerationContainerObject;

type accelerationGeometryUsageObject = int;

type accelerationInstanceUsageObject = int;

type accelerationContainerUsageObject = int;

type stage = {
  .
  "module": shaderModuleObject,
  "stage": shaderStageObject,
};

[@bs.deriving abstract]
type group = {
  [@bs.as "type"]
  type_: string,
  [@bs.optional]
  generalIndex: int,
  [@bs.optional]
  anyHitIndex: int,
  [@bs.optional]
  closestHitIndex: int,
  [@bs.optional]
  intersectionIndex: int,
};

type shaderBindingTableDescriptor = {
  .
  "stages": array(stage),
  "groups": array(group),
};

[@bs.deriving abstract]
type rayTracingState = {
  shaderBindingTable: shaderBindingTableObject,
  maxRecursionDepth: int,
  maxPayloadSize: int,
};

[@bs.deriving abstract]
type pipelineRayTracingDescriptor = {
  layout: pipelineLayoutObject,
  rayTracingState,
};

type geometryVertex = {
  .
  "buffer": bufferObject,
  "format": string,
  "stride": int,
  "count": int,
};

type geometryIndex = {
  .
  "buffer": bufferObject,
  "format": string,
  "count": int,
};

type geometry = {
  .
  "usage": accelerationGeometryUsageObject,
  "type": string,
  "vertex": geometryVertex,
  "index": geometryIndex,
};

type transform3D = {
  .
  "x": float,
  "y": float,
  "z": float,
};

type transform = {
  .
  "translation": transform3D,
  "rotation": transform3D,
  "scale": transform3D,
};

type instanceId = int;

[@bs.deriving abstract]
type instance = {
  usage: accelerationInstanceUsageObject,
  mask: int,
  instanceId,
  instanceOffset: int,
  geometryContainer: accelerationContainerObject,
  [@bs.optional]
  transform,
  [@bs.optional]
  transformMatrix: Js.Typed_array.Float32Array.t,
};

let getInstanceId = instance => {
  instance->instanceIdGet;
};

[@bs.deriving abstract]
type accelerationContainerDescriptor = {
  level: string,
  usage: accelerationContainerUsageObject,
  [@bs.optional]
  geometries: array(geometry),
  [@bs.optional]
  instances: array(instance),
};

type accelerationContainerUsage = {
  none: accelerationContainerUsageObject,
  allow_update: accelerationContainerUsageObject,
  prefer_fast_trace: accelerationContainerUsageObject,
  prefer_fast_build: accelerationContainerUsageObject,
  low_memory: accelerationContainerUsageObject,
};

type accelerationGeometryUsage = {
  none: accelerationGeometryUsageObject,
  opaque: accelerationGeometryUsageObject,
  allow_any_hit: accelerationGeometryUsageObject,
};

type accelerationInstanceUsage = {
  none: accelerationInstanceUsageObject,
  triangle_cull_disable: accelerationInstanceUsageObject,
  triangle_front_counterclockwise: accelerationInstanceUsageObject,
  force_opaque: accelerationInstanceUsageObject,
  force_no_opaque: accelerationInstanceUsageObject,
};

type accelerationContainer = {
  updateInstance: (instanceId, instance, accelerationContainerObject) => unit,
  setSubFloat32Data:
    (int, Js.Typed_array.Float32Array.t, accelerationContainerObject) => unit,
};

type passEncoderRayTracingObject;

[@bs.deriving abstract]
type passEncoderRayTracingDescriptor = {
  [@bs.optional]
  label: string,
};

type sbtRayGenerationOffset = int;
type sbtRayHitOffset = int;
type sbtRayMissOffset = int;
type queryWidthDimension = int;
type queryHeightDimension = int;
type queryDepthDimension = int;

type passEncoderRayTracing = {
  setPipeline: (pipelineRayTracingObject, passEncoderRayTracingObject) => unit,
  setBindGroup:
    (bindingPoint, bindGroupObject, passEncoderRayTracingObject) => unit,
  traceRays:
    (
      sbtRayGenerationOffset,
      sbtRayHitOffset,
      sbtRayMissOffset,
      queryWidthDimension,
      queryHeightDimension,
      queryDepthDimension,
      passEncoderRayTracingObject
    ) =>
    unit,
  endPass: passEncoderRayTracingObject => unit,
};

type commandEncoder = {
  beginRayTracingPass:
    (passEncoderRayTracingDescriptor, commandEncoderObject) =>
    passEncoderRayTracingObject,
  buildRayTracingAccelerationContainer:
    (accelerationContainerObject, commandEncoderObject) => unit,
  updateRayTracingAccelerationContainer:
    (accelerationContainerObject, commandEncoderObject) => unit,
};

[@bs.deriving abstract]
type binding = {
  accelerationContainer: accelerationContainerObject,
  binding: bindingPoint,
  [@bs.optional]
  buffer: bufferObject,
  [@bs.optional]
  sampler: samplerObject,
  [@bs.optional]
  textureView: textureViewObject,
  [@bs.optional]
  offset: int,
  size: int,
};

type bindGroupDescriptor = {
  .
  "layout": bindGroupLayoutObject,
  "entries": array(binding),
};

type device = {
  createRayTracingPipeline:
    (pipelineRayTracingDescriptor, deviceObject) => pipelineRayTracingObject,
  createRayTracingShaderBindingTable:
    (shaderBindingTableDescriptor, deviceObject) => shaderBindingTableObject,
  createRayTracingAccelerationContainer:
    accelerationContainerDescriptor => accelerationContainerObject,
  /*! add this to avoid IWebGPUCoreDp dependent on IWebGPURayTracingDP! */
  createRayTracingBindGroup:
    (bindGroupDescriptor, deviceObject) => bindGroupObject,
};

type shaderStage = {
  compute: shaderStageObject,
  fragment: shaderStageObject,
  vertex: shaderStageObject,
  ray_generation: shaderStageObject,
  ray_closest_hit: shaderStageObject,
  ray_any_hit: shaderStageObject,
  ray_miss: shaderStageObject,
  ray_intersection: shaderStageObject,
};

type bufferUsage = {
  storage: bufferUsageObject,
  uniform: bufferUsageObject,
  indirect: bufferUsageObject,
  vertex: bufferUsageObject,
  index: bufferUsageObject,
  map_read: bufferUsageObject,
  map_write: bufferUsageObject,
  copy_src: bufferUsageObject,
  copy_dst: bufferUsageObject,
  ray_tracing: bufferUsageObject,
};

type webgpuRayTracing = {
  accelerationContainer,
  passEncoderRayTracing,
  commandEncoder,
  device,
  accelerationContainerUsage,
  accelerationGeometryUsage,
  accelerationInstanceUsage,
  bufferUsage,
  shaderStage,
};
