let getPipeline = () => {
  let po = CPContainerManager.getPO();

  po.pipeline;
};

let setPipeline = pipeline => {
  let po = CPContainerManager.getPO();

  {...po, pipeline}->CPContainerManager.setPO;
};

let getScene = () => {
  let po = CPContainerManager.getPO();

  po.scene;
};

let setScene = scene => {
  let po = CPContainerManager.getPO();

  {...po, scene}->CPContainerManager.setPO;
};

let getGameObject = () => {
  let po = CPContainerManager.getPO();

  po.gameObject;
};

let setGameObject = gameObject => {
  let po = CPContainerManager.getPO();

  {...po, gameObject}->CPContainerManager.setPO;
};

let getExnTransform = () => {
  let po = CPContainerManager.getPO();

  po.transform->OptionSt.getExn;
};

let setTransform = transform => {
  let po = CPContainerManager.getPO();

  {...po, transform: transform->Some}->CPContainerManager.setPO;
};

let getExnBRDFMaterial = () => {
  let po = CPContainerManager.getPO();

  po.brdfMaterial->OptionSt.getExn;
};

let setBRDFMaterial = brdfMaterial => {
  let po = CPContainerManager.getPO();

  {...po, brdfMaterial: brdfMaterial->Some}->CPContainerManager.setPO;
};

let getExnGeometry = () => {
  let po = CPContainerManager.getPO();

  po.geometry->OptionSt.getExn;
};

let setGeometry = geometry => {
  let po = CPContainerManager.getPO();

  {...po, geometry: geometry->Some}->CPContainerManager.setPO;
};

let getBasicCameraView = () => {
  let po = CPContainerManager.getPO();

  po.basicCameraView;
};

let setBasicCameraView = basicCameraView => {
  let po = CPContainerManager.getPO();

  {...po, basicCameraView}->CPContainerManager.setPO;
};

let getPerspectiveCameraProjection = () => {
  let po = CPContainerManager.getPO();

  po.perspectiveCameraProjection;
};

let setPerspectiveCameraProjection = perspectiveCameraProjection => {
  let po = CPContainerManager.getPO();

  {...po, perspectiveCameraProjection}->CPContainerManager.setPO;
};

let getExnDirectionLight = () => {
  let po = CPContainerManager.getPO();

  po.directionLight->OptionSt.getExn;
};

let setDirectionLight = directionLight => {
  let po = CPContainerManager.getPO();

  {...po, directionLight: directionLight->Some}->CPContainerManager.setPO;
};

let getGlobalTemp = () => {
  let po = CPContainerManager.getPO();

  po.globalTemp;
};

let getTime = () => {
  let po = CPContainerManager.getPO();

  po.time;
};

let setTime = time => {
  let po = CPContainerManager.getPO();

  {...po, time}->CPContainerManager.setPO;
};

let getPicture = () => {
  let po = CPContainerManager.getPO();

  po.picture;
};

let setPicture = picture => {
  let po = CPContainerManager.getPO();

  {...po, picture}->CPContainerManager.setPO;
};

let getWebGPU = () => {
  let po = CPContainerManager.getPO();

  po.webgpu;
};

let setWebGPU = webgpu => {
  let po = CPContainerManager.getPO();

  {...po, webgpu}->CPContainerManager.setPO;
};

let getCamera = () => {
  let po = CPContainerManager.getPO();

  po.camera;
};

let setCamera = camera => {
  let po = CPContainerManager.getPO();

  {...po, camera}->CPContainerManager.setPO;
};

let getPass = () => {
  let po = CPContainerManager.getPO();

  po.pass;
};

let setPass = pass => {
  let po = CPContainerManager.getPO();

  {...po, pass}->CPContainerManager.setPO;
};

let getRayTracingPass = () => {
  let po = CPContainerManager.getPO();

  po.pathTracingPass;
};

let setRayTracingPass = pathTracingPass => {
  let po = CPContainerManager.getPO();

  {...po, pathTracingPass}->CPContainerManager.setPO;
};

let getAccumulationPass = () => {
  let po = CPContainerManager.getPO();

  po.accumulationPass;
};

let setAccumulationPass = accumulationPass => {
  let po = CPContainerManager.getPO();

  {...po, accumulationPass}->CPContainerManager.setPO;
};

let getImage = () => {
  let po = CPContainerManager.getPO();

  po.image;
};

let setImage = image => {
  let po = CPContainerManager.getPO();

  {...po, image}->CPContainerManager.setPO;
};
