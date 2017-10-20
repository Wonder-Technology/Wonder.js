open UidUtils;

open ComponentType;

open StateDataType;

open Contract;

let _getGameObjectData (state: StateDataType.state) => state.gameObjectData;

let _unsafeGetComponentData componentMap (uid: string) =>
  HashMapSystem.unsafeGet componentMap uid
  |> ensureCheck (
       fun _ =>
         test
           "component data should exist"
           (fun () => HashMapSystem.get componentMap uid |> assertExist)
     );

let _setComponentData
    componentMap
    (uid: string)
    (componentData: StateDataType.gameObjectComponentData) =>
  HashMapSystem.set componentMap uid componentData;

let create (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData state;
  let newUId: int = increase gameObjectData.uid;
  gameObjectData.uid = newUId;
  let newUIdStr: string = Js.Int.toString newUId;
  _setComponentData gameObjectData.componentMap newUIdStr (HashMapSystem.createEmpty ());
  (
    /* {
         ...state,
         gameObjectData: {
           ...gameObjectData,
           uid: newUId,
           componentMap: _setComponentData gameObjectData.componentMap newUId (HashMapSystem.createEmpty())
         }
       },
       {uid: newUId} */
    state,
    newUIdStr
  )
};

let _getComponentFromComponentData componentId::(componentId: string) componentData =>
  HashMapSystem.get componentData componentId;

let getComponent (uid: string) (componentId: string) (state: StateDataType.state) :option component => {
  let gameObjectData = _getGameObjectData state;
  _unsafeGetComponentData gameObjectData.componentMap uid |> _getComponentFromComponentData ::componentId
};

let hasComponent (uid: string) (componentId: string) (state: StateDataType.state) :bool =>
  Js.Option.isSome (getComponent uid componentId state);

let _setComponent
    (componentId: string)
    (component: component)
    (componentData: gameObjectComponentData) =>
  HashMapSystem.set componentData componentId component;

let addComponent
    (uid: string)
    (component: component)
    (componentId: string)
    (state: StateDataType.state) => {
  requireCheck (
    fun () => {
      test
        "this type of component is already exist, shouldn't add again"
        (fun () => hasComponent uid componentId state |> assertFalse)
    }
  );
  let gameObjectData = _getGameObjectData state;
  _unsafeGetComponentData gameObjectData.componentMap uid |> _setComponent componentId component;
  state
};

let initData () => {uid: 0, componentMap: HashMapSystem.createEmpty ()};