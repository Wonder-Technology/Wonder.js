let getSceneDescBufferData = () =>
  PathTracingPassCPRepo.getSceneDescBufferData();

let getPointIndexBufferData = () =>
  PathTracingPassCPRepo.getPointIndexBufferData();

let getVertexBufferData = () => PathTracingPassCPRepo.getVertexBufferData();

let getIndexBufferData = () => PathTracingPassCPRepo.getIndexBufferData();

let getPBRMaterialBufferData = () =>
  PathTracingPassCPRepo.getPBRMaterialBufferData();

// let getDirectionLightBufferData = () => PathTracingPassCPRepo.getDirectionLightBufferData();

let getShaderBindingTable = () =>
  PathTracingPassCPRepo.getShaderBindingTable();

let getCameraBindGroupLayout = () =>
  PathTracingPassCPRepo.getCameraBindGroupLayout();

let getDirectionLightBindGroupLayout = () =>
  PathTracingPassCPRepo.getDirectionLightBindGroupLayout();

let getAllStaticBindGroupData = () => {
  PathTracingPassCPRepo.getAllStaticBindGroupData();
};

let buildAndSetAllBufferData = device => {
  InitPathTracingCPJobEntity._buildAndSetAllBufferData(device);
};

let createAndSetShaderBindingTable = () => {
  WebGPURayTracingDependencyTool.createShaderBindingTableObject()
  ->PathTracingPassCPRepo.setShaderBindingTable;
};

let createAndSetAllBindGroupLayoutsAndBindGroups = () => {
  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setCameraBindGroupLayout;

  WebGPUDependencyTool.createBindGroupLayoutObject()
  ->PathTracingPassCPRepo.setDirectionLightBindGroupLayout;

  PathTracingPassCPRepo.addStaticBindGroupData(
    1,
    WebGPUDependencyTool.createBindGroupObject(),
  );

  PathTracingPassCPRepo.addStaticBindGroupData(
    2,
    WebGPUDependencyTool.createBindGroupObject(),
  );
};
