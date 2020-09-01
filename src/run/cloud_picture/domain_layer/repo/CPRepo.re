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

let getTransform = () => {
  let po = CPContainerManager.getPO();

  po.transform;
};

let getExnTransform = () => {
  getTransform()->OptionSt.getExn;
};

let setTransform = transform => {
  let po = CPContainerManager.getPO();

  {...po, transform: transform->Some}->CPContainerManager.setPO;
};

let getPBRMaterial = () => {
  let po = CPContainerManager.getPO();

  po.pbrMaterial;
};

let getExnPBRMaterial = () => {
  getPBRMaterial()->OptionSt.getExn;
};

let setPBRMaterial = pbrMaterial => {
  let po = CPContainerManager.getPO();

  {...po, pbrMaterial: pbrMaterial->Some}->CPContainerManager.setPO;
};

let getGeometry = () => {
  let po = CPContainerManager.getPO();

  po.geometry;
};

let getExnGeometry = () => {
  getGeometry()->OptionSt.getExn;
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

let getDirectionLight = () => {
  let po = CPContainerManager.getPO();

  po.directionLight;
};

let getExnDirectionLight = () => {
  getDirectionLight()->OptionSt.getExn;
};

let setDirectionLight = directionLight => {
  let po = CPContainerManager.getPO();

  {...po, directionLight: directionLight->Some}->CPContainerManager.setPO;
};

let getPOConfig = () => {
  let po = CPContainerManager.getPO();

  po.poConfig;
};

let setPOConfig = poConfig => {
  let po = CPContainerManager.getPO();

  {...po, poConfig}->CPContainerManager.setPO;
};

let getGlobalTemp = () => {
  let po = CPContainerManager.getPO();

  po.globalTemp;
};

let setGlobalTemp = globalTemp => {
  let po = CPContainerManager.getPO();

  {...po, globalTemp}->CPContainerManager.setPO;
};

let getTime = () => {
  let po = CPContainerManager.getPO();

  po.time;
};

let setTime = time => {
  let po = CPContainerManager.getPO();

  {...po, time}->CPContainerManager.setPO;
};
