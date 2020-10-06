let getSceneDescBufferData = () =>
  PathTracingPassCPRepo.getSceneDescBufferData()->OptionSt.getExn;

let getPointIndexBufferData = () =>
  PathTracingPassCPRepo.getPointIndexBufferData()->OptionSt.getExn;

let getVertexBufferData = () =>
  PathTracingPassCPRepo.getVertexBufferData()->OptionSt.getExn;

let getIndexBufferData = () =>
  PathTracingPassCPRepo.getIndexBufferData()->OptionSt.getExn;

let getBRDFMaterialBufferData = () =>
  PathTracingPassCPRepo.getBRDFMaterialBufferData()->OptionSt.getExn;

let getShaderBindingTable = () =>
  PathTracingPassCPRepo.getShaderBindingTable()->OptionSt.getExn;

let getCameraBindGroupLayout = () =>
  PathTracingPassCPRepo.getCameraBindGroupLayout()->OptionSt.getExn;

let getDirectionLightBindGroupLayout = () =>
  PathTracingPassCPRepo.getDirectionLightBindGroupLayout()->OptionSt.getExn;

let getAllStaticBindGroupData = () => {
  PathTracingPassCPRepo.getAllStaticBindGroupData();
};

let getPipeline = () => {
  PathTracingPassCPRepo.getPipeline()->OptionSt.getExn;
};

let createAndSetPipeline = () => {
  PathTracingPassCPRepo.setPipeline(
    WebGPURayTracingDependencyTool.createRayTracingPipelineObject(),
  );
};

let buildAndSetAllBufferData = device => {
  UpdatePathTracingCPJobEntity._buildAndSetAllBufferData(device)
  ->ResultTool.getExnSuccessValueIgnore;
};

let createAndSetShaderBindingTable = () => {
  WebGPURayTracingDependencyTool.createShaderBindingTableObject()
  ->PathTracingPassCPRepo.setShaderBindingTable;
};

let createAndSetAllBindGroupLayoutsAndBindGroupsExceptRayTracing = () => {
  let cameraBindGroup = WebGPUDependencyTool.createBindGroupObject();
  let directionLightBindGroup = WebGPUDependencyTool.createBindGroupObject();

  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setCameraBindGroupLayout;

  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setDirectionLightBindGroupLayout;

  PathTracingPassCPRepo.addStaticBindGroupData(1, cameraBindGroup);

  PathTracingPassCPRepo.addStaticBindGroupData(2, directionLightBindGroup);
};

let createAndSetAllBindGroups = () => {
  let rtBindGroup = WebGPUDependencyTool.createBindGroupObject();
  let cameraBindGroup = WebGPUDependencyTool.createBindGroupObject();
  let directionLightBindGroup = WebGPUDependencyTool.createBindGroupObject();

  PathTracingPassCPRepo.addStaticBindGroupData(0, rtBindGroup);
  PathTracingPassCPRepo.addStaticBindGroupData(1, cameraBindGroup);
  PathTracingPassCPRepo.addStaticBindGroupData(2, directionLightBindGroup);
};
