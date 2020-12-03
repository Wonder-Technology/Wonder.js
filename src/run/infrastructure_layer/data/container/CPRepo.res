let getPipeline = () => {
  let po = CPContainerManager.getPO()

  po.pipeline
}

let setPipeline = pipeline => {
  let po = CPContainerManager.getPO()

  {...po, pipeline: pipeline}->CPContainerManager.setPO
}

let getTime = () => {
  let po = CPContainerManager.getPO()

  po.time
}

let setTime = time => {
  let po = CPContainerManager.getPO()

  {...po, time: time}->CPContainerManager.setPO
}

let getPicture = () => {
  let po = CPContainerManager.getPO()

  po.picture
}

let setPicture = picture => {
  let po = CPContainerManager.getPO()

  {...po, picture: picture}->CPContainerManager.setPO
}

let getWebGPU = () => {
  let po = CPContainerManager.getPO()

  po.webgpu
}

let setWebGPU = webgpu => {
  let po = CPContainerManager.getPO()

  {...po, webgpu: webgpu}->CPContainerManager.setPO
}

let getCamera = () => {
  let po = CPContainerManager.getPO()

  po.camera
}

let setCamera = camera => {
  let po = CPContainerManager.getPO()

  {...po, camera: camera}->CPContainerManager.setPO
}

let getPass = () => {
  let po = CPContainerManager.getPO()

  po.pass
}

let setPass = pass => {
  let po = CPContainerManager.getPO()

  {...po, pass: pass}->CPContainerManager.setPO
}

let getRayTracingPass = () => {
  let po = CPContainerManager.getPO()

  po.pathTracingPass
}

let setRayTracingPass = pathTracingPass => {
  let po = CPContainerManager.getPO()

  {...po, pathTracingPass: pathTracingPass}->CPContainerManager.setPO
}

let getAccumulationPass = () => {
  let po = CPContainerManager.getPO()

  po.accumulationPass
}

let setAccumulationPass = accumulationPass => {
  let po = CPContainerManager.getPO()

  {...po, accumulationPass: accumulationPass}->CPContainerManager.setPO
}
