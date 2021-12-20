open Main

type states

let getAllMaterialData = (): array<(material, materialType, getDepthWriteEnabledFunc)> => {
  //TODO implement
  Obj.magic(1)
}

let initJobExec = (states): states => {
  let renderPipelineMap = getAllMaterialData()->createRenderPipelinesWithMaterial

//   TODO continue!

  states
}
