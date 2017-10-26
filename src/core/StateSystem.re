open StateDataType;

let getState (stateData: stateData) :state => Js.Option.getExn stateData.state;

let setState stateData::(stateData: stateData) (state: state) => {
  stateData.state = Some state;
  state
};

let createState () => {
  bufferConfig: None,
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some false},
  deviceManagerData: {gl: None},
  gameObjectData: GameObjectSystem.initData (),
  transformData: None,
  cameraControllerData: CameraControllerSystem.initData()
};

let getOptionValueFromState value => Js.Option.getExn value;