open SourceInstanceType;

let getObjectInstanceList = (state: StateDataType.state) =>
  SourceInstanceStateSystem.getData(state).objectInstanceList;

let _addObjectInstnace = (uid, {objectInstanceList} as data) => {
  objectInstanceList |> Js.Array.push(uid) |> ignore;
  data
};

let createInstance = (state: StateDataType.state) => {
  open GameObjectComponentSystem;
  let (state, uid) = GameObjectCreateSystem.create(state);
  _addObjectInstnace(uid, SourceInstanceStateSystem.getData(state)) |> ignore;
  let (state, transform) = TransformSystem.create(state);
  /* todo add ObjectInstance to instance */
  (addTransformComponent(uid, transform, state), uid)
};

let initData = () => {objectInstanceList: WonderCommonlib.ArraySystem.createEmpty()};