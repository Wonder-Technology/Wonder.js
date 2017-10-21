open UidUtils;

open ComponentType;

open StateDataType;

open Contract;

open GameObjectType;

let _getGameObjectData (state: StateDataType.state) => state.gameObjectData;

let create (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData state;
  let newUId: int = increase gameObjectData.uid;
  gameObjectData.uid = newUId;
  (state, Js.Int.toString newUId)
};

let _getComponentFromComponentData componentId::(componentId: string) componentData =>
  HashMapSystem.get componentData componentId;

let _getComponent (uid: string) (componentMap: Js.Dict.t int) :option component =>
  HashMapSystem.get componentMap uid;

let hasComponent (uid: string) (componentMap: Js.Dict.t int) :bool =>
  Js.Option.isSome (_getComponent uid componentMap);

let _addComponent (uid: string) (component: component) (componentMap: Js.Dict.t int) => {
  requireCheck (
    fun () =>
      test
        "this type of component is already exist, shouldn't add again"
        (fun () => hasComponent uid componentMap |> assertFalse)
  );
  HashMapSystem.set componentMap uid component |> ignore
};

let getTransformComponent (uid: string) (state: StateDataType.state) =>
  (_getGameObjectData state).transformMap |> _getComponent uid;

let addTransformComponent (uid: string) (component: component) (state: StateDataType.state) => {
  (_getGameObjectData state).transformMap |> _addComponent uid component |> ignore;
  state
};

let getChildren (uid: string) (gameObjectData: gameObjectData) =>
  HashMapSystem.get gameObjectData.childMap uid;

let setChildren (uid: string) (children: array gameObject) (gameObjectData: gameObjectData) =>
  HashMapSystem.set gameObjectData.childMap uid children;

let _unsafeGetChildren (uid: string) (gameObjectData: gameObjectData) =>
  HashMapSystem.unsafeGet gameObjectData.childMap uid;

let _containChild (childUId: string) (children: array gameObject) =>
  ArrayUtils.includes childUId children;

let _removeFromChildren (childUId: string) (children: array gameObject) => {
  requireCheck (
    fun () =>
      test "children should contain it" (fun () => _containChild childUId children |> assertTrue)
  );
  ArrayUtils.deleteBySwap
    (Js.Array.indexOf childUId children) (Js.Array.length children - 1) children
};

let _removeChild (parentUId: string) (childUId: string) (gameObjectData: gameObjectData) => {
  requireCheck (
    fun () =>
      test
        "children should exist in childMap"
        (fun () => getChildren parentUId gameObjectData |> assertExist)
  );
  HashMapSystem.deleteVal gameObjectData.parentMap childUId |> ignore;
  _unsafeGetChildren parentUId gameObjectData |> _removeFromChildren childUId |> ignore;
  gameObjectData
};

let getParent (parentUId: string) (state: StateDataType.state) =>
  HashMapSystem.get (_getGameObjectData state).parentMap parentUId;

let _setParent (parentUId: string) (childUId: string) (gameObjectData: gameObjectData) => {
  HashMapSystem.set gameObjectData.parentMap childUId (HashMapSystem.stringToJsUndefine parentUId)
  |> ignore;
  gameObjectData
};

let _addChild (parentUId: string) (childUId: string) (gameObjectData: gameObjectData) =>
  switch (getChildren parentUId gameObjectData) {
  | Some children => Js.Array.push childUId children |> ignore
  | None => setChildren parentUId [|childUId|] gameObjectData |> ignore
  };

let setParent (parentUId: string) (childUId: string) (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData state;
  switch (getParent parentUId state) {
  | Some originParent =>
    _removeChild (HashMapSystem.jsUndefineToString originParent) childUId gameObjectData |> ignore
  | None => ()
  };
  _setParent parentUId childUId gameObjectData |> _addChild parentUId childUId |> ignore;
  state
};

let addChild (parentUId: string) (childUId: string) (state: StateDataType.state) =>
  setParent parentUId childUId state;

let initData () => {
  uid: 0,
  transformMap: HashMapSystem.createEmpty (),
  parentMap: HashMapSystem.createEmpty (),
  childMap: HashMapSystem.createEmpty ()
};