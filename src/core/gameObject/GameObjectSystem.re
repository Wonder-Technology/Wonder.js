open UidUtils;

open ComponentType;

open StateDataType;

open Contract;

let _getGameObjectData (state: StateDataType.state) => state.gameObjectData;

let create (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData state;
  let newUId: int = increase gameObjectData.uid;
  gameObjectData.uid = newUId;
  (state, Js.Int.toString newUId)
};

let _getComponentFromComponentData componentId::(componentId: string) componentData =>
  HashMapSystem.get componentData componentId;

let _getComponent (uid: string) (componentMap: HashMapSystem.t int) :option component =>
  HashMapSystem.get componentMap uid;

let hasComponent (uid: string) (componentMap: HashMapSystem.t int) :bool =>
  Js.Option.isSome (_getComponent uid componentMap);

let _addComponent (uid: string) (component: component) (componentMap: HashMapSystem.t int) => {
  requireCheck (
    fun () =>
      test
        "this type of component is already exist, shouldn't add again"
        (fun () => hasComponent uid componentMap |> assertFalse)
  );
  HashMapSystem.set uid component componentMap |> ignore
};

let getTransformComponent (uid: string) (state: StateDataType.state) =>
  (_getGameObjectData state).transformMap |> _getComponent uid;

let addTransformComponent (uid: string) (component: component) (state: StateDataType.state) => {
  (_getGameObjectData state).transformMap |> _addComponent uid component |> ignore;
  TransformSystem.handleAddComponent component uid state
};

let initData () => {uid: 0, transformMap: HashMapSystem.createEmpty ()};