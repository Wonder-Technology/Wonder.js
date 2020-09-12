let getSceneDescBufferData = () =>
  PathTracingPassCPRepo.getSceneDescBufferData()->OptionSt.getExn;

let getPointIndexBufferData = () =>
  PathTracingPassCPRepo.getPointIndexBufferData()->OptionSt.getExn;

let getVertexBufferData = () =>
  PathTracingPassCPRepo.getVertexBufferData()->OptionSt.getExn;

let getIndexBufferData = () =>
  PathTracingPassCPRepo.getIndexBufferData()->OptionSt.getExn;

let getPBRMaterialBufferData = () =>
  PathTracingPassCPRepo.getPBRMaterialBufferData()->OptionSt.getExn;

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

let buildAndSetAllBufferData = device => {
  InitPathTracingCPJobEntity._buildAndSetAllBufferData(device);
};

let createAndSetShaderBindingTable = () => {
  WebGPURayTracingDependencyTool.createShaderBindingTableObject()
  ->PathTracingPassCPRepo.setShaderBindingTable;
};

let createAndSetAllBindGroupLayoutsAndBindGroups = () => {
  let cameraBindGroup = WebGPUDependencyTool.createBindGroupObject();
  let directionLightBindGroup = WebGPUDependencyTool.createBindGroupObject();

  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setCameraBindGroupLayout;

  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setDirectionLightBindGroupLayout;

  PathTracingPassCPRepo.addStaticBindGroupData(1, cameraBindGroup);

  PathTracingPassCPRepo.addStaticBindGroupData(2, directionLightBindGroup);
};
