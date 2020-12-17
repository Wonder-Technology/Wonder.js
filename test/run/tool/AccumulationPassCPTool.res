open Wonderjs

let getAccumulationPixelBufferData = () =>
  AccumulationPassCPRepo.getAccumulationPixelBufferData()->OptionSt.getExn

let getStaticBindGroupData = () => AccumulationPassCPRepo.getStaticBindGroupData()->OptionSt.getExn

let getPipeline = () => AccumulationPassCPRepo.getPipeline()->OptionSt.getExn

let createAndSetPipeline = () =>
  AccumulationPassCPRepo.setPipeline(WebGPUDependencyTool.createRenderPipelineObject())

let createAndSetAllBindGroups = () => {
  let bindGroup = WebGPUDependencyTool.createBindGroupObject()

  AccumulationPassCPRepo.setStaticBindGroupData(0, bindGroup)
}
