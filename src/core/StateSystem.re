open StateDataType;

let getState (stateData: stateData) :state => Js.Option.getExn stateData.state;

/* let getState (stateData: stateData) :state => Js.Option.getExn stateData.state; */
let setState stateData::(stateData: stateData) (state: state) => {
  stateData.state = Some state;
  state
};

let createState () => {
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some false},
  deviceManagerData: {gl: None},
  tempData: {floatArr_1: ArraySystem.createEmpty ()},
  /* gameObjectData: {uid: Some 0, componentMap: None} */
  gameObjectData: GameObjectSystem.initData (),
  transformData: TransformSystem.initData ()
};

let getOptionValueFromState value => Js.Option.getExn value;