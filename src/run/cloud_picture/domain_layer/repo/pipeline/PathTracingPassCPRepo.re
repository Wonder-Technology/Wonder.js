open PathTracingPassCPPOType;

let getSceneDescBufferData = () => {
  CPRepo.getRayTracingPass().sceneDescBufferData
  ->OptionSt.map(((buffer, bufferSize, typeArr)) => {
      (buffer->StorageBufferVO.create, bufferSize, typeArr)
    });
};

let setSceneDescBufferData = ((buffer, bufferSize, typeArr)) => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    sceneDescBufferData:
      (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  });
};

let getPointIndexBufferData = () => {
  CPRepo.getRayTracingPass().pointIndexBufferData
  ->OptionSt.map(((buffer, bufferSize, typeArr)) => {
      (buffer->StorageBufferVO.create, bufferSize, typeArr)
    });
};

let setPointIndexBufferData = ((buffer, bufferSize, typeArr)) => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    pointIndexBufferData:
      (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  });
};

let getVertexBufferData = () => {
  CPRepo.getRayTracingPass().vertexBufferData
  ->OptionSt.map(((buffer, bufferSize, typeArr)) => {
      (buffer->StorageBufferVO.create, bufferSize, typeArr)
    });
};

let setVertexBufferData = ((buffer, bufferSize, typeArr)) => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    vertexBufferData:
      (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  });
};

let getIndexBufferData = () => {
  CPRepo.getRayTracingPass().indexBufferData
  ->OptionSt.map(((buffer, bufferSize)) => {
      (buffer->StorageBufferVO.create, bufferSize)
    });
};

let setIndexBufferData = ((buffer, bufferSize)) => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    indexBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  });
};

let getPBRMaterialBufferData = () => {
  CPRepo.getRayTracingPass().pbrMaterialBufferData
  ->OptionSt.map(((buffer, bufferSize, typeArr)) => {
      (buffer->StorageBufferVO.create, bufferSize, typeArr)
    });
};

let setPBRMaterialBufferData = ((buffer, bufferSize, typeArr)) => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    pbrMaterialBufferData:
      (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  });
};

let getShaderBindingTable = () => {
  CPRepo.getRayTracingPass().shaderBindingTable;
};

let setShaderBindingTable = shaderBindingTable => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    shaderBindingTable: shaderBindingTable->Some,
  });
};

let addStaticBindGroupData = (setSlot, bindGroup) => {
  let {staticBindGroupDataList} as po = CPRepo.getRayTracingPass();

  CPRepo.setRayTracingPass({
    ...po,
    staticBindGroupDataList: [
      {setSlot, bindGroup},
      ...staticBindGroupDataList,
    ],
  });
};

let addStaticBindGroupData = (setSlot, bindGroup) => {
  let {staticBindGroupDataList} as po = CPRepo.getRayTracingPass();

  CPRepo.setRayTracingPass({
    ...po,
    staticBindGroupDataList: [
      {setSlot, bindGroup},
      ...staticBindGroupDataList,
    ],
  });
};

let getAllStaticBindGroupData = () => {
  CPRepo.getRayTracingPass().staticBindGroupDataList;
};

let getPipeline = () => {
  CPRepo.getRayTracingPass().pipeline;
};

let setPipeline = pipeline => {
  CPRepo.setRayTracingPass({...CPRepo.getRayTracingPass(), pipeline: pipeline->Some});
};

let getCameraBindGroupLayout = () => {
  CPRepo.getRayTracingPass().cameraBindGroupLayout;
};

let setCameraBindGroupLayout = bindGroupLayout => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    cameraBindGroupLayout: bindGroupLayout->Some,
  });
};

let getDirectionLightBindGroupLayout = () => {
  CPRepo.getRayTracingPass().directionLightBindGroupLayout;
};

let setDirectionLightBindGroupLayout = bindGroupLayout => {
  CPRepo.setRayTracingPass({
    ...CPRepo.getRayTracingPass(),
    directionLightBindGroupLayout: bindGroupLayout->Some,
  });
};
