open TransformType;

open TransformStateUtils;

open Contract;

let isAlive = (transform: transform, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(transform, getTransformData(state).disposedIndexArray);

let handleDisposeComponent = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(transform, isAlive, state)
      )
  );
  let {disposedIndexArray} as data = getTransformData(state);
  disposedIndexArray |> Js.Array.push(transform) |> ignore;
  let transformStr = Js.Int.toString(transform);
  data
  |> TransformHierachySystem.unsafeGetChildren(transformStr)
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         (child: transform) =>
           TransformHierachySystem.removeFromParentMap(Js.Int.toString(child), data) |> ignore
       )
     );
  switch (TransformHierachySystem.getParent(transformStr, data)) {
  | None => ()
  | Some(parent) =>
    data
    |> TransformHierachySystem.removeFromChildMap(Js.Int.toString(parent), transform)
    |> ignore
  };
  state
};