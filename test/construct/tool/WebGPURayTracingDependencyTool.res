open Wonderjs

open IWebGPURayTracingDp

open Sinon

let createShaderBindingTableObject = (): shaderBindingTableObject => Obj.magic(Js.Math.random())

let createRayTracingPipelineObject = (): rayTracingPipelineObject => Obj.magic(Js.Math.random())

let createAccelerationContainerObject = (): accelerationContainerObject =>
  Obj.magic(Js.Math.random())

let createPassEncoderRayTracingObject = (): passEncoderRayTracingObject =>
  Obj.magic(Js.Math.random())

let build = (
  ~sandbox,
  ~none_containerUsage=0,
  ~allow_update=1,
  ~prefer_fast_trace=2,
  ~prefer_fast_build=3,
  ~low_memory=4,
  ~none_geometryUsage=0,
  ~opaque=1,
  ~allow_any_hit=2,
  ~none_instanceUsage=0,
  ~triangle_cull_disable=1,
  ~triangle_front_counterclockwise=2,
  ~force_opaque=3,
  ~force_no_opaque=4,
  ~storage=0,
  ~uniform=1,
  ~indirect=2,
  ~vertex=3,
  ~index=4,
  ~map_read=5,
  ~map_write=6,
  ~copy_src=7,
  ~copy_dst=8,
  ~ray_tracing=10,
  ~compute=0,
  ~fragment=1,
  ~vertex=2,
  ~ray_generation=3,
  ~ray_closest_hit=4,
  ~ray_any_hit=5,
  ~ray_miss=6,
  ~ray_intersection=7,
  ~updateInstance=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createThreeArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~setSubFloat32Data=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createThreeArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~setPipeline=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~setBindGroup=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createThreeArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~traceRays=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createSevenArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~endPass=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginRayTracingPass=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~buildRayTracingAccelerationContainer=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~updateRayTracingAccelerationContainer=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~createRayTracingPipeline=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~createRayTracingShaderBindingTable=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~createRayTracingAccelerationContainer=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.returns(createAccelerationContainerObject())
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  ~createRayTracingBindGroup=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  ->SinonTool.createTwoArgsEmptyStubData
  ->SinonTool.getDpFunc,
  (),
): webgpuRayTracing => {
  accelerationContainer: {
    updateInstance: updateInstance,
    setSubFloat32Data: setSubFloat32Data,
  },
  passEncoder: {
    setPipeline: setPipeline,
    setBindGroup: setBindGroup,
    traceRays: traceRays,
    endPass: endPass,
  },
  commandEncoder: {
    beginRayTracingPass: beginRayTracingPass,
    buildRayTracingAccelerationContainer: buildRayTracingAccelerationContainer,
    updateRayTracingAccelerationContainer: updateRayTracingAccelerationContainer,
  },
  device: {
    createRayTracingPipeline: createRayTracingPipeline,
    createRayTracingShaderBindingTable: createRayTracingShaderBindingTable,
    createRayTracingAccelerationContainer: createRayTracingAccelerationContainer,
    createRayTracingBindGroup: createRayTracingBindGroup,
  },
  accelerationContainerUsage: {
    none: none_containerUsage,
    allow_update: allow_update,
    prefer_fast_trace: prefer_fast_trace,
    prefer_fast_build: prefer_fast_build,
    low_memory: low_memory,
  },
  accelerationGeometryUsage: {
    none: none_geometryUsage,
    opaque: opaque,
    allow_any_hit: allow_any_hit,
  },
  accelerationInstanceUsage: {
    none: none_instanceUsage,
    triangle_cull_disable: triangle_cull_disable,
    triangle_front_counterclockwise: triangle_front_counterclockwise,
    force_opaque: force_opaque,
    force_no_opaque: force_no_opaque,
  },
  bufferUsage: {
    storage: storage,
    uniform: uniform,
    indirect: indirect,
    vertex: vertex,
    index: index,
    map_read: map_read,
    map_write: map_write,
    copy_src: copy_src,
    copy_dst: copy_dst,
    ray_tracing: ray_tracing,
  },
  shaderStage: {
    compute: compute,
    fragment: fragment,
    vertex: vertex,
    ray_generation: ray_generation,
    ray_closest_hit: ray_closest_hit,
    ray_any_hit: ray_any_hit,
    ray_miss: ray_miss,
    ray_intersection: ray_intersection,
  },
}

let set = dp => WebGPURayTracingDpCPAPI.set(dp)
