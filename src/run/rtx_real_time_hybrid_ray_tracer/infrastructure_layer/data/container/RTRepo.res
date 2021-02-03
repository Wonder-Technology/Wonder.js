let getPipeline = () => {
  let po = RTContainerManager.getPO()

  po.pipeline
}

let setPipeline = pipeline => {
  let po = RTContainerManager.getPO()

  {...po, pipeline: pipeline}->RTContainerManager.setPO
}

let getTime = () => {
  let po = RTContainerManager.getPO()

  po.time
}

let setTime = time => {
  let po = RTContainerManager.getPO()

  {...po, time: time}->RTContainerManager.setPO
}

let getPicture = () => {
  let po = RTContainerManager.getPO()

  po.picture
}

let setPicture = picture => {
  let po = RTContainerManager.getPO()

  {...po, picture: picture}->RTContainerManager.setPO
}

let getWebGPU = () => {
  let po = RTContainerManager.getPO()

  po.webgpu
}

let setWebGPU = webgpu => {
  let po = RTContainerManager.getPO()

  {...po, webgpu: webgpu}->RTContainerManager.setPO
}

let getCamera = () => {
  let po = RTContainerManager.getPO()

  po.camera
}

let setCamera = camera => {
  let po = RTContainerManager.getPO()

  {...po, camera: camera}->RTContainerManager.setPO
}

let getPass = () => {
  let po = RTContainerManager.getPO()

  po.pass
}

let setPass = pass => {
  let po = RTContainerManager.getPO()

  {...po, pass: pass}->RTContainerManager.setPO
}

let getRayTracingPass = () => {
  let po = RTContainerManager.getPO()

  po.pathTracingPass
}

let setRayTracingPass = pathTracingPass => {
  let po = RTContainerManager.getPO()

  {...po, pathTracingPass: pathTracingPass}->RTContainerManager.setPO
}

let getAccumulationPass = () => {
  let po = RTContainerManager.getPO()

  po.accumulationPass
}

let setAccumulationPass = accumulationPass => {
  let po = RTContainerManager.getPO()

  {...po, accumulationPass: accumulationPass}->RTContainerManager.setPO
}

let getBMFRRegressionPass = () => {
  let po = RTContainerManager.getPO()

  po.bmfrRegressionPass
}

let setBMFRRegressionPass = bmfrRegressionPass => {
  let po = RTContainerManager.getPO()

  {...po, bmfrRegressionPass: bmfrRegressionPass}->RTContainerManager.setPO
}

let getBMFRPostprocessPass = () => {
  let po = RTContainerManager.getPO()

  po.bmfrPostprocessPass
}

let setBMFRPostprocessPass = bmfrPostprocessPass => {
  let po = RTContainerManager.getPO()

  {...po, bmfrPostprocessPass: bmfrPostprocessPass}->RTContainerManager.setPO
}
