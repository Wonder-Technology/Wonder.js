open GameObjectType;

open UidUtils;

let create = (state: StateDataType.state) => {
  let {uid, aliveUidArray} as data = GameObjectStateSystem.getGameObjectData(state);
  data.uid = increase(uid);
  aliveUidArray |> Js.Array.push(uid) |> ignore;
  (state, uid)
};