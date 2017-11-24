open GameObjectType;

open UidUtils;

let create = (state: StateDataType.state) => {
  let {uid, aliveUidArray} as data = GameObjectStateUtils.getGameObjectData(state);
  let newUIdStr = Js.Int.toString(uid);
  data.uid = increase(uid);
  aliveUidArray |> Js.Array.push(newUIdStr) |> ignore;
  /* todo refactor: use TransformXXXUtils */
  /* let (newState, transform) = TransformSystem.create(state); */
  /* (addTransformComponent(newUIdStr, transform, newState), newUIdStr) */
  (state, newUIdStr)
};