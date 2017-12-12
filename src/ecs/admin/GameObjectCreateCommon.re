open GameObjectType;

open UidUtils;

let create = (state: StateDataType.state) => {
  let {uid, aliveUidArray} as data = GameObjectStateCommon.getGameObjectData(state);
  data.uid = increase(uid);
  aliveUidArray |> Js.Array.push(uid) |> ignore;
  (state, uid)
};