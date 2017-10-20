open UidUtils;

open GameObjectType;

open StateDataType;

let _getGameObjectData (state: StateDataType.state) => state.gameObjectData;

let _setComponentData
    componentMap
    (uid: int)
    (componentData: StateDataType.gameObjectComponentData) =>
  HashMapSystem.set componentMap (Js.Int.toString uid) componentData;

let create (state: StateDataType.state) => {
  let gameObjectData = _getGameObjectData state;
  let newUId = increase gameObjectData.uid;
  gameObjectData.uid = newUId;
  _setComponentData gameObjectData.componentMap newUId (HashMapSystem.createEmpty ());
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
    newUId
  )
};

let initData () => {uid: 0, componentMap: HashMapSystem.createEmpty ()};